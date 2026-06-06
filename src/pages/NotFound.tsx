import React from 'react';
import Layout from '../components/Layout';
import { Home, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { useSEO } from '../hooks/useSEO';

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | WAPDA Online Bill Check',
    description: 'The page you are looking for does not exist on WAPDA Online Bill Check.',
    noindex: true,
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full text-center">
        <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-slate-200 flex flex-col items-center justify-center min-h-[500px]">
          <p className="text-8xl font-black text-emerald-600 mb-6 tracking-tighter">404</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Page Not Found</h1>
          <p className="text-lg text-slate-600 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
            It looks like this page has been moved or no longer exists. Return to the home page to access all supported DISCOs for your electricity bill check.
          </p>
          <Link href="/">
            <a className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98]">
               <Home className="w-5 h-5" /> Go Back Home <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
