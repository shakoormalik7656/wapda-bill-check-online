import React from 'react';
import { Link, useLocation } from 'wouter';
import { Zap, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { getAllDiscos } from '../content/discoData';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
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
            
          <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <Link href="/" className={`transition-colors ${location === '/' ? "text-emerald-600 border-b-2 border-emerald-600 pb-1" : "hover:text-emerald-600"}`}>
              Home
            </Link>
            {getAllDiscos().map((disco) => (
              <Link 
                key={disco.id} 
                href={`/${disco.id}`}
                className={`transition-colors ${
                  location === `/${disco.id}` 
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1" 
                    : "hover:text-emerald-600"
                }`}
              >
                {disco.name}
              </Link>
            ))}
          </nav>

        </div>
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
             <div className="flex gap-4 pt-2">
                {/* Trust Badges */}
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><ShieldCheck className="w-4 h-4"/> 100% Free</div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><Clock className="w-4 h-4"/> Instant Load</div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600"><MapPin className="w-4 h-4"/> All Pakistan</div>
             </div>
          </div>
          
          <div>
            <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 font-medium text-slate-600">
              <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home / All Providers</Link></li>
              {getAllDiscos().map(disco => (
                <li key={disco.id}>
                  <Link href={`/${disco.id}`} className="hover:text-emerald-600 transition-colors">
                    {disco.name} Bill Check
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-900 font-bold mb-4 text-xs uppercase tracking-wider">Legal & Information</h3>
            <ul className="space-y-3 font-medium text-slate-600">
              <li><Link href="/privacy-policy" className="hover:text-emerald-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-600 transition-colors">Disclaimer</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-emerald-600 transition-colors">Terms & Conditions</Link></li>
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
  );
}
