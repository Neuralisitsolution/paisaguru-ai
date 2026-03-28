import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | PaisaGuru - Usage Terms & Conditions',
  description: 'Terms of Service for PaisaGuru personal finance website. Read our terms covering website usage, content licensing, calculators, and financial disclaimers.',
};

export default function TermsPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Terms of Service</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 15, 2026</p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
          <p className="text-sm text-yellow-800">
            <strong>Please read carefully:</strong> By accessing PaisaGuru, you agree to these Terms of Service. If you disagree with any part, please stop using our website. These terms are governed by the laws of India.
          </p>
        </div>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing, browsing, or using PaisaGuru (the &quot;Website&quot;), operated by Neuralis IT Solutions (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service (&quot;Terms&quot;) and our <Link href="/privacy-policy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              We reserve the right to modify these Terms at any time. Changes become effective immediately upon posting on this page. Your continued use of the Website after any modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">2. Description of Services</h2>
            <p className="text-gray-700 leading-relaxed mb-3">PaisaGuru provides the following free services to Indian consumers:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Financial Calculators:</strong> Income tax calculator, SIP calculator, EMI calculator, FD calculator, PPF calculator, gratuity calculator, HRA calculator, and NPS calculator. All calculations are performed in your browser.</li>
              <li><strong>Educational Articles:</strong> Expert-written and AI-assisted articles about personal finance topics including tax planning, investments, insurance, stock market, banking, and mutual funds.</li>
              <li><strong>Finance Quizzes:</strong> Interactive quizzes to test and improve your financial literacy.</li>
              <li><strong>AI Chatbot:</strong> PaisaGuru AI provides general financial information through a conversational interface (limited to 5 queries per day for free users).</li>
              <li><strong>Newsletter:</strong> Weekly email newsletter with finance tips, tax strategies, and market updates.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">3. Important Financial Disclaimer</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold text-sm leading-relaxed">
                THE CONTENT ON PAISAGURU IS FOR EDUCATIONAL AND INFORMATIONAL PURPOSES ONLY. IT DOES NOT CONSTITUTE FINANCIAL ADVICE, INVESTMENT ADVICE, TAX ADVICE, OR LEGAL ADVICE. We are NOT registered with SEBI, RBI, IRDAI, or AMFI as financial advisors. You must consult a qualified professional (SEBI-registered Investment Advisor, Chartered Accountant, or Certified Financial Planner) before making any financial decisions. Past performance data mentioned in articles does not guarantee future returns. All investments carry risk, including the potential loss of principal.
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed mt-3">
              For a detailed financial disclaimer, please visit our <Link href="/disclaimer" className="text-primary-600 hover:underline">Disclaimer page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">4. Calculator Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              Our financial calculators provide <strong>approximate estimates</strong> based on standard mathematical formulas and the inputs you provide. Important limitations:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Tax calculations are based on publicly available tax slabs for the relevant financial year. Actual tax liability may differ based on individual circumstances, exemptions, and amendments.</li>
              <li>Investment return projections assume constant rates and do not account for market volatility, fund management fees, exit loads, or STCG/LTCG taxes unless explicitly stated.</li>
              <li>EMI calculations use standard reducing balance formulas. Your bank may use different methods or charge additional processing fees.</li>
              <li>Calculator results should NOT be used as the sole basis for financial decisions. Always verify with a qualified professional.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">5. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-3">When using PaisaGuru, you agree NOT to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Attempt to gain unauthorized access to our servers, databases, or admin panels</li>
              <li>Use automated bots, scrapers, or crawlers to extract content without permission</li>
              <li>Submit false, misleading, or spam content through our contact forms or newsletter signups</li>
              <li>Reproduce, distribute, or sell our content for commercial purposes without written permission</li>
              <li>Use our AI chatbot for purposes other than personal financial education</li>
              <li>Attempt to reverse-engineer our calculators or AI systems</li>
              <li>Interfere with the Website&apos;s functionality or other users&apos; experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on PaisaGuru — including but not limited to articles, calculator designs, code, graphics, logos, icons, page layouts, and the PaisaGuru brand name — is the intellectual property of Neuralis IT Solutions and is protected under the Indian Copyright Act, 1957, and the Trade Marks Act, 1999.
            </p>
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">What you CAN do:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Share our articles on social media with proper attribution</li>
              <li>Quote short excerpts (up to 200 words) with a link back to the original article</li>
              <li>Use our calculators for personal financial planning</li>
              <li>Print articles for personal, non-commercial use</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">What you CANNOT do:</h3>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Republish full articles on other websites without written permission</li>
              <li>Use our content in paid courses, ebooks, or commercial products</li>
              <li>Remove author attribution or PaisaGuru branding from shared content</li>
              <li>Create derivative works based on our proprietary calculator designs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">7. AI-Generated Content</h2>
            <p className="text-gray-700 leading-relaxed">
              Some content on PaisaGuru is generated or assisted by artificial intelligence (Google Gemini) and subsequently reviewed by our editorial team. While we strive for accuracy and quality:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>AI-generated content may occasionally contain errors or outdated information</li>
              <li>Articles marked &quot;Expert Reviewed&quot; have been verified by qualified professionals</li>
              <li>The PaisaGuru AI chatbot provides general guidance, not personalized advice</li>
              <li>We continuously improve our AI quality checks to ensure accuracy</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">8. Third-Party Links and Affiliate Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website may contain links to third-party websites, financial products, and services. Some of these may be affiliate links, meaning we may earn a small commission if you sign up or make a purchase through them. This does not increase the cost to you.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              We only recommend products and services that we believe offer genuine value to our readers. However, we are not responsible for the content, privacy practices, or terms of any third-party websites. Always read the terms and conditions of any financial product before investing or purchasing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">9. Advertising</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru displays advertisements through Google AdSense and potentially other advertising networks. These ads help us provide free content and tools. Advertisements are clearly marked and do not constitute endorsement by PaisaGuru. Our editorial content is independent of our advertising relationships.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">10. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY INDIAN LAW: PaisaGuru, Neuralis IT Solutions, its directors, employees, authors, and contributors shall not be held liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
              <li>Your use of or reliance on information published on this website</li>
              <li>Investment losses resulting from decisions influenced by our content</li>
              <li>Errors or omissions in calculator results</li>
              <li>Temporary unavailability of the website or any of its features</li>
              <li>Actions of third-party services linked from our website</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Our maximum aggregate liability for any claims shall not exceed ₹1,000 (Indian Rupees One Thousand Only), being a free service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">11. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless PaisaGuru and Neuralis IT Solutions from any claims, damages, losses, or expenses (including legal fees) arising from your violation of these Terms or misuse of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">12. Governing Law and Jurisdiction</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of PaisaGuru shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">13. Severability</h2>
            <p className="text-gray-700 leading-relaxed">
              If any provision of these Terms is found to be unenforceable or invalid by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">14. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, please contact us:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Email: <strong>legal@paisaguru.com</strong></li>
              <li>Contact page: <Link href="/contact" className="text-primary-600 hover:underline">paisaguru.com/contact</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
