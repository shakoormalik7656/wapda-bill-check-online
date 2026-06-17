import { createContext, useContext, useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export interface ResolvedSEO {
  title: string;
  description: string;
  robots: string;
  canonical?: string;
  image: string;
}

const SITE_URL = 'https://www.wapdaonlinebillcheck.com';

/** Pure resolver shared by the client effect and the build-time prerenderer,
 *  so the static HTML head always matches what the SPA would render. */
export function resolveSEO(p: Partial<SEOProps>): ResolvedSEO {
  return {
    title: p.title ?? 'WAPDA Online Bill Check | Check Duplicate Electricity Bill Pakistan',
    description: p.description ?? 'Check and download your duplicate WAPDA electricity bill online in Pakistan.',
    robots: p.noindex ? 'noindex, nofollow' : 'index, follow',
    canonical: p.canonical,
    image: p.ogImage ?? `${SITE_URL}/og-image.jpg`,
  };
}

/** During server prerender we provide a mutable sink via this context; each page's
 *  useSEO() call writes its resolved props into it so the prerenderer can read them.
 *  On the client there is no provider (value = null), so this is a no-op. */
export const SEOContext = createContext<Partial<SEOProps> | null>(null);

function setMeta(selector: string, attrName: string, attrValue: string, value: string) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export function useSEO({ title, description, canonical, ogImage, noindex }: SEOProps) {
  // SSR capture: write resolved props into the prerender sink during render.
  // No-op on the client (no provider). Safe to run during render for a one-shot.
  const sink = useContext(SEOContext);
  if (sink) {
    sink.title = title;
    sink.description = description;
    sink.canonical = canonical;
    sink.ogImage = ogImage;
    sink.noindex = noindex;
  }

  useEffect(() => {
    const siteUrl = SITE_URL;
    const defaultOgImage = `${siteUrl}/og-image.jpg`;
    const image = ogImage ?? defaultOgImage;

    document.title = title;

    // Basic meta
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('meta[property="og:type"]', 'property', 'og:type', 'website');
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:image"]', 'property', 'og:image', image);
    setMeta('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMeta('meta[property="og:image:height"]', 'property', 'og:image:height', '630');
    setMeta('meta[property="og:image:alt"]', 'property', 'og:image:alt', 'WAPDA Online Bill Check — Pakistan Electricity Bill Portal');
    setMeta('meta[property="og:site_name"]', 'property', 'og:site_name', 'WAPDA Online Bill Check');
    if (canonical) {
      setMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    }

    // Twitter Card
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
    setMeta('meta[name="twitter:image:alt"]', 'name', 'twitter:image:alt', 'WAPDA Online Bill Check — Pakistan Electricity Bill Portal');

    // Canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }
  }, [title, description, canonical, ogImage, noindex]);
}
