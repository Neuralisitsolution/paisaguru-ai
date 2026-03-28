import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Financial Disclaimer | PaisaGuru - Important Legal Notice',
  description: 'Important financial disclaimer for PaisaGuru. We are not SEBI-registered advisors. Content is for educational purposes only. Read before using our tools and articles.',
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
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2">Financial Disclaimer</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: March 15, 2026</p>

        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-heading font-bold text-red-800 mb-3">IMPORTANT — Please Read Before Using This Website</h2>
          <p className="text-red-700 font-medium leading-relaxed">
            All information provided on PaisaGuru (paisaguru.com) is published in good faith and for general informational and educational purposes ONLY. PaisaGuru does NOT provide financial advice, investment advice, tax advice, legal advice, or any form of professional advisory service. You should NOT act or refrain from acting based on any content on this website without seeking professional counsel.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">1. Not a Registered Financial Advisor</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru and its parent company, Neuralis IT Solutions, are NOT registered as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>SEBI-Registered Investment Advisor (RIA)</strong> under the SEBI (Investment Advisers) Regulations, 2013</li>
              <li><strong>SEBI-Registered Research Analyst</strong> under the SEBI (Research Analysts) Regulations, 2014</li>
              <li><strong>AMFI-Registered Mutual Fund Distributor</strong></li>
              <li><strong>IRDAI-Licensed Insurance Advisor or Broker</strong></li>
              <li><strong>RBI-Registered NBFC or Financial Institution</strong></li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Our team includes individuals with financial qualifications (CA, CFP, MBA Finance) who share educational content, but this does NOT constitute a professional advisory relationship. The content creators are sharing general knowledge, not providing personalized recommendations for your specific financial situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">2. Investment Risk Disclosure</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-3">
              <p className="text-yellow-800 font-semibold text-sm">
                &quot;Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing.&quot; — SEBI/AMFI mandatory disclosure
              </p>
            </div>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All investments — including mutual funds, stocks, bonds, PPF, NPS, and real estate — carry inherent risks, including the <strong>potential loss of your entire invested capital</strong>.</li>
              <li>Past performance of any investment product mentioned on this website is <strong>NOT indicative of future returns</strong>. Historical returns are provided for educational illustration only.</li>
              <li>Returns mentioned in our articles and calculators are hypothetical projections based on assumed rates. Actual returns will vary based on market conditions, fund performance, and economic factors.</li>
              <li>We do NOT guarantee any specific returns or outcomes from following strategies discussed on this website.</li>
              <li>The value of investments can go <strong>DOWN</strong> as well as up. You may get back less than you invested.</li>
              <li>Equity market investments (stocks, equity mutual funds, ELSS) are particularly volatile and can experience significant short-term losses.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">3. Calculator Accuracy Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              The eight financial calculators on PaisaGuru (Income Tax, SIP, EMI, FD, PPF, Gratuity, HRA, and NPS) are built for educational purposes and provide <strong>approximate estimates only</strong>.
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>Income Tax Calculator:</strong> Based on publicly available tax slabs for the stated financial year. Does not account for surcharges beyond basic calculations, agricultural income, capital gains from specific sources, or individual-specific exemptions. Always file your ITR with help from a qualified CA.</li>
              <li><strong>SIP Calculator:</strong> Assumes a constant annual return rate and monthly compounding. Real mutual fund returns fluctuate significantly year to year. Actual wealth accumulation will differ.</li>
              <li><strong>EMI Calculator:</strong> Uses the standard reducing balance method. Your bank may use different calculation methods. Does not include processing fees, prepayment penalties, or floating rate changes.</li>
              <li><strong>HRA Calculator:</strong> Calculates the minimum of the three prescribed methods. Actual HRA exemption depends on your employer&apos;s salary structure, actual rent receipts, and city classification by your employer.</li>
              <li><strong>Other Calculators:</strong> PPF, FD, Gratuity, and NPS calculators use standard government-published formulas. Interest rates are subject to quarterly revisions by the government.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3 font-medium">
              DO NOT make financial decisions solely based on calculator outputs. Always verify calculations with a professional.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">4. Tax Information Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              Tax laws in India are complex, frequently amended, and subject to interpretation. The tax information published on PaisaGuru:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li>Is based on our understanding of the Income Tax Act, 1961, Finance Act amendments, and CBDT circulars as of the article&apos;s publication date</li>
              <li>May not reflect the very latest amendments, court rulings, or CBDT clarifications</li>
              <li>Provides general guidance and may not apply to your specific tax situation</li>
              <li>Does NOT replace the advice of a qualified Chartered Accountant (CA) or Tax Consultant</li>
              <li>References to tax sections (80C, 80D, 80CCD, 24, etc.) are for educational context and may have conditions or limits not fully detailed in our articles</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              For tax filing, tax planning, or any tax-related decisions, always consult a practicing Chartered Accountant who understands your complete financial picture.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">5. AI-Generated Content Disclosure</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru uses Google Gemini AI technology to assist in content creation. Our content pipeline works as follows:
            </p>
            <ol className="list-decimal pl-6 text-gray-700 space-y-2 mt-3">
              <li>Articles are generated by AI based on carefully crafted prompts with Indian financial context</li>
              <li>Each article passes through an automated quality checking system that verifies word count, Indian context, heading structure, and formatting</li>
              <li>Articles scoring above our quality threshold are published with plans for periodic manual review</li>
              <li>Our AI chatbot (PaisaGuru AI) provides general financial information in real-time</li>
            </ol>
            <p className="text-gray-700 leading-relaxed mt-3">
              While we strive for accuracy, AI-generated content may occasionally contain:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Factual errors or outdated statistics</li>
              <li>Oversimplifications of complex financial regulations</li>
              <li>Generic advice that may not suit your specific situation</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              Articles marked <strong>&quot;Expert Reviewed&quot;</strong> have been additionally verified by qualified professionals on our team.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">6. Affiliate Links and Product Mentions</h2>
            <p className="text-gray-700 leading-relaxed">
              Some articles on PaisaGuru contain affiliate links to financial products and platforms (such as investment apps, insurance comparison websites, and banking products). When you click on these links and sign up or make a purchase, we may earn a referral commission at no additional cost to you.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              These affiliate relationships do NOT influence our editorial content or recommendations. We recommend products based on our independent assessment of their features, fees, user experience, and value to Indian consumers. We clearly disclose affiliate relationships where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">7. Regulatory References</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru articles reference Indian financial regulators and their guidelines for educational context. For official, authoritative information, always refer to the regulators&apos; official websites:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {[
                { name: 'SEBI', desc: 'Securities and Exchange Board of India', site: 'sebi.gov.in' },
                { name: 'RBI', desc: 'Reserve Bank of India', site: 'rbi.org.in' },
                { name: 'IRDAI', desc: 'Insurance Regulatory and Development Authority', site: 'irdai.gov.in' },
                { name: 'AMFI', desc: 'Association of Mutual Funds in India', site: 'amfiindia.com' },
                { name: 'CBDT', desc: 'Central Board of Direct Taxes', site: 'incometaxindia.gov.in' },
                { name: 'PFRDA', desc: 'Pension Fund Regulatory Authority', site: 'pfrda.org.in' },
              ].map(reg => (
                <div key={reg.name} className="bg-gray-50 rounded-lg p-3">
                  <p className="font-bold text-sm text-gray-900">{reg.name}</p>
                  <p className="text-xs text-gray-600">{reg.desc}</p>
                  <p className="text-xs text-primary-600 mt-1">{reg.site}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">8. Professional Consultation Recommended</h2>
            <p className="text-gray-700 leading-relaxed font-medium">
              Before making any financial decision, we strongly recommend consulting:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-3">
              <li><strong>SEBI-Registered Investment Advisor (RIA)</strong> for investment decisions — verify at sebi.gov.in</li>
              <li><strong>Chartered Accountant (CA)</strong> for tax planning, ITR filing, and compliance</li>
              <li><strong>Certified Financial Planner (CFP)</strong> for comprehensive financial planning including retirement, insurance, and estate planning</li>
              <li><strong>IRDAI-Licensed Insurance Advisor</strong> for insurance needs assessment and policy selection</li>
              <li><strong>Company Secretary (CS)</strong> for corporate finance and compliance matters</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">9. No Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              PaisaGuru, Neuralis IT Solutions, its directors, employees, authors, and contributors shall NOT be held liable for any financial losses, investment losses, tax penalties, insurance claim rejections, or any other adverse consequences that may result directly or indirectly from the use of information, tools, calculators, or AI-generated content on this website.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              By using PaisaGuru, you accept full responsibility for your financial decisions. You acknowledge that you are using our educational content at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-gray-900 mb-3">10. Changes to This Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this disclaimer from time to time to reflect changes in regulations, our services, or legal requirements. The &quot;Last updated&quot; date at the top indicates the most recent revision. We encourage you to review this page periodically.
            </p>
          </section>
        </div>

        <div className="mt-10 p-5 bg-gray-50 rounded-xl text-center">
          <p className="text-sm text-gray-600">
            Questions about this disclaimer?{' '}
            <Link href="/contact" className="text-primary-600 hover:underline font-medium">Contact us</Link>
            {' '}or email <strong>legal@paisaguru.com</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
