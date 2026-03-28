import type { Metadata } from 'next';
import Link from 'next/link';
import SIPCalculator from '@/components/calculators/SIPCalculator';

export const metadata: Metadata = {
  title: 'SIP Calculator 2025 - Mutual Fund Returns Calculator | PaisaGuru',
  description: 'Free SIP calculator with inflation adjustment. Plan your mutual fund SIP investments and see projected returns with detailed year-wise breakdown.',
};

export default function SIPPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link><span className="mx-2">/</span>
        <Link href="/calculators" className="hover:text-primary-600">Calculators</Link><span className="mx-2">/</span>
        <span className="text-gray-900">SIP Calculator</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">SIP Calculator 2025</h1>
      <p className="text-gray-600 mb-8 max-w-3xl">Calculate your mutual fund SIP returns with inflation adjustment. See how your monthly investment can grow over time.</p>
      <SIPCalculator />
      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'What is SIP?', a: 'SIP (Systematic Investment Plan) allows you to invest a fixed amount regularly in mutual funds. It helps in rupee cost averaging and builds discipline in investing.' },
            { q: 'What is a good SIP amount to start with?', a: 'You can start a SIP with as little as ₹500 per month. For meaningful wealth creation, financial experts recommend investing at least 20% of your monthly income.' },
            { q: 'What returns can I expect from SIP?', a: 'Historical data shows equity mutual funds have delivered 12-15% CAGR over 10+ year periods. However, past performance does not guarantee future returns. Markets are subject to risks.' },
            { q: 'Is SIP better than lump sum investment?', a: 'SIP is generally better for most investors as it averages out market volatility through rupee cost averaging. Lump sum can be better if invested at market lows.' },
            { q: 'Can I stop SIP anytime?', a: 'Yes, SIP can be stopped anytime without any penalty. You can also pause or modify the SIP amount as per your convenience.' },
          ].map((faq, i) => (
            <details key={i} className="bg-white border border-gray-200 rounded-lg">
              <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.q}</summary>
              <p className="px-5 pb-4 text-sm text-gray-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
        <strong>Disclaimer:</strong> Mutual fund investments are subject to market risks. The calculator shows projected returns based on assumed rate of return. Actual returns may vary. Please read all scheme related documents carefully before investing.
      </div>
    </div>
  );
}
