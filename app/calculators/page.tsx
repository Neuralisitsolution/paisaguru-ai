import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free Financial Calculators India 2025 | PaisaGuru',
  description: 'Use free financial calculators - Income Tax, SIP, EMI, FD, PPF, HRA, Gratuity, NPS. Accurate calculations for Indian investors and taxpayers.',
};

const calculators = [
  { name: 'Income Tax Calculator', href: '/calculators/income-tax', description: 'Calculate income tax under old and new regime for FY 2025-26. Compare and save.', icon: '🧾' },
  { name: 'SIP Calculator', href: '/calculators/sip', description: 'Plan your mutual fund SIP investments. See projected returns with inflation adjustment.', icon: '📈' },
  { name: 'EMI Calculator', href: '/calculators/emi', description: 'Calculate home loan, car loan, or personal loan EMI with amortization schedule.', icon: '🏠' },
  { name: 'FD Calculator', href: '/calculators/fd', description: 'Calculate fixed deposit maturity amount with different compounding frequencies.', icon: '🏦' },
  { name: 'PPF Calculator', href: '/calculators/ppf', description: 'Project your PPF returns over 15+ years with year-wise breakdown.', icon: '💰' },
  { name: 'Gratuity Calculator', href: '/calculators/gratuity', description: 'Calculate gratuity amount and tax implications for private and government employees.', icon: '🎖️' },
  { name: 'HRA Calculator', href: '/calculators/hra', description: 'Find your HRA exemption amount for metro and non-metro cities.', icon: '🏘️' },
  { name: 'NPS Calculator', href: '/calculators/nps', description: 'Plan your NPS retirement corpus and estimate monthly pension.', icon: '👴' },
];

export default function CalculatorsPage() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Calculators</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="section-title">Free Financial Calculators</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Accurate, easy-to-use calculators for Indian taxpayers and investors. All tools are free and updated for FY 2025-26.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {calculators.map(calc => (
          <Link key={calc.href} href={calc.href} className="card p-6 group hover:border-primary-200">
            <span className="text-4xl mb-4 block">{calc.icon}</span>
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {calc.name}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{calc.description}</p>
            <span className="text-sm font-semibold text-primary-600">Use Calculator &rarr;</span>
          </Link>
        ))}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Financial Calculators',
        description: 'Free financial calculators for Indian taxpayers and investors.',
        url: 'https://paisaguru.com/calculators',
      })}} />
    </div>
  );
}
