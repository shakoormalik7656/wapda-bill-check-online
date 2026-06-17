import React from 'react';
import { useParams, Link, Redirect } from 'wouter';
import Layout from '../components/Layout';
import BillChecker from '../components/BillChecker';
import { DISCO_DATA, getAllDiscos, getCurrentMonthYear, buildCommonFaqs } from '../content/discoData';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, CheckCircle, Search, FileText, CreditCard, Smartphone, Phone, Clock, MapPin } from 'lucide-react';

export default function Disco() {
  const params = useParams<{ disco: string }>();
  const disco = params?.disco;

  // Read synchronously — DISCO_DATA is a plain object, no async needed.
  // This ensures useSEO always has correct data on the first render cycle.
  const discoInfo = disco ? (DISCO_DATA[disco] ?? null) : null;

  // Always-fresh date so titles/H1s read "… June 2026" and never go stale.
  const monthYear = getCurrentMonthYear();
  const primaryCity = discoInfo?.cities[0] ?? '';

  useSEO({
    title: discoInfo
      ? `${discoInfo.name} Bill ${monthYear} - Online Check & Download Duplicate Bill`
      : 'WAPDA Online Bill Check | Check Duplicate Electricity Bill Pakistan',
    description: discoInfo
      ? `Check your ${discoInfo.name} bill ${monthYear} online. Enter your 14-digit reference number to view, print & download your ${primaryCity} ${discoInfo.name} (${discoInfo.fullName}) duplicate electricity bill for ${monthYear} — free, instant & accurate.`
      : 'Check your duplicate WAPDA electricity bill online.',
    canonical: discoInfo
      ? `https://www.wapdaonlinebillcheck.com/${discoInfo.id}`
      : undefined,
  });

  if (!disco || !DISCO_DATA[disco]) {
    return <Redirect to="/" />;
  }

  const info = discoInfo!;

  // Lead with the DISCO's unique hand-written FAQs, then a few generated
  // high-intent ones (matched to real GSC queries). Used for rendering + schema.
  const allFaqs = [...info.faqs, ...buildCommonFaqs(info)];

  // Generate JSON-LD Schema for FAQs
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.wapdaonlinebillcheck.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${info.name} Online Bill Check`,
        item: `https://www.wapdaonlinebillcheck.com/${info.id}`,
      },
    ],
  };

  // HowTo schema — earns rich results for "how to check {DISCO} bill" queries.
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Check ${info.name} Online Bill by Reference Number`,
    description: `Step-by-step guide to check and download your ${info.fullName} (${info.name}) duplicate electricity bill online using your 14-digit reference number.`,
    step: [
      { '@type': 'HowToStep', name: `Select ${info.name}`, text: `Choose ${info.name} from the provider list in the bill checker.` },
      { '@type': 'HowToStep', name: 'Enter reference number', text: 'Type your 14-digit reference number from any old bill, without spaces.' },
      { '@type': 'HowToStep', name: 'Get bill', text: `Click "Get Bill" to open the official PITC portal and load your ${info.name} duplicate bill.` },
      { '@type': 'HowToStep', name: 'Print or download', text: 'Use Ctrl+P / Save as PDF to download or print your bill.' },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero Section */}
      <section className="p-4 md:p-8 flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <div className="relative z-10 text-center max-w-3xl mx-auto pt-4 md:pt-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-emerald-600 transition-colors mb-6 uppercase tracking-wider">
             <ArrowLeft className="w-4 h-4" /> Back to all providers
          </Link>

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-6">
              Official {info.name} Portal · {monthYear}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              {info.name} <span className="text-emerald-600">Online Bill Check</span> {monthYear}
            </h1>
            <p className="text-base md:text-lg text-slate-500 mb-4 font-semibold">
              Check &amp; download your {info.name} bill for {monthYear} — enter your 14-digit reference number to view your {primaryCity} duplicate electricity bill instantly.
            </p>
            <p className="text-lg md:text-xl text-slate-500 mb-4 leading-relaxed font-medium">
              {info.shortDescription}
            </p>
            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed">
              {info.intro}
            </p>
          </div>
        </div>

        <BillChecker initialDisco={info.id} />
      </section>

      {/* Dynamic SEO Rich Content Areas */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          {/* Section: How to check (HowTo) */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <Search className="w-7 h-7 text-emerald-600 shrink-0" />
              How to Check {info.name} Bill Online ({monthYear})
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 max-w-3xl">
              Performing a {info.name} online bill check takes less than a minute. Our free tool connects you directly to the official PITC billing portal, so you can view, print, and download your latest {info.fullName} duplicate bill from any phone or computer — no registration or app required.
            </p>
            <ol className="space-y-4 list-decimal list-inside text-slate-700 font-medium">
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Select {info.name}:</strong> Choose {info.name} from the provider dropdown in the bill checker above.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Enter your 14-digit reference number:</strong> Find it on the top corner of any old {info.name} bill and type the 14 digits without spaces.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Click "Get Bill":</strong> The official {info.name} portal opens with your duplicate bill loaded — your reference number is auto-copied so you can paste it instantly.</li>
              <li className="bg-slate-50 px-5 py-4 rounded-xl border border-slate-100"><strong>Print or download:</strong> Use Ctrl+P (or your phone's share menu) and choose "Save as PDF" to keep a copy for bank, Easypaisa, or JazzCash payment.</li>
            </ol>
          </div>

          {/* Section: Reference number location */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Where to Find Your 14-Digit {info.name} Reference Number
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              The 14-digit reference number is the single most important code for any {info.name} bill online check by reference number. It uniquely identifies your meter connection and is required for both viewing your duplicate bill and making digital payments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-emerald-500 bg-emerald-50/50 p-6 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-lg mb-2">On your paper bill</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Look at the <strong>top-left or top-right corner</strong> of any previous {info.name} bill, just above the consumer name. It is formatted like
                  <code className="bg-white border border-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-md text-xs font-mono ml-1">01 11435 1234567 U</code>.
                  Enter only the 14 numeric digits, combined without spaces.
                </p>
              </div>
              <div className="border-l-4 border-slate-400 bg-slate-100/50 p-6 rounded-r-xl">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Lost your old bill?</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  If you don't have a previous bill, ask a neighbour on the same {info.name} feeder, visit your nearest {info.name} sub-division office with your CNIC, or check an old payment SMS/receipt from Easypaisa or JazzCash — the reference number is printed on those too.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Reference Number vs Customer ID */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              {info.name} Bill Check by Reference Number vs Customer ID
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              Many {info.name} consumers ask whether they can perform a bill check by customer ID, CNIC, or name. Here is exactly which identifier works where:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 text-lg mb-2">14-Digit Reference Number</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  The universal standard. Required for retrieving the full, printable {info.name} duplicate bill from the official portal and for almost every banking/wallet payment. Always keep these 14 digits on record.
                </p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50">
                <h3 className="font-bold text-slate-900 text-lg mb-2">10-Digit Customer ID</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  A shorter ID used mainly inside the 1Link payment network (ATMs and some apps) to fetch the payable amount. It does not pull the comprehensive printable duplicate copy, so the reference number remains the better choice for a {info.name} bill check online.
                </p>
              </div>
            </div>
            <p className="text-slate-500 leading-relaxed mt-6 text-base italic font-medium">
              Note: A {info.name} bill check by CNIC or by name is not officially supported due to privacy regulations. A valid 14-digit reference number (or, on payment apps, the 10-digit customer ID) is strictly required.
            </p>
          </div>

          {/* Section: SMS & App */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <Smartphone className="w-7 h-7 text-emerald-600 shrink-0" />
              Other Ways to Check Your {info.name} Bill
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Online (fastest)</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Use the {info.name} bill checker on this page with your 14-digit reference number to instantly view and download a printable duplicate bill.</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-2">Via mobile wallet apps</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Open JazzCash or Easypaisa, go to Utility/Bill Payment, select Electricity → {info.name}, and enter your reference number to see and pay the current amount.</p>
              </div>
              <div className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-2">At an office / bank</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Visit any {info.name} sub-division office, post office, or bank branch with your reference number for a printed copy or to pay in cash.</p>
              </div>
            </div>
          </div>

          {/* Section 1: Jurisdiction */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <MapPin className="w-7 h-7 text-emerald-600 shrink-0" />
              {info.name} Jurisdiction &amp; Coverage Areas
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-4 max-w-3xl">
              {info.about}
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 max-w-3xl">
              {info.regionalContext}
            </p>

            {/* City keyword pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {info.cities.map((city) => (
                <span key={city} className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold">
                  {city} bill check
                </span>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Official Coverage Areas Include:</h3>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <p className="text-slate-800 font-bold text-lg leading-relaxed">
                  {info.jurisdiction}.
                </p>
              </div>
              <p className="text-sm text-slate-500 mt-4 italic font-medium">
                If your city is not mentioned in the broad regions above but borders them, you likely fall under the {info.name} technical zone. Check the header of an old physical bill to confirm.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Understanding Your {info.name} Electricity Bill and Taxes</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Whenever you perform a successful {info.name} online bill check, the generated PITC duplicate copy displays completely itemized charges. It is critical to understand the components of your electricity bill to avoid billing disputes and understand exactly what you are paying for every month.
              </p>
              <ul className="list-disc pl-6 space-y-3 text-slate-700 font-medium">
                <li><strong>FPA (Fuel Price Adjustment):</strong> This fluctuates monthly. If the cost of fuel used by power generation companies (like furnace oil or coal) increases globally, {info.name} will pass these costs down via an FPA surcharge.</li>
                <li><strong>TR Surcharge (Tariff Rationalization Surcharge):</strong> This is to bridge the gap between NEPRA-determined tariffs and government-notified uniform tariffs across all DISCOs in Pakistan.</li>
                <li><strong>FC Surcharge (Financing Cost Surcharge):</strong> Applied to guarantee the collection of debt servicing for the Power Holding Private Limited (PHPL).</li>
                <li><strong>General Sales Tax (GST) &amp; TV Fee:</strong> Standard provincial and federal taxes applied based on the number of consumed units, along with a static PTV fee collection mechanism mandated by the government.</li>
              </ul>
            </div>
          </div>

          {/* Section: Peak Hours */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <Clock className="w-7 h-7 text-emerald-600 shrink-0" />
              {info.name} Peak Hours &amp; Time-of-Use (ToU) Tariff
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              Consumers with a Time-of-Use (ToU) meter are charged a higher per-unit rate during peak-load hours. Shifting heavy appliances like air conditioners, water pumps, and irons to off-peak hours is the single fastest way to lower your {info.name} bill. The general peak windows declared across Pakistan are:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-white text-sm">
                  <tr>
                    <th className="px-5 py-3 font-bold">Season</th>
                    <th className="px-5 py-3 font-bold">Peak Hours (higher rate)</th>
                    <th className="px-5 py-3 font-bold">Off-Peak (cheaper)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 font-medium text-sm">
                  <tr className="bg-slate-50 border-t border-slate-200">
                    <td className="px-5 py-3 font-bold">Summer (Apr–Oct)</td>
                    <td className="px-5 py-3">6:00 PM – 10:00 PM</td>
                    <td className="px-5 py-3">All other hours</td>
                  </tr>
                  <tr className="bg-white border-t border-slate-200">
                    <td className="px-5 py-3 font-bold">Winter (Nov–Mar)</td>
                    <td className="px-5 py-3">5:00 PM – 9:00 PM</td>
                    <td className="px-5 py-3">All other hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-500 mt-4 italic font-medium">
              Peak windows are general guidance and may vary slightly by regional notification. Your exact peak/off-peak units are printed on the {info.name} duplicate bill you download above.
            </p>
          </div>

          {/* Section 1.5: Saving & Registration */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Electricity Saving Tips &amp; Complaint Registration for {info.name} Consumers
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-4">
              Electricity tariffs have climbed significantly, making it essential for every user to monitor their consumption closely. Conducting your monthly {info.name} bill check online helps you track usage trends over the last 12 months, thanks to the historic consumption graph natively printed on the duplicate bill.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              To keep your {info.name} billing amount as low as possible, aim to limit heavy electrical appliance usage during peak hours (usually between 6 PM to 10 PM in summers, and 5 PM to 9 PM in winters depending on regional declarations). Ironing clothes, running air conditioners, and using water pumps continuously during these hours triggers peak pricing blocks which are substantially more expensive than off-peak hours. Shift your heavy load to the early morning.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-10 mb-4">How to Correct Registration Details or Register a Complaint?</h3>
            <p className="text-slate-600 leading-relaxed text-lg mb-4">
              If your {info.name} duplicate electricity bill shows an incorrect consumer name or address, or if you suspect your meter is running excessively fast resulting in an inflated bill, you should not delay registering a formal complaint.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              Visit the official {info.fullName} customer service centers located near you, or utilize the federal 'CCMS' (Customer Complaint Management System) portal. When lodging a complaint—whether for overbilling, incorrect tariff categorization, or physical meter repairs—you must invariably provide the 14-digit reference number associated with your property.
            </p>
          </div>

          {/* Section 2: Payments */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <CreditCard className="w-7 h-7 text-emerald-600 shrink-0" />
              How to Pay Your {info.name} Bill
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              Standing in long post office or bank queues is a thing of the past. Once you have fetched your duplicate bill above and verified the exact due amount, you can quickly pay it from your phone.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                 <div className="bg-slate-900 px-5 py-4">
                   <h3 className="text-white font-bold tracking-tight">Paying via JazzCash</h3>
                 </div>
                 <div className="p-6 bg-slate-50 text-slate-700 text-sm space-y-4 font-medium">
                   <p className="flex gap-2"><strong className="text-slate-900">1.</strong> Log into the JazzCash application.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">2.</strong> Tap on the "Utility Bills" icon.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">3.</strong> Select "Electricity" and find "{info.name}".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">4.</strong> Enter the 14-digit reference number you searched with above.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">5.</strong> Review the amount and enter your MPIN to confirm.</p>
                 </div>
              </div>

               <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                 <div className="bg-emerald-600 px-5 py-4">
                   <h3 className="text-white font-bold tracking-tight">Paying via EasyPaisa</h3>
                 </div>
                 <div className="p-6 bg-slate-50 text-slate-700 text-sm space-y-4 font-medium">
                   <p className="flex gap-2"><strong className="text-slate-900">1.</strong> Launch your EasyPaisa app.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">2.</strong> Tap on "Bill Payment".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">3.</strong> Tap on "Electricity" and select "{info.name}".</p>
                   <p className="flex gap-2"><strong className="text-slate-900">4.</strong> Scan the bar code from the duplicate bill above, OR enter the 14-digit reference.</p>
                   <p className="flex gap-2"><strong className="text-slate-900">5.</strong> Tap "Pay Now".</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Section: Helpline & Contact */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight flex items-center gap-3">
              <Phone className="w-7 h-7 text-emerald-600 shrink-0" />
              {info.name} Helpline &amp; Complaint Numbers
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              For power breakdowns, overbilling, meter faults, or billing disputes in {info.jurisdiction}, you can reach the {info.name} customer support channels below. Always keep your 14-digit reference number ready when you call.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">Universal Power Helpline</span>
                <p className="text-3xl font-black text-slate-900 mt-1">{info.helpline}</p>
                <p className="text-sm text-slate-600 font-medium mt-2">Free, 24/7, from any Pakistani mobile or landline. Report {info.name} faults and complaints.</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Online Complaints</span>
                <p className="text-lg font-bold text-slate-900 mt-1">CCMS Portal</p>
                <p className="text-sm text-slate-600 font-medium mt-2">Use the federal Customer Complaint Management System to lodge {info.name} overbilling, tariff, or meter-repair complaints online with your reference number.</p>
              </div>
            </div>
          </div>

          {/* Other DISCOs internal links */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Check Bills for Other Providers</h2>
            <div className="flex flex-wrap gap-3">
              {getAllDiscos()
                .filter((d) => d.id !== info.id)
                .map((d) => (
                  <Link
                    key={d.id}
                    href={`/${d.id}`}
                    className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
                  >
                    {d.name} Bill Check
                  </Link>
                ))}
            </div>
          </div>

          {/* Provider Specific FAQ Section */}
          <div className="mb-12 border-t border-slate-200 pt-12">
            <div className="text-center mb-8">
              <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs mb-3 block">{info.name} Support FAQ</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{info.name} Online Bill Check — Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {allFaqs.map((faq, idx) => (
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
