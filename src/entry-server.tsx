import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import App from './App';
import { SEOContext, resolveSEO, type ResolvedSEO } from './hooks/useSEO';
import { getAllDiscos } from './content/discoData';

/** All routes that get pre-rendered to static HTML at build time. */
export const routes: string[] = [
  '/',
  ...getAllDiscos().map((d) => `/${d.id}`),
  '/about',
  '/privacy-policy',
  '/disclaimer',
  '/terms-and-conditions',
];

export function render(path: string): { html: string; seo: ResolvedSEO } {
  const sink: Record<string, unknown> = {};
  const html = renderToString(
    <SEOContext.Provider value={sink}>
      <Router ssrPath={path}>
        <App />
      </Router>
    </SEOContext.Provider>
  );
  return { html, seo: resolveSEO(sink) };
}
