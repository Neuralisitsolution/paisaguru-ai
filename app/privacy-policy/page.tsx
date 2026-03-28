import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | PaisaGuru - How We Protect Your Data',
  description: 'Read PaisaGuru\'s privacy policy to understand how we collect, use, store, and protect your personal information. GDPR and IT Act 2000 compliant.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Privacy Policy</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-2">Last updated: March 15, 2026</p>
        <p className="text-sm text-gray-500 mb-8">Effective date: March 15, 2026</p>

        <div className="bg-primary-50 border border-primary-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-primary-800">
            <strong>Quick Summary:</strong> We collect only what we need (your email for newsletter, basic analytics for improving the site). We never sell your data. Your calculator inputs are processed in your browser and never stored on our servers. You can unsubscribe or delete your data anytime.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a personal finance education platform operated by Neuralis IT Solutions. Our website address is <strong>paisaguru.com</strong>. We provide free financial calculators, expert articles, quizzes, and AI-powered financial guidance to Indian consumers.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              For any privacy-related questions, you can reach our Data Protection Officer at <strong>privacy@paisaguru.com</strong> or write to us at: Neuralis IT Solutions, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">2.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Newsletter Subscription:</strong> When you subscribe to our newsletter, we collect your email address and optionally your name. This data is stored securely in our database and with our email service provider (Brevo/Sendinblue).</li>
              <li><strong>Contact Form:</strong> When you use our contact form, we collect your name, email address, and message content to respond to your inquiry.</li>
              <li><strong>Quiz Participation:</strong> When you take our finance quizzes, we store your quiz scores and topic preferences to personalize your experience.</li>
              <li><strong>AI Chatbot:</strong> Questions you ask our PaisaGuru AI chatbot are processed in real-time and not permanently stored on our servers. We may log aggregated, anonymized question patterns to improve the chatbot.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">2.2 Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Analytics Data:</strong> We use Google Analytics to understand how visitors use our website. This includes pages visited, time spent, browser type, device type, and approximate geographic location (city level). IP addresses are anonymized.</li>
              <li><strong>Cookies:</strong> We use essential cookies for site functionality and third-party cookies for analytics and advertising (see Section 5).</li>
              <li><strong>Server Logs:</strong> Our hosting provider (Vercel) automatically collects standard server log data including IP addresses, browser user agents, and request timestamps.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">2.3 What We Do NOT Collect</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Calculator Data:</strong> All financial calculator inputs (income, loan amount, investment details) are processed entirely in your browser using JavaScript. This data is NEVER sent to our servers or stored anywhere.</li>
              <li><strong>Financial Account Details:</strong> We never ask for or store your bank account numbers, credit card details, PAN number, Aadhaar number, or any financial account credentials.</li>
              <li><strong>Sensitive Personal Data:</strong> We do not collect passwords, biometric data, or health information as defined under the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Newsletter Delivery:</strong> To send you weekly personal finance tips, tax saving strategies, and investment guides that you subscribed to. Every email includes an unsubscribe link.</li>
              <li><strong>Responding to Inquiries:</strong> To reply to your questions submitted through our contact form, typically within 24-48 business hours.</li>
              <li><strong>Website Improvement:</strong> Analytics data helps us understand which calculators are most popular, which articles are most helpful, and where users face difficulties — so we can improve the site.</li>
              <li><strong>Advertising:</strong> We display advertisements through Google AdSense to support our free content. Google may use cookies and web beacons to serve ads based on your prior visits to our website and other websites on the Internet.</li>
              <li><strong>Content Personalization:</strong> Quiz scores and browsing patterns may be used to recommend relevant articles and calculators.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">4. Legal Basis for Processing</h2>
            <p className="text-gray-700 leading-relaxed">We process your personal data based on:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li><strong>Consent:</strong> When you subscribe to our newsletter or submit a contact form, you explicitly consent to us processing that data for the stated purpose.</li>
              <li><strong>Legitimate Interest:</strong> We use analytics data to improve our website, which benefits all users. This is balanced against your privacy rights.</li>
              <li><strong>Compliance with Indian IT Act 2000:</strong> We comply with the Information Technology Act, 2000 and its associated rules regarding data protection and reasonable security practices.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">5. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">Our website uses the following cookies:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Cookie Type</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Purpose</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-4 py-2 text-gray-600">Essential</td><td className="px-4 py-2 text-gray-600">Site functionality, session management</td><td className="px-4 py-2 text-gray-600">Session</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Google Analytics</td><td className="px-4 py-2 text-gray-600">Anonymous traffic analysis</td><td className="px-4 py-2 text-gray-600">2 years</td></tr>
                  <tr><td className="px-4 py-2 text-gray-600">Google AdSense</td><td className="px-4 py-2 text-gray-600">Personalized advertising</td><td className="px-4 py-2 text-gray-600">Varies</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-3">
              You can control cookies through your browser settings. Disabling cookies may affect some site features. To opt out of Google&apos;s advertising cookies, visit <strong>adssettings.google.com</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p className="text-gray-700 mb-3">We use the following trusted third-party services:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Google AdSense</strong> (Google LLC, USA): Advertising platform. Privacy Policy: <em>policies.google.com/privacy</em></li>
              <li><strong>Google Analytics</strong> (Google LLC, USA): Website analytics. We have IP anonymization enabled.</li>
              <li><strong>Brevo (formerly Sendinblue)</strong> (France): Email newsletter delivery. GDPR compliant. Privacy Policy: <em>brevo.com/legal/privacypolicy</em></li>
              <li><strong>MongoDB Atlas</strong> (MongoDB Inc., USA): Cloud database with encryption at rest and in transit.</li>
              <li><strong>Vercel</strong> (Vercel Inc., USA): Website hosting with built-in DDoS protection and SSL.</li>
              <li><strong>Google Gemini AI</strong> (Google LLC, USA): Powers our AI chatbot and content assistance. Conversations are processed in real-time.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">7. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We take data security seriously and implement the following measures:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>SSL/TLS encryption (HTTPS) for all data transmission</li>
              <li>Encrypted database storage (MongoDB Atlas with AES-256 encryption at rest)</li>
              <li>Environment variables for all API keys and credentials (never hardcoded)</li>
              <li>Regular dependency updates and vulnerability scanning</li>
              <li>Server-side authentication for admin access</li>
              <li>Rate limiting on API endpoints</li>
            </ul>
            <p className="text-gray-700 mt-3">
              While we implement industry-standard security measures, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security but will notify affected users promptly in case of any data breach as required under Indian IT Act provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">8. Your Rights</h2>
            <p className="text-gray-700 mb-3">As a PaisaGuru user, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Access:</strong> Request a copy of all personal data we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate data</li>
              <li><strong>Deletion:</strong> Request deletion of your data (email us at privacy@paisaguru.com)</li>
              <li><strong>Unsubscribe:</strong> Click the unsubscribe link in any newsletter email</li>
              <li><strong>Data Portability:</strong> Request your data in a machine-readable format (JSON or CSV)</li>
              <li><strong>Opt-out of Ads:</strong> Use browser settings or Google&apos;s ad settings to manage ad personalization</li>
              <li><strong>Withdraw Consent:</strong> You can withdraw consent at any time by contacting us</li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise any of these rights, email us at <strong>privacy@paisaguru.com</strong>. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">9. Data Retention</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Newsletter subscribers:</strong> Data retained until you unsubscribe or request deletion</li>
              <li><strong>Contact form submissions:</strong> Retained for 12 months, then deleted</li>
              <li><strong>Quiz scores:</strong> Retained for 24 months of inactivity</li>
              <li><strong>Analytics data:</strong> Google Analytics retains data for 26 months (default setting)</li>
              <li><strong>Server logs:</strong> Automatically deleted after 30 days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">10. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru is designed for adults (18+ years) interested in personal finance. We do not knowingly collect personal information from children under 18. If you believe a minor has provided us with personal data, please contact us at <strong>privacy@paisaguru.com</strong> and we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">11. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed">
              Some of our third-party service providers (Google, Vercel, MongoDB) may process data outside India. These providers comply with internationally recognized data protection standards including GDPR. We ensure appropriate safeguards are in place for such transfers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this privacy policy from time to time. Significant changes will be communicated through a notice on our website and, where possible, via email to our newsletter subscribers. We encourage you to review this page periodically. The &quot;Last updated&quot; date at the top of this page indicates when the policy was last revised.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">13. Grievance Officer</h2>
            <p className="text-gray-700 leading-relaxed">
              In accordance with the Information Technology Act 2000 and rules made thereunder, the name and contact details of the Grievance Officer are provided below:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-3 text-sm text-gray-700">
              <p><strong>Grievance Officer:</strong> Neuralis IT Solutions</p>
              <p><strong>Email:</strong> privacy@paisaguru.com</p>
              <p><strong>Response Time:</strong> Within 30 days of receiving the grievance</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">14. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, your personal data, or our privacy practices, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Email: <strong>privacy@paisaguru.com</strong></li>
              <li>Contact page: <Link href="/contact" className="text-primary-600 hover:underline">paisaguru.com/contact</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
