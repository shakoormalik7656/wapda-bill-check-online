/**
 * Cloudflare Worker — PITC Bill Proxy
 *
 * Runs at the Cloudflare edge node closest to the user (Pakistan/India PoP
 * for Pakistani users). Outbound requests to PITC come from a local IP,
 * avoiding geo-blocks that affect Vercel US servers.
 *
 * Deploy:
 *   1. npm install -g wrangler
 *   2. wrangler login
 *   3. wrangler deploy
 */

const DISCO_URLS = {
  iesco:  'https://bill.pitc.com.pk/iescobill',
  lesco:  'https://bill.pitc.com.pk/lescobill',
  mepco:  'https://bill.pitc.com.pk/mepcobill',
  fesco:  'https://bill.pitc.com.pk/fescobill',
  gepco:  'https://bill.pitc.com.pk/gepcobill',
  pesco:  'https://bill.pitc.com.pk/pescobill',
  hazeco: 'https://bill.pitc.com.pk/hazecobill',
  hesco:  'https://bill.pitc.com.pk/hescobill',
  sepco:  'https://bill.pitc.com.pk/sepcobill',
  qesco:  'https://bill.pitc.com.pk/qescobill',
  tesco:  'https://bill.pitc.com.pk/tescobill',
};

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function extractField(html, fieldName) {
  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const m = html.match(new RegExp(`name="${escaped}"[^>]*value="([^"]*)"`, 'i'));
  if (m) return m[1];
  const m2 = html.match(new RegExp(`value="([^"]*)"[^>]*name="${escaped}"`, 'i'));
  return m2 ? m2[1] : '';
}

// Cloudflare Workers expose each Set-Cookie as a separate header entry
function collectCookies(response) {
  const cookies = [];
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === 'set-cookie') {
      cookies.push(value.split(';')[0].trim());
    }
  });
  return cookies.join('; ');
}

function fallback(baseUrl, refno) {
  return Response.redirect(`${baseUrl}/general?refno=${refno}`, 302);
}

export default {
  async fetch(request) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const disco = (url.searchParams.get('disco') ?? '').toLowerCase();
    const refno = (url.searchParams.get('refno') ?? '').replace(/\D/g, '');

    const baseUrl = DISCO_URLS[disco];
    if (!baseUrl || !refno || refno.length < 10 || refno.length > 14) {
      return new Response('Bad Request', { status: 400 });
    }

    try {
      // ── Step 1: GET the PITC form page ──────────────────────────────────
      const getResp = await fetch(baseUrl, {
        headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,*/*' },
        redirect: 'follow',
      });

      if (!getResp.ok) return fallback(baseUrl, refno);

      const formHtml = await getResp.text();
      const cookieHeader = collectCookies(getResp);

      const viewState    = extractField(formHtml, '__VIEWSTATE');
      const viewStateGen = extractField(formHtml, '__VIEWSTATEGENERATOR') || '2CDA38AB';
      const eventVal     = extractField(formHtml, '__EVENTVALIDATION');
      const rvtMatch     = formHtml.match(/name="__RequestVerificationToken"[^>]*value="([^"]+)"/i)
                        ?? formHtml.match(/value="([^"]+)"[^>]*name="__RequestVerificationToken"/i);
      const rvt          = rvtMatch ? rvtMatch[1] : '';

      // ── Step 2: POST with session cookie + ASP.NET tokens ───────────────
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
          'User-Agent':   UA,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cookie':       cookieHeader,
          'Referer':      baseUrl,
          'Origin':       'https://bill.pitc.com.pk',
          'Accept':       'text/html,application/xhtml+xml,*/*',
        },
        body: formBody.toString(),
        redirect: 'manual',
      });

      // ── Step 3: Follow redirect with session cookie ───────────────────────
      let billHtml;

      if (postResp.status >= 300 && postResp.status < 400) {
        const location = postResp.headers.get('location') ?? '';
        const redirectUrl = location.startsWith('http')
          ? location
          : `https://bill.pitc.com.pk${location.startsWith('/') ? location : `/${location}`}`;

        const billResp = await fetch(redirectUrl || `${baseUrl}/general?refno=${refno}`, {
          headers: {
            'User-Agent': UA,
            'Cookie':     cookieHeader,
            'Referer':    baseUrl,
            'Accept':     'text/html,application/xhtml+xml,*/*',
          },
        });

        if (!billResp.ok) return fallback(baseUrl, refno);
        billHtml = await billResp.text();
      } else {
        billHtml = await postResp.text();
      }

      // ── Step 4: Rewrite relative PITC URLs to absolute ──────────────────
      const fixedHtml = billHtml
        .replace(/<meta\s+charset="utf-16"[^>]*>/gi, '<meta charset="utf-8" />')
        .replace(/(src|href|action)="\/((?!\/)[^"]+)"/g, '$1="https://bill.pitc.com.pk/$2"')
        .replace(/url\((['"]?)\/([^)'"]+)\1\)/g, 'url($1https://bill.pitc.com.pk/$2$1)');

      // If response looks like the search form (no bill content), fall back
      if (fixedHtml.length < 15_000) return fallback(baseUrl, refno);

      return new Response(fixedHtml, {
        headers: {
          'Content-Type':               'text/html; charset=utf-8',
          'Cache-Control':              'no-store',
          'Access-Control-Allow-Origin': '*',
        },
      });

    } catch (err) {
      console.error('[worker]', err?.message ?? err);
      return fallback(baseUrl, refno);
    }
  },
};
