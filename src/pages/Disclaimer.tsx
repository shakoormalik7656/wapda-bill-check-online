import React from 'react';
import Layout from '../components/Layout';
import { Info } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

export default function Disclaimer() {
  useSEO({
    title: "Disclaimer | WAPDA Online Bill Check",
    description: "Important disclaimer regarding using WAPDA Online Bill Check. We are an independent directory tool and not affiliated with any official Pakistani electricity company.",
    canonical: "https://www.wapdaonlinebillcheck.com/disclaimer"
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-6">Disclaimer</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
            
            <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex flex-col sm:flex-row gap-4 items-start">
              <div className="bg-amber-100 p-2 rounded-full shrink-0">
                <Info className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-amber-900 mb-2 mt-1">Not an Official Government Website</h2>
                <p className="text-amber-800 text-sm leading-relaxed">
                  This website is <strong className="font-extrabold text-amber-900">strictly an independent, third-party informational utility</strong>. We are not officially affiliated, associated, authorized, endorsed by, or in any way connected with the Water and Power Development Authority (WAPDA), the Ministry of Energy Pakistan, the Power Information Technology Company (PITC), or any specific distribution company (DISCO) such as LESCO, IESCO, MEPCO, PESCO, GEPCO, FESCO, HAZECO, or HESCO.
                </p>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Educational & Utility Purpose</h2>
              <p className="text-lg mb-4">
                Our system is designed merely to help users quickly find the exact official website for checking and downloading their electricity bills. The fractured nature of regional DISCO websites can make navigating to the correct official bill generation portal difficult for the average consumer. We bridge that gap by providing a unified directory that constructs the correct URL path based on your selected provider.
              </p>
              <p className="text-lg">
                All the electricity bills you view via our portal are generated and fetched directly from the official PITC servers. We serve as a search client, not a database. We absolutely do not generate, modify, or host the historical billing records, tariffs, or PDFs themselves.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. Absolutely No Liability for Data Accuracy</h2>
              <p className="mb-4 text-lg">
                While we strive to ensure our links, web iframes, and redirection routing logic are accurate and up-to-date, we cannot guarantee the uninterrupted availability of the backend official billing portals. We do not take legal, financial, or administrative responsibility for:
              </p>
              <ul className="list-disc leading-relaxed pl-6 space-y-3 text-slate-700 text-lg">
                <li><strong>Server Downtime:</strong> Any downtime, server crashes, or 503 errors experienced on the official bill.pitc.com.pk servers or individual DISCO websites. When their servers go offline, our tool will inherently fail to fetch your bill.</li>
                <li><strong>Billing Inaccuracies:</strong> Any inaccuracies regarding the billing amounts, meter readings, calculation of standard tariffs, general sales taxes, fuel price adjustments, or late payment surcharges. These complex financial matrices are strictly calculated by NEPRA and the respective DISCOs.</li>
                <li><strong>Delayed Database Updates:</strong> Any instances where a recently paid bill still shows as "Unpaid" on the digital portal. WAPDA updating batches can take 2-4 business days to reflect a banking transaction. We have no control over this synchronization delay.</li>
                <li><strong>Financial Consequences:</strong> Any late fees incurred because the official server was down on your due date preventing you from downloading and printing the invoice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Copyrights and Trademarks</h2>
              <p className="text-lg mb-4">
                All logos, brand names, regional acronyms (e.g., LESCO, MEPCO), and trademarks related to WAPDA and the respective power distribution companies belong solely to their respective government entities and corporate owners.
              </p>
              <p className="text-lg mb-4">
                They are used on this website purely under the doctrine of 'fair use' for the sake of identification, educational reference, and informational orientation. Their appearance on this platform does not imply any official partnership, sponsorship, or endorsement. We do not claim any ownership over these governmental intellectual properties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Financial Dealings and Payment Disputes</h2>
              <p className="text-lg mb-4">
                This platform is purely a viewing utility. We do not facilitate the actual financial transaction of paying the bill. When you utilize supplementary apps like EasyPaisa, NayaPay, JazzCash, or standard banking services to clear your dues, you are entering a transaction mediated by those financial institutions.
              </p>
              <p className="text-lg">
                If money is deducted from your bank account but your WAPDA account is not credited, you must contact your bank's dispute department or visit the local commercial center of your specific DISCO. We cannot investigate, reverse, or verify any financial transactions. Always ensure you are paying against the exact 14-digit reference number associated with your property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">5. Continued Usage and Acceptance</h2>
              <p className="text-lg">
                By continuing to utilize the directory and search aggregation tools provided on wapdabillcheck.online (or associated domain), you explicitly state that you have read, understood, and agreed to this full disclaimer document. If you do not accept these limitations of liability, or you require officially stamped utility documents for legal disputes, please exit this website immediately and proceed to your nearest physical WAPDA subdivision office.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
