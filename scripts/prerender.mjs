// Build-time static pre-rendering.
// After `vite build` (client) and `vite build --ssr` (server bundle), this walks
// every route, renders it to HTML with the correct per-page <head>, and writes a
// real static file (dist/iesco/index.html, etc.) so crawlers and social scrapers
// get full content + correct title/canonical/OG without executing JavaScript.

import { render, routes } from '../dist-server/entry-server.js';
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

if (!template.includes('<div id="root"></div>')) {
  console.warn('[prerender] Warning: could not find empty <div id="root"></div> in dist/index.html');
}
if (!/<!--seo-start-->[\s\S]*?<!--seo-end-->/.test(template)) {
  console.warn('[prerender] Warning: SEO markers <!--seo-start-->/<!--seo-end--> not found in dist/index.html');
}

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

function seoTags(s) {
  const t = escapeAttr(s.title);
  const d = escapeAttr(s.description);
  const img = escapeAttr(s.image);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${s.robots}" />`,
    s.canonical ? `<link rel="canonical" href="${escapeAttr(s.canonical)}" />` : '',
    `<meta property="og:type" content="website" />`,
    s.canonical ? `<meta property="og:url" content="${escapeAttr(s.canonical)}" />` : '',
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="WAPDA Online Bill Check — Pakistan Electricity Bill Portal" />`,
    `<meta property="og:site_name" content="WAPDA Online Bill Check" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

let count = 0;
for (const route of routes) {
  const { html, seo } = render(route);

  const withRoot = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const finalHtml = withRoot.replace(
    /<!--seo-start-->[\s\S]*?<!--seo-end-->/,
    `<!--seo-start-->\n    ${seoTags(seo)}\n    <!--seo-end-->`
  );

  const outPath =
    route === '/' ? path.join(dist, 'index.html') : path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, finalHtml);
  count++;
  console.log(`[prerender] ${route} -> ${path.relative(process.cwd(), outPath)}`);
}

console.log(`[prerender] Done. ${count} static pages written.`);
