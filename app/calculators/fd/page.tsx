import type { Metadata } from 'next';
import Link from 'next/link';
import FDCalculator from '@/components/calculators/FDCalculator';

export const metadata: Metadata = {
  title: 'FD Calculator 2025 - Fixed Deposit Interest Calculator | PaisaGuru',
  description: 'Calculate fixed deposit maturity amount and interest earned. Compare quarterly, monthly, half-yearly, and yearly compounding options.',
};

export default function FDPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">FD Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">FD Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Calculate your fixed deposit maturity amount with different compounding options. Compare returns across compounding frequencies.</p>
      <FDCalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is the best FD rate in India 2025?', a: 'Top FD rates in 2025 range from 7% to 8.5% for regular depositors and up to 8.5% to 9% for senior citizens, offered by select small finance banks and NBFCs.' },
            { q: 'Is FD interest taxable?', a: 'Yes, FD interest is taxable as per your income tax slab. TDS of 10% is deducted if interest exceeds ₹40,000 (₹50,000 for senior citizens) in a financial year.' },
            { q: 'Which compounding is better for FD?', a: 'More frequent compounding gives slightly higher returns. Quarterly compounding is the most common in India and gives better returns than yearly compounding.' },
            { q: 'Can I break my FD before maturity?', a: 'Yes, premature withdrawal is allowed but usually attracts a penalty of 0.5% to 1% reduction in interest rate. Some banks offer no-penalty premature withdrawal on specific FD products.' },
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
