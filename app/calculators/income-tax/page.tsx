import type { Metadata } from 'next';
import Link from 'next/link';
import TaxCalculator from '@/components/calculators/TaxCalculator';

export const metadata: Metadata = {
  title: 'Income Tax Calculator FY 2025-26 | Old vs New Regime | PaisaGuru',
  description: 'Free income tax calculator for FY 2025-26. Compare old vs new tax regime, see slab-wise breakdown, and get tax saving tips for salaried individuals in India.',
  keywords: ['income tax calculator', 'income tax calculator 2025', 'old vs new regime', 'tax calculator India'],
};

export default function IncomeTaxPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Income Tax Calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
        Income Tax Calculator FY 2025-26
      </h1>
      <p className="text-gray-600 mb-8 max-w-3xl">
        Calculate your income tax under both old and new tax regime. Get a detailed slab-wise breakdown and find which regime saves you more tax.
      </p>

      <TaxCalculator />

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What are the new tax slabs for FY 2025-26?', a: 'Under the new regime for FY 2025-26: Up to ₹4 lakh - Nil, ₹4-8 lakh - 5%, ₹8-12 lakh - 10%, ₹12-16 lakh - 15%, ₹16-20 lakh - 20%, ₹20-24 lakh - 25%, Above ₹24 lakh - 30%. Standard deduction of ₹75,000 is available.' },
            { q: 'Which is better - old or new tax regime?', a: 'If your total deductions (80C, 80D, HRA, etc.) exceed ₹3-4 lakh, the old regime may be better. For those with fewer deductions, the new regime with lower rates is usually beneficial. Use our calculator to compare both.' },
            { q: 'Is the standard deduction available in both regimes?', a: 'Yes. In the old regime, standard deduction is ₹50,000. In the new regime (FY 2025-26), it has been increased to ₹75,000.' },
            { q: 'How is health and education cess calculated?', a: 'A 4% Health and Education Cess is levied on the total tax amount (including surcharge if applicable). This applies to both old and new regime.' },
            { q: 'Can I switch between old and new regime every year?', a: 'Salaried individuals can choose between old and new regime every financial year. Business owners who opt for new regime cannot switch back (with some exceptions).' },
          ].map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.q}</summary>
              <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <strong>Disclaimer:</strong> This calculator provides approximate tax calculations based on the inputs provided. Actual tax liability may vary. Please consult a qualified Chartered Accountant or tax advisor for accurate tax planning.
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Income Tax Calculator India 2025-26',
        description: 'Free income tax calculator comparing old and new regime for Indian taxpayers.',
        url: 'https://paisaguru.com/calculators/income-tax',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are the new tax slabs for FY 2025-26?', acceptedAnswer: { '@type': 'Answer', text: 'Under the new regime: Up to ₹4L - Nil, ₹4-8L - 5%, ₹8-12L - 10%, ₹12-16L - 15%, ₹16-20L - 20%, ₹20-24L - 25%, Above ₹24L - 30%.' }},
          { '@type': 'Question', name: 'Which is better - old or new tax regime?', acceptedAnswer: { '@type': 'Answer', text: 'If deductions exceed ₹3-4 lakh, old regime may be better. Otherwise new regime with lower rates is usually beneficial.' }},
        ],
      })}} />
    </div>
  );
}
