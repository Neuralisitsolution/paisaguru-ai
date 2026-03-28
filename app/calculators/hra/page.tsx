import type { Metadata } from 'next';
import Link from 'next/link';
import HRACalculator from '@/components/calculators/HRACalculator';

export const metadata: Metadata = {
  title: 'HRA Calculator 2025 - House Rent Allowance Exemption | PaisaGuru',
  description: 'Calculate your HRA tax exemption for metro and non-metro cities. Find out how much of your HRA is exempt and taxable under the old tax regime.',
};

export default function HRAPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">HRA Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">HRA Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Calculate your House Rent Allowance exemption under Section 10(13A). Works for both metro and non-metro city employees.</p>
      <HRACalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How is HRA exemption calculated?', a: 'HRA exemption is the minimum of: (1) Actual HRA received, (2) 50% of salary for metro / 40% for non-metro, (3) Rent paid minus 10% of salary.' },
            { q: 'Which cities are considered metro for HRA?', a: 'Delhi, Mumbai, Kolkata, and Chennai are classified as metro cities for HRA calculation. All other cities are considered non-metro.' },
            { q: 'Can I claim HRA if I have a home loan?', a: 'Yes, you can claim both HRA exemption and home loan tax benefits if you are paying rent in one city and have a home loan for a property in another city.' },
            { q: 'Is HRA available in the new tax regime?', a: 'No, HRA exemption under Section 10(13A) is not available if you opt for the new tax regime. It is only available under the old regime.' },
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
