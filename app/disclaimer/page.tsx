import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Disclaimer | PaisaGuru',
  description: 'Important financial disclaimer for PaisaGuru website. Read before using our calculators, articles, and financial tools.',
};

export default function DisclaimerPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Disclaimer</span>
      </nav>

      <div className="max-w-3xl mx-auto">
        <h1 className="section-title">Financial Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 1, 2025</p>

        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-heading font-bold text-red-800 mb-3">Important Notice</h2>
          <p className="text-red-700 font-medium">
            The information provided on PaisaGuru (paisaguru.com) is for general informational and educational purposes ONLY. It does NOT constitute financial advice, investment advice, tax advice, legal advice, or any other form of professional advice.
          </p>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Not Financial Advice</h2>
            <p className="text-gray-700">PaisaGuru and its team members are NOT registered financial advisors, investment advisors, tax consultants, or legal professionals. We do not hold any SEBI, RBI, IRDAI, or AMFI registration for providing financial advisory services. All content is created for educational purposes to help readers understand personal finance concepts.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Investment Risks</h2>
            <p className="text-gray-700">All investments carry risks including potential loss of principal. Mutual fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. The value of investments can go down as well as up.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Calculator Disclaimer</h2>
            <p className="text-gray-700">All calculators on PaisaGuru provide approximate results based on the inputs provided and standard mathematical formulas. Actual results may vary based on individual circumstances, bank-specific terms, regulatory changes, and other factors. Do not make financial decisions solely based on calculator outputs.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Tax Information</h2>
            <p className="text-gray-700">Tax laws in India are complex and subject to frequent changes. The tax information on this website may not reflect the latest amendments. Always verify tax calculations with a qualified Chartered Accountant (CA) or tax professional. Income tax slabs, rates, and rules referenced are based on publicly available information and may change.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Regulatory References</h2>
            <p className="text-gray-700">References to SEBI (Securities and Exchange Board of India), RBI (Reserve Bank of India), IRDAI (Insurance Regulatory and Development Authority of India), and other regulatory bodies are for informational purposes. For official regulations and guidelines, visit:</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>SEBI: sebi.gov.in</li>
              <li>RBI: rbi.org.in</li>
              <li>IRDAI: irdai.gov.in</li>
              <li>Income Tax Department: incometax.gov.in</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">Professional Consultation</h2>
            <p className="text-gray-700 font-medium">We strongly recommend consulting the following professionals before making financial decisions:</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>A SEBI-registered Investment Advisor for investment decisions</li>
              <li>A Chartered Accountant for tax planning and filing</li>
              <li>A Certified Financial Planner (CFP) for comprehensive financial planning</li>
              <li>An IRDAI-licensed insurance advisor for insurance needs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">AI-Generated Content</h2>
            <p className="text-gray-700">Some content on PaisaGuru is generated or assisted by artificial intelligence technology and subsequently reviewed by our editorial team. While we strive for accuracy, AI-generated content may contain errors. All articles marked as &ldquo;Expert Reviewed&rdquo; have been verified by qualified professionals.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">No Liability</h2>
            <p className="text-gray-700">PaisaGuru, its owners, employees, and contributors shall not be held liable for any losses, damages, or adverse consequences resulting from the use of information on this website. Users assume full responsibility for their financial decisions.</p>
          </section>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Questions about this disclaimer? <Link href="/contact" className="text-primary-600 hover:underline">Contact us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
