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

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TIMEOUT_MS = 20_000;

function withTimeout(ms: number): AbortSignal {
  return AbortSignal.timeout(ms);
}

function extractField(html: string, fieldName: string): string {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp(`name="${escaped}"[^>]*value="([^"]*)"`, 'i'));
  if (m) return m[1];
  // Also try reversed attribute order: value="..." name="..."
  const m2 = html.match(new RegExp(`value="([^"]*)"[^>]*name="${escaped}"`, 'i'));
  return m2 ? m2[1] : '';
}

function collectCookies(response: Response): string {
  const headers = response.headers as any;
  const raw: string[] = typeof headers.getSetCookie === 'function'
    ? headers.getSetCookie()
    : (headers.get('set-cookie') ?? '').split(/,\s*(?=[A-Za-z_][^=]+=)/).filter(Boolean);
  return raw.map((c: string) => c.split(';')[0].trim()).join('; ');
}

function pitcFallback(res: any, baseUrl: string, refno: string) {
  // If proxy fails for any reason, send the user straight to the PITC page.
  // Their browser (Pakistani IP) can access it directly.
  const fallback = `${baseUrl}/general?refno=${refno}`;
  res.writeHead(302, { 'Location': fallback, 'Cache-Control': 'no-store' });
  res.end();
}

export default async function handler(req: any, res: any) {
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
    // ── Step 1: GET the PITC form page ─────────────────────────────────────
    let getResp: Response;
    try {
      getResp = await fetch(baseUrl, {
        headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*' },
        redirect: 'follow',
        signal: withTimeout(TIMEOUT_MS),
      });
    } catch {
      return pitcFallback(res, baseUrl, refno);
    }

    if (!getResp.ok) {
      return pitcFallback(res, baseUrl, refno);
    }

    const formHtml = await getResp.text();
    const cookieHeader = collectCookies(getResp);

    const viewState    = extractField(formHtml, '__VIEWSTATE');
    const viewStateGen = extractField(formHtml, '__VIEWSTATEGENERATOR') || '2CDA38AB';
    const eventVal     = extractField(formHtml, '__EVENTVALIDATION');
    const rvtMatch     = formHtml.match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/i)
                      ?? formHtml.match(/value="([^"]+)"[^>]*name="__RequestVerificationToken"/i);
    const rvt          = rvtMatch ? rvtMatch[1] : '';

    // ── Step 2: POST with session cookie + ASP.NET tokens ──────────────────
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

    let postResp: Response;
    try {
      postResp = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'User-Agent':   UA,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie':       cookieHeader,
          'Referer':      baseUrl,
          'Origin':       'https://bill.pitc.com.pk',
          'Accept':       'text/html,application/xhtml+xml,*/*',
        },
        body: formBody.toString(),
        redirect: 'manual',
        signal: withTimeout(TIMEOUT_MS),
      });
    } catch {
      return pitcFallback(res, baseUrl, refno);
    }

    // ── Step 3: Follow redirect with session cookie ─────────────────────────
    let billHtml: string;

    if (postResp.status >= 300 && postResp.status < 400) {
      const location = postResp.headers.get('location') ?? '';
      const redirectUrl = location.startsWith('http')
        ? location
        : `https://bill.pitc.com.pk${location.startsWith('/') ? location : `/${location}`}`;

      try {
        const billResp = await fetch(redirectUrl || `${baseUrl}/general?refno=${refno}`, {
          headers: { 'User-Agent': UA, 'Cookie': cookieHeader, 'Referer': baseUrl, 'Accept': 'text/html,application/xhtml+xml,*/*' },
          signal: withTimeout(TIMEOUT_MS),
        });
        billHtml = await billResp.text();
      } catch {
        return pitcFallback(res, baseUrl, refno);
      }
    } else {
      billHtml = await postResp.text();
    }

    // ── Step 4: Rewrite relative PITC URLs to absolute ─────────────────────
    const fixedHtml = billHtml
      .replace(/<meta\s+charset="utf-16"[^>]*>/gi, '<meta charset="utf-8" />')
      .replace(/(src|href|action)="\/((?!\/)[^"]+)"/g, '$1="https://bill.pitc.com.pk/$2"')
      .replace(/url\((['"]?)\/([^)'"]+)\1\)/g, 'url($1https://bill.pitc.com.pk/$2$1)');

    // If the response looks like it's just the search form (no bill found),
    // fall back so the user lands on PITC and can retry.
    const hasBillContent = /ref.*?no|refno|consumer|amount|units|balance/i.test(fixedHtml.slice(0, 5000));
    if (!hasBillContent && fixedHtml.length < 20_000) {
      return pitcFallback(res, baseUrl, refno);
    }

    res.writeHead(200, {
      'Content-Type':  'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    res.end(fixedHtml);

  } catch (err: any) {
    console.error('[check-bill] unexpected error:', err?.message ?? err);
    return pitcFallback(res, baseUrl, refno);
  }
}
