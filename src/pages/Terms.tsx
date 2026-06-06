import React from 'react';
import Layout from '../components/Layout';
import { useSEO } from '../hooks/useSEO';

export default function Terms() {
  useSEO({
    title: "Terms and Conditions | WAPDA Online Bill Check",
    description: "Read the Terms and Conditions of using WAPDA Online Bill Check. Learn about your rights, obligations, and limitations when using our utility tool.",
    canonical: "https://www.wapdaonlinebillcheck.com/terms-and-conditions"
  });

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-6">Terms and Conditions</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
            <p className="text-lg text-slate-700 mb-8">
              By accessing and using the WAPDA Online Bill Check website, you accept and agree to be bound by the terms and provisions of this comprehensive agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this online utility.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Fundamental Use of the Free Service</h2>
              <p className="mb-4">
                Our website provides a free, ad-supported, simplified directory tool intended to assist citizens of Pakistan in navigating to the official Water and Power Development Authority (WAPDA) duplicate electricity bill portals. You explicitly agree to use this directory and redirection service for lawful, personal purposes only. 
              </p>
              <p className="mb-4">
                You are strictly prohibited from utilizing this platform for any automated data scraping, framing, macro executions, backend reverse-engineering of the directory forms, or deploying brute-force scripts that rapidly attempt to ping our server architecture or the underlying external PITC endpoints. Any such behavior will result in a permanent IP block and potential legal forwarding to local cyber authorities.
              </p>
              <p>
                By using the platform, you acknowledge that our role is strictly limited to that of an informational facilitator. We do not generate, alter, modify, or intercept the content of your duplicate utility bill.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. Third-Party Navigational Redirection</h2>
              <p className="mb-4">
                It is paramount to understand that we do not issue electricity bills, we do not calculate tariffs, and we do not collect any form of payment for utility bills. Our user interface is a shell that exclusively redirects users to the correct, authoritative WAPDA billing system page relevant to their specific Distribution Company (DISCO).
              </p>
              <p className="mb-4">
                Any financial payments made online through banking portals, issues concerning incorrect meter readings, disputes regarding applied surcharges, or technical failures preventing the downloading of exact historic records must be handled directly via the respective electricity distribution company's official helpline.
              </p>
              <p>
                We hold zero administrative authority over the backend bill generation servers hosted by PITC. Consequently, we are completely disconnected from any billing dispute resolution processes and cannot offer customer support for electricity-related complaints.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. "As Is" and "As Available" Service Provision</h2>
              <p className="mb-4">
                The tools, indexing services, and redirections on our website are provided entirely on an "as is" and "as available" basis. We make absolutely no warranties, expressed or implied, regarding the continuous availability of the site, its fitness for a particular purpose, or the operational status of the underlying official servers hosting the digital PDF bills.
              </p>
              <p className="mb-4">
                The digital infrastructure governing the national electricity grid's databases frequently undergoes maintenance (particularly near monthly billing cycles). If the official government backend is offline, unresponsive, or experiencing severe latency, our frontend tool will also be unable to retrieve your duplicate bill. We are not liable for these third-party outages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Exemption and Limitation of Liability</h2>
              <p className="mb-4">
                In no event whatsoever shall the owners, operators, developers, or affiliates of this website be liable for any special, direct, indirect, consequential, punitive, or incidental damages or any damages whatsoever arising out of or in connection with the use of the Service or the contents of the Service.
              </p>
              <p className="mb-4">
                This comprehensive limitation of liability applies to any damages or injury caused by any failure of performance, error, omission, interruption, deletion, defect, delay in operation or transmission, computer virus, communication line failure, theft or destruction or unauthorized access to, alteration of, or use of record, whether for breach of contract, tortious behavior, negligence, or under any other cause of action.
              </p>
              <p>
                We reserve the absolute right to make additions, deletions, or structural modifications to the contents, features, and UI workflows on the Service at any time without prior notice or consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">5. User Obligations and Accurate Information</h2>
              <p className="mb-4">
                When you input your 14-digit reference number, you bear the sole responsibility for ensuring you have selected the correct geographical DISCO (e.g., LESCO, MEPCO, IESCO) from the dropdown list and that the numerals entered are exactly accurate. The system performs a programmatic query based strictly on your input.
              </p>
              <p>
                Entering incorrect parameters will naturally result in an error or the retrieval of a different meter's public bill. Because these bills are a matter of public utility record in Pakistan (queryable by anyone possessing the valid syntax), you must ensure you use this transparency feature ethically and only query meter numbers you are authorized to review or manage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">6. Explicit Acknowledgment of Unaffiliated Status</h2>
              <p className="mb-4">
                As explicitly stated across the website headers, footers, and our Disclaimer page, you acknowledge that we are not the government, nor are we authorized digital representatives, contractors, or agents of the electric supply companies in Pakistan. You are electing to use our search utility purely for personal convenience.
              </p>
              <p className="mb-4">
                Should you require legally authenticated copies of your electricity bill for governmental property registrations, passport applications, or court disputes, you are strongly advised to obtain stamped physical copies directly from your regional WAPDA commercial center, as a web-downloaded duplicate printout may not suffice for strict legal administrative procedures.
              </p>
              <p>
                This agreement and the interpretations of its terms shall be governed by and construed in accordance with standard civil laws. Any modifications to this document will be binding immediately upon publishing.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
