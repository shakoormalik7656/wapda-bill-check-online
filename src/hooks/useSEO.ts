import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

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
  useEffect(() => {
    const siteUrl = 'https://www.wapdaonlinebillcheck.com';
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
