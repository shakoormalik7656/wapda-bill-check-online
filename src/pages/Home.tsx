import React from 'react';
import Layout from '../components/Layout';
import BillChecker from '../components/BillChecker';
import { getAllDiscos, getCurrentMonthYear } from '../content/discoData';
import { Link } from 'wouter';
import { useSEO } from '../hooks/useSEO';
import { ArrowRight } from 'lucide-react';

const WEB_APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'WAPDA Online Bill Check',
  url: 'https://www.wapdaonlinebillcheck.com/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description:
    'Free online tool to check and download duplicate WAPDA electricity bills for all Pakistan DISCOs including LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HAZECO, and HESCO.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'PKR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Pakistan',
  },
};

const GLOBAL_FAQS = [
  {
    question: "How to Check WAPDA Bill Online?",
    answer: "Checking your duplicate WAPDA bill online is simple. Select your electricity provider (DISCO) from the dropdown list, and click 'Load Portal'. This opens the official form where you can enter your 14-digit reference number from an old bill."
  },
  {
    question: "What is the difference between Reference Number and Consumer ID?",
    answer: "The Reference Number is a 14-digit code primarily used for fetching online bills and making digital payments via standard banking apps. The Consumer ID is a 10-digit number utilized by some newer payment portals (e.g., 1Link) but the 14-digit reference is universally accepted across all DISCOs."
  },
  {
    question: "Can I check my WAPDA duplicate bill by CNIC or Name?",
    answer: "Currently, the official electricity billing systems do not allow bill retrieval via CNIC or Name due to privacy regulations. A valid 14-digit reference number is strictly required."
  }
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GLOBAL_FAQS.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function Home() {
  const monthYear = getCurrentMonthYear();
  useSEO({
    title: `WAPDA Online Bill Check ${monthYear} | Electricity Duplicate Bill Pakistan`,
    description: `Check and download your duplicate WAPDA electricity bill online for ${monthYear}. Free bill check by 14-digit reference number for LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HESCO, QESCO, SEPCO, TESCO & HAZECO.`,
    canonical: "https://www.wapdaonlinebillcheck.com/"
  });

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_APP_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      
      <div className="p-4 md:p-8 gap-8 w-full max-w-7xl mx-auto flex flex-col">
        {/* Main Interface Section */}
        <section className="flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col pt-4 md:pt-8 w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Electricity Bill <span className="text-emerald-600">Online Check</span>
              </h1>
              <p className="mt-4 text-lg text-slate-600 font-medium">
                Select your provider and fetch your electricity bill instantly from official servers.
              </p>
            </div>
            <BillChecker initialDisco="iesco" />
          </div>
        </section>

        {/* All Providers directory grid — internal linking + crawl depth */}
        <section className="max-w-4xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2 text-center">
            Select Your Electricity Provider (DISCO)
          </h2>
          <p className="text-slate-500 font-medium text-center mb-8">
            Open your provider's page for a dedicated bill check, payment guide, and FAQs.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {getAllDiscos().map((disco) => (
              <Link
                key={disco.id}
                href={`/${disco.id}`}
                className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all p-5 flex flex-col gap-1"
              >
                <span className="flex items-center justify-between text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {disco.name}
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
                </span>
                <span className="text-xs text-slate-500 font-medium leading-snug">{disco.fullName}</span>
                <span className="text-[11px] text-emerald-700 font-bold mt-1">{disco.cities[0]} Bill Check →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* SEO Rich Content Areas */}
        <section className="py-12 space-y-12 max-w-4xl mx-auto w-full">
          
          {/* Section 1 */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">How to Check WAPDA Bill Online?</h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 max-w-3xl">
              Retrieving your electricity duplicate bill used to require waiting for physical mail or visiting local WAPDA offices. Now, our streamlined tool queries the official backend Pitc.com.pk databases to deliver your bill securely right to your browser screen. Whether you are living in Lahore, Karachi, Islamabad, or any other city in Pakistan, obtaining a digital copy of your bijli ka bill has never been easier or faster.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 max-w-3xl">
              Our online bill check platform bridges the gap between you and your electricity distribution company. It eliminates the hassle of misplaced papers. Now, you can perform your WAPDA bill online check from the comfort of your own home, anytime, using any device with internet access.
            </p>
            <ol className="space-y-4 list-decimal list-inside text-slate-700 font-medium">
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Select your DISCO:</strong> Use the dropdown on our tool to pick your local power provider (e.g., LESCO for Lahore, MEPCO for Multan, IESCO for Islamabad). The correct provider is required to route your request to the appropriate regional server.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Locate your Reference Number:</strong> Get an old electricity bill and look at the top-left or top-right corners for the 14-digit numeric code. This identifier is unique to your meter connection.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Search:</strong> Click 'Load Portal', then enter the exact 14 digits (without spacing) directly into the provider's form below. Make sure you don't include the 'U' or other alphabets unless explicitly asked.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Print or Download:</strong> Once loaded in the iframe viewer, you can use standard browser print tools (Ctrl+P / Cmd+P) to save the bill as a PDF document to your mobile device or computer for record-keeping.</li>
            </ol>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Understanding WAPDA and Electricity DISCOs in Pakistan</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">
              The Water and Power Development Authority (WAPDA) historically managed the entire power sector of Pakistan. To improve efficiency, the power distribution sector was later unbundled into separate corporate entities known as DISCOs (Distribution Companies). Each DISCO is responsible for a specific region.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              For example, if you reside in Gujranwala, your electricity is managed by GEPCO. If you are in Peshawar, you fall under PESCO's jurisdiction. Searching for your electricity bill online check requires you to first identify your assigned DISCO. By structuring our web utility to support all major companies—including LESCO, IESCO, MEPCO, FESCO, GEPCO, PESCO, HAZECO, and HESCO—we ensure all Pakistani citizens can securely access their online bill check services, regardless of their location.
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Understanding Your Bill (Reference Number vs Consumer ID)</h2>
            <p className="text-slate-600 leading-relaxed mb-4 text-lg">
              When trying to pay your electricity bill through modern digital banking applications like EasyPaisa, JazzCash, NayaPay, SadaPay, or standard commercial banking apps (HBL, Meezan, Bank Alfalah), you may encounter requests for different types of identifiers. It's crucial to understand these numbers to ensure a seamless duplicate bill online check and successful payment.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="border-l-4 border-emerald-500 bg-emerald-50/50 p-6 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-lg mb-2">14-Digit Reference Number</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  The universal standard for querying an electricity bill online. It is formatted often as <code className="bg-white border border-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-md text-xs font-mono ml-1">01 11435 1234567 U</code> on the physical paper copy. Our web tool requires the 14 numerical digits combined without spaces. This reference number changes slightly if your connection is updated, but it remains the most reliable tracking number for historic billing data and performing a duplicate bill inquiry. 
                </p>
              </div>
              <div className="border-l-4 border-slate-500 bg-slate-100/50 p-6 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-lg mb-2">10-Digit Consumer ID</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  A modern, simplified ID number issued mostly for internal 1Link portal transactions. While banking platforms and ATMs heavily utilize it for fetching payable amounts, the legacy Pitc.com.pk databases required for requesting a raw, comprehensive duplicate printable copy do not yet support it natively. You should always keep your 14-digit reference handy for record-keeping.
                </p>
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed mt-6 text-lg">
              Additionally, your printed copy contains complex data like meter reading images, historic consumption graphs, and applicable taxes (like GST, TV fee, Fuel Price Adjustment). Conducting a monthly online bill check Pakistan enables you to monitor these fluctuations closely and manage your household energy expenses proactively. Always check the difference between your previous month's units and current month's reading.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {GLOBAL_FAQS.map((faq, idx) => (
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
        </section>
      </div>
    </Layout>
  );
}
