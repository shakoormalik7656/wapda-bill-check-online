import React from 'react';
import Layout from '../components/Layout';
import { useSEO } from '../hooks/useSEO';
import { ShieldCheck, Zap, MapPin, Mail } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  useSEO({
    title: 'About Us | WAPDA Online Bill Check',
    description:
      'Learn about WAPDA Online Bill Check — an independent, free utility portal helping Pakistani citizens check their duplicate electricity bills from all major DISCOs including LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HAZECO, and HESCO.',
    canonical: 'https://www.wapdaonlinebillcheck.com/about',
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            About Us
          </h1>
          <p className="text-lg text-slate-500 mb-10 border-b border-slate-100 pb-8 leading-relaxed">
            A free, independent electricity bill portal built for every citizen of Pakistan.
          </p>

          <div className="space-y-10 text-slate-600 leading-relaxed">

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Who We Are</h2>
              <p className="text-lg mb-4">
                WAPDA Online Bill Check is an independent, third-party web utility operated by a small
                team of Pakistani web developers. Our mission is simple: make it effortless for every
                household in Pakistan to find, view, and download their duplicate electricity bill —
                without navigating a maze of fragmented government portals.
              </p>
              <p className="text-lg">
                We are not affiliated with WAPDA, the Ministry of Energy, PITC, or any individual
                Distribution Company (DISCO). We are a private, ad-supported directory service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">What We Do</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 flex flex-col gap-3">
                  <Zap className="w-8 h-8 text-emerald-600" fill="currentColor" />
                  <h3 className="font-bold text-slate-900 text-lg">Unified Portal</h3>
                  <p className="text-sm text-slate-600">
                    We aggregate all 8 major Pakistani DISCOs — LESCO, MEPCO, IESCO, FESCO, GEPCO,
                    PESCO, HAZECO, and HESCO — into one clean, fast interface.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-lg">Privacy First</h3>
                  <p className="text-sm text-slate-600">
                    We do not store your reference number, name, or any billing data. Your query
                    goes directly to the official PITC servers — our server is never in the middle.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-lg">All Pakistan</h3>
                  <p className="text-sm text-slate-600">
                    Whether you are in Lahore, Karachi, Islamabad, Peshawar, Multan, or a small
                    rural town — if your DISCO is listed, you can check your bill here.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">Our Story</h2>
              <p className="text-lg mb-4">
                The idea for this project emerged from a frustratingly common experience: receiving a
                misplaced electricity bill and spending an hour trying to find the correct official
                PITC URL for your specific region. With eight different DISCOs each operating
                separate web infrastructure, consumers — particularly those less familiar with
                technology — often end up on outdated or incorrect portals.
              </p>
              <p className="text-lg">
                We built WAPDA Online Bill Check to solve that problem. By providing a single,
                well-maintained entry point that routes each user to the correct official portal for
                their provider, we save time and reduce frustration for millions of Pakistani
                electricity consumers every month.
              </p>
            </section>

            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight flex items-center gap-2">
                <Mail className="w-6 h-6 text-emerald-600" /> Contact Us
              </h2>
              <p className="text-lg mb-4">
                Have a question, found a broken link, or want to report that a DISCO portal URL has
                changed? We actively maintain this service and welcome feedback from our users.
              </p>
              <p className="text-lg font-medium text-slate-800">
                Email:{' '}
                <a
                  href="mailto:support@wapdaonlinebillcheck.com"
                  className="text-emerald-600 hover:underline"
                >
                  support@wapdaonlinebillcheck.com
                </a>
              </p>
              <p className="text-sm text-slate-500 mt-3">
                We aim to respond to all inquiries within 2–3 business days. For electricity billing
                disputes, meter errors, or payment issues — please contact your DISCO directly as we
                have no access to billing records.
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-sm font-medium">
              <Link href="/privacy-policy" className="text-emerald-600 hover:underline">Privacy Policy</Link>
              <Link href="/disclaimer" className="text-emerald-600 hover:underline">Disclaimer</Link>
              <Link href="/terms-and-conditions" className="text-emerald-600 hover:underline">Terms &amp; Conditions</Link>
              <Link href="/" className="text-emerald-600 hover:underline">Check Your Bill</Link>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
