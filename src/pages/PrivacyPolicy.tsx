import React from 'react';
import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 w-full">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-8 tracking-tight border-b border-slate-100 pb-6">Privacy Policy</h1>
          
          <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
            <p className="text-lg text-slate-700">
              Welcome to WAPDA Online Bill Check. We place the highest priority on your digital privacy and data security. This comprehensive Privacy Policy document outlines in explicit detail exactly what information is collected, what information is completely ignored, and how we ensure your data remains secure while you utilize our free web-based utility for checking your duplicate electricity bill online in Pakistan.
            </p>
            <p className="text-lg text-slate-700">
              Because our tool is fundamentally designed to act as a secure bridge—routing you to the official Water and Power Development Authority (WAPDA) endpoints—our data collection footprint is virtually non-existent. We believe that accessing basic public utility records should never come at the cost of personal data harvesting.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">1. Information We Do Not Collect</h2>
              <p className="mb-4">
                We feel it is important to start by clearly stating what we do not collect. Our architecture is deliberately designed to operate completely stateless. <strong className="text-slate-900">We do not collect, store, transmit, or process any personal identifiable information (PII), reference numbers, CNIC data, names, or financial billing information on our backend servers.</strong>
              </p>
              <p className="mb-4">
                When you interact with our website and type in your 14-digit reference number, this string of numbers is handled exclusively on the client-side (directly within your web browser app). It is instantly aggregated into a URL query parameter to forward you to the corresponding governmental PITC portal.
              </p>
              <p>
                At no point does our server intercept, log, or save this 14-digit number. We have absolutely no database of users, no historic logs of whose meter number was checked when, and no mechanisms to tie an IP address to a specific household electricity bill.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">2. How Our Service Actually Works</h2>
              <p className="mb-4">
                Our website functions purely as an informational directory and dynamic URL constructor. The landscape of electricity distribution companies in Pakistan spans multiple individual corporate entities (such as LESCO, MEPCO, IESCO, FESCO, GEPCO, PESCO, HAZECO, and HESCO). Navigating the fragmented web infrastructure to find the correct billing portal for your specific region can often be frustrating.
              </p>
              <p className="mb-4">
                When you enter a reference number, our tool analyzes the selected DISCO provider and simply pieces together the official web address. It then successfully redirects your browser tab or iframe to the highly secured, official government databases (typically hosted on the bill.pitc.com.pk domain) where your official duplicate PDF bill is generated.
              </p>
              <p>
                Because the actual bill rendering happens on the official PITC external servers, any financial data you see on screen is coming directly from the government servers to your screen. Our server only provided the map to get there.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">3. Log Files, Cookies, and Analytics</h2>
              <p className="mb-4">
                Like almost all modern websites, we utilize standard log files and basic analytics to understand general website traffic and improve our user interface. The information collected by these standard operational logs includes generic data such as your Internet Protocol (IP) address, browser type (Chrome, Safari, Firefox), Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.
              </p>
              <p className="mb-4">
                These logs are entirely disconnected from any personal bill information. We leverage this aggregated, anonymous demographic data solely to understand which devices our users prefer (mobile vs desktop) ensuring we maintain a highly responsive and lightning-fast user interface.
              </p>
              <p>
                We may also deploy basic essential cookies to remember your selected DISCO for your next visit, saving you time the next time you need to check a bill. You can freely disable cookies through your individual browser options without breaking the core functionality of the bill checking tool.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">4. Third-Party Links, Framing, and Redirections</h2>
              <p className="mb-4">
                Our core service relies on linking out to the official portals provided by the Power Information Technology Company (PITC) and the Ministry of Energy. Once you have initiated a bill check and the official bill loads, you are officially communicating with those third-party government platforms.
              </p>
              <p className="mb-4">
                These third-party ad servers, network domains, or governmental servers have their own comprehensive Privacy Policies. They may employ technologies like their own cookies, JavaScript, or Web Beacons that are sent directly to your browser. By the nature of the internet, they automatically receive your IP address when this occurs.
              </p>
              <p>
                We have absolutely no access to or control over these cookies or server logging behaviors that are used by third-party websites. If you have deep technical concerns regarding exactly how PITC handles web traffic logging for their billing endpoints, you must consult the respective privacy policies of the Water and Power Development Authority directly.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">5. Google AdSense and Advertising Partners</h2>
              <p className="mb-4">
                To keep this online utility completely free for all citizens of Pakistan, we may display contextual advertisements provided by third-party advertising networks, such as Google AdSense. Google uses cookies (specifically the DoubleClick DART cookie) to serve ads based on a user's prior visits to our website or other websites on the internet.
              </p>
              <p className="mb-4">
                Advertising partners use this non-identifiable data to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit. You may opt out of the use of the DART cookie by visiting the Google ad and content network Privacy Policy at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">6. Children's Information and Safety</h2>
              <p className="mb-4">
                Another paramount priority for us is adding protection for children while using the internet. We strongly encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Although checking an electricity bill is a mundane household task, we maintain strict safety policies.
              </p>
              <p>
                Our platform does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child inadvertently submitted personal information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from any temporary caching layers, should it exist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">7. Consent and Continuous Updates</h2>
              <p className="mb-4">
                By actively utilizing our website to perform your duplicate bill checks, you hereby consent to our Privacy Policy and agree to its extensive terms. Because the digital landscape is constantly shifting, we reserve the right to update this privacy policy from time to time to reflect changes to our operational practices or legal requirements set forth by Pakistani cyber laws.
              </p>
              <p>
                If we decide to drastically change our privacy framework—for instance, if we ever decided to launch an optional user-account system where emails are stored—we would prominently post those modifications on this page to ensure you are always completely aware of what data is collected and how it is used. We encourage users to frequently check this long-form page for any updates.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
