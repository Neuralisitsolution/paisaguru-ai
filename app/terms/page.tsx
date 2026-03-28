import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | PaisaGuru',
  description: 'Terms of Service for PaisaGuru - India\'s trusted personal finance website.',
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
        <h1 className="section-title">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2025</p>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-700">By accessing and using PaisaGuru (paisaguru.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">2. Services Provided</h2>
            <p className="text-gray-700">PaisaGuru provides free financial calculators, educational articles, quizzes, and AI-powered financial information tools. Our services are for informational and educational purposes only.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">3. Financial Disclaimer</h2>
            <p className="text-gray-700 font-semibold">IMPORTANT: The content on PaisaGuru does NOT constitute financial advice, investment recommendation, or tax consultation. We are not SEBI-registered investment advisors. All information is for educational purposes only. Always consult qualified professionals before making financial decisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">4. User Conduct</h2>
            <p className="text-gray-700">You agree not to: misuse our services, attempt unauthorized access to our systems, use our content for commercial purposes without permission, or submit false information.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p className="text-gray-700">All content on PaisaGuru, including articles, calculator designs, graphics, and logos, is owned by PaisaGuru Media Pvt. Ltd. and protected by Indian copyright laws. You may share our content with proper attribution and a link back to the original page.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">6. Calculator Accuracy</h2>
            <p className="text-gray-700">Our financial calculators provide approximate results based on the inputs provided. Actual amounts may vary based on individual circumstances, bank policies, and regulatory changes. We are not responsible for decisions made based on calculator results.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p className="text-gray-700">PaisaGuru shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our website or reliance on our content. Maximum liability is limited to the amount you have paid us (which is zero for free services).</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">8. Third-Party Links</h2>
            <p className="text-gray-700">Our website may contain links to third-party websites. We are not responsible for the content or practices of these external sites.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">9. Governing Law</h2>
            <p className="text-gray-700">These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">10. Contact</h2>
            <p className="text-gray-700">For questions about these terms, contact us at <strong>legal@paisaguru.com</strong> or through our <Link href="/contact" className="text-primary-600 hover:underline">contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
