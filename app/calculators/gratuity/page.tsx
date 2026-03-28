import type { Metadata } from 'next';
import Link from 'next/link';
import GratuityCalculator from '@/components/calculators/GratuityCalculator';

export const metadata: Metadata = {
  title: 'Gratuity Calculator 2025 - Calculate Gratuity Online | PaisaGuru',
  description: 'Calculate your gratuity amount and tax implications. Works for both private and government employees. Know your gratuity eligibility and exemptions.',
};

export default function GratuityPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">Gratuity Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">Gratuity Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Calculate your gratuity amount based on last drawn salary and years of service. Understand tax implications under current rules.</p>
      <GratuityCalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Who is eligible for gratuity?', a: 'Any employee who has completed 5 or more years of continuous service is eligible for gratuity under the Payment of Gratuity Act, 1972.' },
            { q: 'How is gratuity calculated?', a: 'For private employees: (15 × Last Salary × Years of Service) ÷ 26. For government employees: (15 × Last Salary × Years) ÷ 30.' },
            { q: 'Is gratuity taxable?', a: 'Gratuity up to ₹20 lakh is exempt from tax for private employees. For government employees, the entire gratuity is tax-exempt.' },
            { q: 'Is gratuity included in CTC?', a: 'Many companies include gratuity as part of CTC (Cost to Company). However, it is a statutory benefit payable at the time of leaving the organization after 5 years.' },
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
