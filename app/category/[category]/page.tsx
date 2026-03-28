import type { Metadata } from 'next';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';

const categoryInfo: Record<string, { title: string; description: string }> = {
  'income-tax': { title: 'Income Tax', description: 'Latest income tax guides, tax saving tips, ITR filing help, and tax planning strategies for Indian taxpayers.' },
  'investments': { title: 'Investments', description: 'Investment guides for stocks, mutual funds, bonds, gold, and other investment options in India.' },
  'insurance': { title: 'Insurance', description: 'Compare term insurance, health insurance, life insurance plans. Expert reviews and buying guides.' },
  'loans': { title: 'Loans', description: 'Home loan, personal loan, car loan guides. EMI calculation, eligibility, and comparison articles.' },
  'banking': { title: 'Banking', description: 'Banking guides covering savings accounts, FDs, current accounts, digital banking, and UPI.' },
  'mutual-funds': { title: 'Mutual Funds', description: 'Mutual fund investment guides, SIP planning, best fund picks, and NAV analysis for Indian investors.' },
  'budget': { title: 'Budget & Policy', description: 'Union Budget analysis, government policy updates, and their impact on your personal finances.' },
  'real-estate': { title: 'Real Estate', description: 'Property buying guides, home loan tips, RERA updates, and real estate investment advice for India.' },
  'cryptocurrency': { title: 'Cryptocurrency', description: 'Crypto investing guides, Bitcoin and Ethereum analysis, crypto tax rules in India, and exchange reviews.' },
  'retirement': { title: 'Retirement Planning', description: 'Retirement planning guides including NPS, EPF, pension plans, and strategies for a secure retirement in India.' },
};

const mockArticles = [
  { title: 'How to Save Income Tax for Salaried Employees in India 2025', slug: 'how-to-save-income-tax-2025', excerpt: 'Complete guide to saving income tax with all available deductions under old and new regime.', category: 'income-tax', author: { name: 'Priya Sharma' }, publishedAt: '2025-03-15', readingTime: 8, viewCount: 15420, isExpertReviewed: true },
  { title: 'ELSS vs PPF vs Tax Saving FD: Best Tax Saving Investment 2025', slug: 'elss-vs-ppf-vs-fd-2025', excerpt: 'Detailed comparison of ELSS, PPF, and tax saving FD with returns, lock-in period, and risk analysis.', category: 'income-tax', author: { name: 'Rajesh Kumar' }, publishedAt: '2025-03-10', readingTime: 6, viewCount: 8930, isExpertReviewed: true },
  { title: 'Section 80C Complete Guide: All Investment Options Explained', slug: 'section-80c-guide-all-options', excerpt: 'Everything you need to know about Section 80C deductions including ELSS, PPF, EPF, LIC, and more.', category: 'income-tax', author: { name: 'Priya Sharma' }, publishedAt: '2025-03-05', readingTime: 10, viewCount: 12340, isExpertReviewed: true },
  { title: 'New Tax Regime vs Old Tax Regime: Which Should You Choose in 2025?', slug: 'new-vs-old-tax-regime-2025', excerpt: 'Detailed comparison with break-even analysis to help you choose the best tax regime for your salary.', category: 'income-tax', author: { name: 'Amit Verma' }, publishedAt: '2025-02-28', readingTime: 7, viewCount: 20150, isExpertReviewed: true },
  { title: 'How to File ITR Online: Step by Step Guide for Salaried Employees', slug: 'how-to-file-itr-online-guide', excerpt: 'Complete walkthrough of filing income tax return online on the e-filing portal for FY 2024-25.', category: 'income-tax', author: { name: 'Priya Sharma' }, publishedAt: '2025-02-20', readingTime: 12, viewCount: 25600, isExpertReviewed: true },
  { title: 'HRA Exemption Calculator and Rules Explained with Examples', slug: 'hra-exemption-rules-examples', excerpt: 'Learn how HRA exemption is calculated with real examples for metro and non-metro city employees.', category: 'income-tax', author: { name: 'Rajesh Kumar' }, publishedAt: '2025-02-15', readingTime: 6, viewCount: 7890, isExpertReviewed: true },
];

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const info = categoryInfo[params.category] || { title: params.category, description: '' };
  return {
    title: `${info.title} Articles & Guides | PaisaGuru`,
    description: info.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const info = categoryInfo[params.category] || { title: params.category.replace(/-/g, ' '), description: 'Articles and guides on this topic.' };

  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 capitalize">{info.title}</span>
      </nav>

      <div className="mb-10">
        <h1 className="section-title capitalize">{info.title}</h1>
        <p className="section-subtitle max-w-2xl">{info.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {mockArticles.map(article => (
              <ArticleCard key={article.slug} {...article} />
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-20 space-y-6">
            <div className="card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Categories</h3>
              <ul className="space-y-2">
                {Object.entries(categoryInfo).map(([slug, info]) => (
                  <li key={slug}>
                    <Link href={`/category/${slug}`} className={`text-sm hover:text-primary-600 transition-colors ${
                      slug === params.category ? 'text-primary-600 font-semibold' : 'text-gray-600'
                    }`}>
                      {info.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Popular Calculators</h3>
              <ul className="space-y-2">
                {['income-tax', 'sip', 'emi', 'ppf'].map(c => (
                  <li key={c}>
                    <Link href={`/calculators/${c}`} className="text-sm text-primary-600 hover:underline capitalize">
                      {c.replace(/-/g, ' ')} Calculator
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5 bg-primary-50 border-primary-200">
              <h3 className="font-heading font-bold text-sm mb-2">Get Free Tax Guide</h3>
              <p className="text-xs text-gray-600 mb-3">Download our comprehensive tax saving guide for FY 2025-26.</p>
              <Link href="/contact" className="btn-primary text-xs w-full">Download Free</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
