import type { Metadata } from 'next';
import Link from 'next/link';
import PPFCalculator from '@/components/calculators/PPFCalculator';

export const metadata: Metadata = {
  title: 'PPF Calculator 2025 - Public Provident Fund Returns | PaisaGuru',
  description: 'Calculate PPF maturity amount with year-wise breakdown. See how your annual investment grows over 15+ years with current PPF interest rate.',
};

export default function PPFPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">PPF Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">PPF Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Project your Public Provident Fund returns over 15+ years. PPF offers tax-free returns with EEE (Exempt-Exempt-Exempt) tax benefit.</p>
      <PPFCalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the current PPF interest rate?', a: 'The current PPF interest rate is 7.1% per annum (Q1 FY 2025-26), compounded annually. The rate is revised quarterly by the government.' },
            { q: 'What is the maximum PPF investment limit?', a: 'The maximum annual investment in PPF is ₹1,50,000 and minimum is ₹500. Deposits can be made in lump sum or up to 12 installments per year.' },
            { q: 'Is PPF tax-free?', a: 'Yes, PPF enjoys EEE tax status - the investment qualifies for Section 80C deduction, the interest earned is tax-free, and the maturity amount is also tax-free.' },
            { q: 'Can I extend PPF after 15 years?', a: 'Yes, PPF can be extended in blocks of 5 years indefinitely. You can extend with or without fresh contributions.' },
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
