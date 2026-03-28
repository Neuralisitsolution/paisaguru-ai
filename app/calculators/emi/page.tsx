import type { Metadata } from 'next';
import Link from 'next/link';
import EMICalculator from '@/components/calculators/EMICalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator 2025 - Home Loan, Car Loan, Personal Loan | PaisaGuru',
  description: 'Free EMI calculator for home loan, car loan, personal loan. See monthly EMI, total interest, and year-wise amortization schedule.',
};

export default function EMIPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">EMI Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">EMI Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Calculate your loan EMI for home loan, car loan, or personal loan. View the complete amortization schedule and total interest payable.</p>
      <EMICalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'How is EMI calculated?', a: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is total number of monthly installments.' },
            { q: 'What is the current home loan interest rate in India?', a: 'As of 2025, home loan interest rates in India range from 8.25% to 9.5% per annum, depending on the bank and your credit score.' },
            { q: 'Can I prepay my loan to reduce EMI?', a: 'Yes, most banks allow prepayment of loans. For floating rate loans, there is no prepayment penalty as per RBI guidelines. Prepayment can reduce your tenure or EMI.' },
            { q: 'What is an amortization schedule?', a: 'An amortization schedule shows the breakup of each EMI payment into principal and interest components, along with the remaining balance after each payment.' },
          ].map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.q}</summary>
              <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <strong>Disclaimer:</strong> EMI calculations are approximate and for illustrative purposes only. Actual EMI may vary based on bank processing fees, insurance, and other charges.
      </div>
    </div>
  );
}
