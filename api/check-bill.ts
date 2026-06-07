// Vercel serverless proxy — GET+POST to PITC so users see their bill
// without needing an active PITC session in their browser.

const DISCO_URLS: Record<string, string> = {
  iesco: 'https://bill.pitc.com.pk/iescobill',
  lesco: 'https://bill.pitc.com.pk/lescobill',
  mepco: 'https://bill.pitc.com.pk/mepcobill',
  fesco: 'https://bill.pitc.com.pk/fescobill',
  gepco: 'https://bill.pitc.com.pk/gepcobill',
  pesco: 'https://bill.pitc.com.pk/pescobill',
  hazeco: 'https://bill.pitc.com.pk/hazecobill',
  hesco: 'https://bill.pitc.com.pk/hescobill',
  sepco: 'https://bill.pitc.com.pk/sepcobill',
  qesco: 'https://bill.pitc.com.pk/qescobill',
  tesco: 'https://bill.pitc.com.pk/tescobill',
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function extractField(html: string, fieldName: string): string {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp(`name="${escaped}"[^>]*value="([^"]+)"`));
  return m ? m[1] : '';
}

function collectCookies(response: Response): string {
  // Node 18+ undici exposes getSetCookie(); fall back to combined header
  const headers = response.headers as any;
  const raw: string[] = typeof headers.getSetCookie === 'function'
    ? headers.getSetCookie()
    : (headers.get('set-cookie') ?? '').split(/,\s*(?=[A-Za-z_][^=]+=)/).filter(Boolean);
  return raw.map((c: string) => c.split(';')[0].trim()).join('; ');
}

export default async function handler(req: any, res: any) {
  // Only allow GET (browser opens the URL in a new tab)
  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  const url = new URL(req.url ?? '/', `http://${req.headers.host ?? 'localhost'}`);
  const disco = url.searchParams.get('disco')?.toLowerCase() ?? '';
  const refno = (url.searchParams.get('refno') ?? '').replace(/\D/g, '');

  if (!disco || !refno || refno.length < 10 || refno.length > 14) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end('Bad Request: disco and a 10–14 digit refno are required.');
  }

  const baseUrl = DISCO_URLS[disco];
  if (!baseUrl) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    return res.end(`Bad Request: unknown DISCO "${disco}".`);
  }

  try {
    // ── Step 1: GET the PITC form page ──────────────────────────────────────
    const getResp = await fetch(baseUrl, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml' },
      redirect: 'follow',
    });

    if (!getResp.ok) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
      return res.end('PITC portal is currently unavailable. Please try again later.');
    }

    const formHtml = await getResp.text();
    const cookieHeader = collectCookies(getResp);

    // Extract ASP.NET tokens from the form
    const viewState     = extractField(formHtml, '__VIEWSTATE');
    const viewStateGen  = extractField(formHtml, '__VIEWSTATEGENERATOR') || '2CDA38AB';
    const eventVal      = extractField(formHtml, '__EVENTVALIDATION');
    const rvtMatch      = formHtml.match(/name="__RequestVerificationToken" type="hidden" value="([^"]+)"/);
    const rvt           = rvtMatch ? rvtMatch[1] : '';

    // ── Step 2: POST with session cookie + ASP.NET tokens ───────────────────
    const formBody = new URLSearchParams({
      '__EVENTTARGET':              '',
      '__EVENTARGUMENT':            '',
      '__LASTFOCUS':                '',
      '__VIEWSTATE':                viewState,
      '__VIEWSTATEGENERATOR':       viewStateGen,
      '__EVENTVALIDATION':          eventVal,
      '__RequestVerificationToken': rvt,
      'rbSearchByList':             'refno',
      'searchTextBox':              refno,
      'ruCodeTextBox':              '',
      'btnSearch':                  'Search',
    });

    const postResp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'User-Agent':    UA,
        'Content-Type':  'application/x-www-form-urlencoded',
        'Cookie':        cookieHeader,
        'Referer':       baseUrl,
        'Origin':        'https://bill.pitc.com.pk',
        'Accept':        'text/html,application/xhtml+xml',
      },
      body: formBody.toString(),
      redirect: 'manual', // Follow manually so we can pass the session cookie
    });

    // ── Step 3: Follow the redirect with the session cookie ──────────────────
    let billHtml: string;

    if (postResp.status >= 300 && postResp.status < 400) {
      const location = postResp.headers.get('location');
      // Build absolute URL; fall back to the known PITC pattern
      const redirectUrl = location
        ? (location.startsWith('http')
            ? location
            : `https://bill.pitc.com.pk${location.startsWith('/') ? location : `/${location}`}`)
        : `${baseUrl}/general?refno=${refno}`;

      const billResp = await fetch(redirectUrl, {
        headers: {
          'User-Agent': UA,
          'Cookie':     cookieHeader,
          'Referer':    baseUrl,
          'Accept':     'text/html,application/xhtml+xml',
        },
      });
      billHtml = await billResp.text();
    } else {
      // PITC sometimes returns 200 directly with the bill HTML
      billHtml = await postResp.text();
    }

    // ── Step 4: Rewrite relative PITC URLs to absolute ──────────────────────
    const fixedHtml = billHtml
      // Fix wrong charset declaration in PITC HTML
      .replace(/<meta\s+charset="utf-16"[^>]*>/gi, '<meta charset="utf-8" />')
      // Rewrite root-relative src/href/action attributes
      .replace(/(src|href|action)="\/((?!\/)[^"]+)"/g, '$1="https://bill.pitc.com.pk/$2"')
      // Rewrite root-relative CSS url() references
      .replace(/url\((['"]?)\/([^)'"]+)\1\)/g, 'url($1https://bill.pitc.com.pk/$2$1)');

    res.writeHead(200, {
      'Content-Type':  'text/html; charset=utf-8',
      'X-Frame-Options': 'SAMEORIGIN',
      'Cache-Control': 'no-store',
    });
    res.end(fixedHtml);

  } catch (err: any) {
    console.error('[check-bill]', err?.message ?? err);
    res.writeHead(502, { 'Content-Type': 'text/plain' });
    res.end('Failed to retrieve bill from PITC. Please try again.');
  }
}
