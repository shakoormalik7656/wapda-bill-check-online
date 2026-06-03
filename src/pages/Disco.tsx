"use client";

import React, { useEffect, useState } from 'react';
import { useParams, Link, Redirect } from 'wouter';
import Layout from '../components/Layout';
import BillChecker from '../components/BillChecker';
import { DISCO_DATA, DiscoInfo } from '../content/discoData';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Disco() {
  const params = useParams<{ disco: string }>();
  const disco = params?.disco;
  const [discoInfo, setDiscoInfo] = useState<DiscoInfo | null>(null);

  useEffect(() => {
    if (disco && DISCO_DATA[disco]) {
      setDiscoInfo(DISCO_DATA[disco]);
      // Update document title for SEO
      document.title = `Check ${DISCO_DATA[disco].name} Online Bill - Duplicate Bill Copy`;
    }
  }, [disco]);

  if (!disco || !DISCO_DATA[disco]) {
    // If the provider slug doesn't exist, route them home.
    return <Redirect to="/" />;
  }

  if (!discoInfo) return null;

  // Generate JSON-LD Schema for FAQs
  const generateFaqSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": discoInfo.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <Layout>
      {/* Dynamic SEO JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFaqSchema()) }}
      />

      {/* Hero Section */}
      <section className="p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <div className="relative z-10 text-center max-w-3xl mx-auto pt-4 md:pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-600 transition-colors mb-6 uppercase tracking-wider">
             <ArrowLeft className="w-4 h-4" /> Back to all providers
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6">
              Official {discoInfo.name} Portal
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Check <span className="text-emerald-600">{discoInfo.name}</span> Online Bill.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              {discoInfo.shortDescription}
            </p>
          </div>
        </div>
          
        <BillChecker initialDisco={discoInfo.id} />
      </section>

      {/* Dynamic SEO Rich Content Areas */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section 1: Jurisdiction */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {discoInfo.name} Jurisdiction & Coverage Areas
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 max-w-3xl">
              The {discoInfo.fullName} ({discoInfo.name}) is responsible for distributing and supplying electricity to a massive network of consumers across key Pakistani regions. As an independent power distributor under the broader WAPDA infrastructure umbrella, {discoInfo.name} operations ensure continuous energy supply to millions of residential, commercial, industrial, and agricultural consumers.
            </p>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Official Coverage Areas Include:</h3>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className="text-slate-800 font-bold text-lg leading-relaxed">
                  {discoInfo.jurisdiction}.
                </p>
              </div>
              <p className="text-sm text-slate-500 mt-4 italic font-medium">
                If your city is not mentioned in the broad regions above but borders them, you likely fall under the {discoInfo.name} technical zone. Check the header of an old physical bill to confirm.
              </p>
            </div>
            
            <div className="mt-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Understanding Your {discoInfo.name} Electricity Bill and Taxes</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Whenever you perform a successful {discoInfo.name} online bill check, the generated PITC duplicate copy displays completely itemized charges. It is critical to understand the components of your electricity bill to avoid billing disputes and understand exactly what you are paying for every month.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium">
                <li><strong>FPA (Fuel Price Adjustment):</strong> This fluctuates monthly. If the cost of fuel used by power generation companies (like furnace oil or coal) increases globally, {discoInfo.name} will pass these costs down via an FPA surcharge.</li>
                <li><strong>TR Surcharge (Tariff Rationalization Surcharge):</strong> This is to bridge the gap between NEPRA-determined tariffs and government-notified uniform tariffs across all DISCOs in Pakistan.</li>
                <li><strong>FC Surcharge (Financing Cost Surcharge):</strong> Applied to guarantee the collection of debt servicing for the Power Holding Private Limited (PHPL).</li>
                <li><strong>General Sales Tax (GST) & TV Fee:</strong> Standard provincial and federal taxes applied based on the number of consumed units, along with a static PTV fee collection mechanism mandated by the government.</li>
              </ul>
            </div>
          </div>

          {/* Section 1.5: Saving & Registration */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Electricity Saving Tips & Complaint Registration for {discoInfo.name} Consumers
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-4">
              Electricity tariffs have climbed significantly, making it essential for every user to monitor their consumption closely. Conducting your monthly {discoInfo.name} bill check online helps you track usage trends over the last 12 months, thanks to the historic consumption graph natively printed on the duplicate bill.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              To keep your {discoInfo.name} billing amount as low as possible, aim to limit heavy electrical appliance usage during peak hours (usually between 6 PM to 10 PM in summers, and 5 PM to 9 PM in winters depending on regional declarations). Ironing clothes, running air conditioners, and using water pumps continuously during these hours triggers peak pricing blocks which are substantially more expensive than off-peak hours. Shift your heavy load to the early morning.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-10 mb-4">How to Correct Registration Details or Register a Complaint?</h3>
            <p className="text-slate-600 leading-relaxed text-lg mb-4">
              If your {discoInfo.name} duplicate electricity bill shows an incorrect consumer name or address, or if you suspect your meter is running excessively fast resulting in an inflated bill, you should not delay registering a formal complaint.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Visit the official {discoInfo.fullName} customer service centers located near you, or utilize the federal 'CCMS' (Customer Complaint Management System) portal. When lodging a complaint—whether for overbilling, incorrect tariff categorization, or physical meter repairs—you must invariably provide the 14-digit reference number associated with your property.
            </p>
          </div>

          {/* Section 2: Payments */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              How to pay your {discoInfo.name} bill
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Standing in long post office or bank queues is a thing of the past. Once you have fetched your duplicate bill above and verified the exact due amount, you can quickly pay it from your phone.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* JazzCash Panel */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                 <div className="bg-slate-900 px-5 py-4">
                   <h3 className="text-white font-bold tracking-tight">Paying via JazzCash</h3>
                 </div>
                 <div className="p-6 bg-slate-50 text-slate-700 text-sm space-y-4 font-medium">
                   <p className="flex gap-2"><strong className="text-slate-900">1.</strong> Log into the JazzCash application.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">2.</strong> Tap on the "Utility Bills" icon.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">3.</strong> Select "Electricity" and find "{discoInfo.name}".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">4.</strong> Enter the 14-digit reference number you searched with above.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">5.</strong> Review the amount and enter your MPIN to confirm.</p>
                 </div>
              </div>

               {/* Easypaisa Panel */}
               <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                 <div className="bg-emerald-600 px-5 py-4">
                   <h3 className="text-white font-bold tracking-tight">Paying via EasyPaisa</h3>
                 </div>
                 <div className="p-6 bg-slate-50 text-slate-700 text-sm space-y-4 font-medium">
                   <p className="flex gap-2"><strong className="text-slate-900">1.</strong> Launch your EasyPaisa app.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">2.</strong> Tap on "Bill Payment".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">3.</strong> Tap on "Electricity" and select "{discoInfo.name}".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">4.</strong> Scan the bar code from the duplicate bill above, OR enter the 14-digit reference.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">5.</strong> Tap "Pay Now".</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Provider Specific FAQ Section */}
          <div className="mb-12 border-t border-slate-200 pt-12">
            <div className="text-center mb-8">
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs mb-3 block">{discoInfo.name} Support FAQ</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {discoInfo.faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white rounded-2xl border border-slate-200 shadow-sm [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-5 md:p-6 text-slate-900 font-bold text-lg hover:text-emerald-700 transition-colors">
                    {faq.question}
                    <span className="shrink-0 rounded-full bg-slate-50 p-1.5 text-slate-400 group-open:-rotate-180 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-5 pb-6 md:px-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4 font-medium">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
