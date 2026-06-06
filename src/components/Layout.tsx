import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Zap, ShieldCheck, Clock, MapPin, Menu, X } from 'lucide-react';
import { getAllDiscos } from '../content/discoData';

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.wapdaonlinebillcheck.com/#website',
  url: 'https://www.wapdaonlinebillcheck.com/',
  name: 'WAPDA Online Bill Check',
  description: 'Check and download your duplicate WAPDA electricity bill online in Pakistan.',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.wapdaonlinebillcheck.com/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.wapdaonlinebillcheck.com/#organization',
  name: 'WAPDA Online Bill Check',
  url: 'https://www.wapdaonlinebillcheck.com/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.wapdaonlinebillcheck.com/og-image.jpg',
    width: 1200,
    height: 630,
  },
  description: 'Independent utility portal for checking WAPDA electricity bills across all Pakistan DISCOs.',
  areaServed: 'PK',
  knowsAbout: ['Electricity bills', 'WAPDA', 'LESCO', 'MEPCO', 'IESCO', 'FESCO', 'GEPCO', 'PESCO', 'HAZECO', 'HESCO'],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const discos = getAllDiscos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />

      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 overflow-x-hidden">

        {/* Top Header / Navigation */}
        <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <Zap className="w-6 h-6" fill="currentColor" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-lg tracking-tight text-slate-900">
                    Wapda Online Bill Check
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
              <Link href="/" className={`transition-colors ${location === '/' ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1' : 'hover:text-emerald-600'}`}>
                Home
              </Link>
              {discos.map((disco) => (
                <Link
                  key={disco.id}
                  href={`/${disco.id}`}
                  className={`transition-colors ${
                    location === `/${disco.id}`
                      ? 'text-emerald-600 border-b-2 border-emerald-600 pb-1'
                      : 'hover:text-emerald-600'
                  }`}
                >
                  {disco.name}
                </Link>
              ))}
            </nav>

            {/* Mobile hamburger button */}
            <button
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-40 px-4 py-4 flex flex-col">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-3 border-b border-slate-100 transition-colors ${location === '/' ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'}`}
              >
                Home / All Providers
              </Link>
              {discos.map((disco) => (
                <Link
                  key={disco.id}
                  href={`/${disco.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-3 border-b border-slate-100 transition-colors ${location === `/${disco.id}` ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'}`}
                >
                  {disco.name} Bill Check
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-3 transition-colors ${location === '/about' ? 'text-emerald-600' : 'text-slate-700 hover:text-emerald-600'}`}
              >
                About Us
              </Link>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        {/* Footer structured for SEO and Trust */}
        <footer className="bg-white border-t border-slate-200 text-slate-500 py-12 mt-20 text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2 space-y-4">
               <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Zap className="w-6 h-6 text-emerald-600" fill="currentColor" />
                  <span className="font-bold text-lg tracking-tight text-slate-900">Wapda Online Bill Check</span>
               </Link>
               <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
                 Fast, secure, and mobile-friendly utility platform for checking your electricity bills across all Pakistan DISCOs. No data is stored on our servers.
               </p>
               <div className="flex gap-4 pt-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><ShieldCheck className="w-4 h-4"/> 100% Free</div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><Clock className="w-4 h-4"/> Instant Load</div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><MapPin className="w-4 h-4"/> All Pakistan</div>
               </div>
               <div className="flex gap-3 pt-1">
                  <a
                    href="https://web.facebook.com/profile.php?id=61590379903162"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow us on Facebook"
                    className="text-slate-400 hover:text-emerald-600 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
               </div>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Quick Links</h3>
              <ul className="space-y-3 font-medium text-slate-600">
                <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home / All Providers</Link></li>
                {discos.map(disco => (
                  <li key={disco.id}>
                    <Link href={`/${disco.id}`} className="hover:text-emerald-600 transition-colors">
                      {disco.name} Bill Check
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Legal &amp; Information</h3>
              <ul className="space-y-3 font-medium text-slate-600">
                <li><Link href="/about" className="hover:text-emerald-600 transition-colors">About Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-emerald-600 transition-colors">Disclaimer</Link></li>
                <li><Link href="/terms-and-conditions" className="hover:text-emerald-600 transition-colors">Terms &amp; Conditions</Link></li>
              </ul>
              <h3 className="text-slate-900 font-bold mt-8 mb-4 text-xs uppercase tracking-wider">Independent Utility</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                We are an independent, third-party utility web service and are not affiliated directly with WAPDA or the Ministry of Energy. We provide a structured interface to help users access the official public Pitc web servers.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 text-xs text-slate-500 font-medium flex justify-center text-center">
            <p>© {new Date().getFullYear()} WAPDA Online Bill Check. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
