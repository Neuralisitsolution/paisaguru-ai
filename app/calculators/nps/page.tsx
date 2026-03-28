import type { Metadata } from 'next';
import Link from 'next/link';
import NPSCalculator from '@/components/calculators/NPSCalculator';

export const metadata: Metadata = {
  title: 'NPS Calculator 2025 - National Pension Scheme Returns | PaisaGuru',
  description: 'Calculate your NPS retirement corpus and estimated monthly pension. Plan your National Pension System contributions for a secure retirement.',
};

export default function NPSPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">NPS Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">NPS Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Plan your retirement with National Pension System. Calculate your retirement corpus and estimated monthly pension based on your contributions.</p>
      <NPSCalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is NPS?', a: 'NPS (National Pension System) is a government-backed retirement savings scheme. It invests in equity, corporate bonds, and government securities based on your chosen allocation.' },
            { q: 'What are the tax benefits of NPS?', a: 'NPS offers additional ₹50,000 deduction under Section 80CCD(1B) over and above Section 80C limit. Total deduction up to ₹2 lakh is possible.' },
            { q: 'Can I withdraw from NPS before retirement?', a: 'Partial withdrawal (up to 25% of own contributions) is allowed after 3 years for specific purposes like education, medical treatment, or buying a house.' },
            { q: 'What happens at NPS maturity?', a: 'At age 60, you can withdraw 60% as tax-free lump sum and must use 40% to buy an annuity plan that provides monthly pension.' },
          ].map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.q}</summary>
              <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
