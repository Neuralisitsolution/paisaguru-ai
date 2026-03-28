import type { Metadata } from 'next';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
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
  'stock-market': { title: 'Stock Market', description: 'Stock market investing guides, IPO analysis, trading strategies, and equity research for Indian investors.' },
  'retirement': { title: 'Retirement Planning', description: 'Retirement planning guides including NPS, EPF, pension plans, and strategies for a secure retirement in India.' },
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const info = categoryInfo[params.category] || { title: params.category.replace(/-/g, ' '), description: '' };
  return {
    title: `${info.title} Articles & Guides | PaisaGuru`,
    description: info.description,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const info = categoryInfo[params.category] || { title: params.category.replace(/-/g, ' '), description: 'Articles and guides on this topic.' };

  let articles: any[] = [];
  try {
    await connectDB();
    articles = await Article.find({ category: params.category, status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(20)
      .lean();
  } catch {
    // DB not connected
  }

  const serialized = articles.map((a: any) => ({
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt || a.metaDescription || '',
    category: a.category,
    author: { name: a.author?.name || 'PaisaGuru Team' },
    publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString().split('T')[0] : new Date(a.createdAt).toISOString().split('T')[0],
    readingTime: a.readingTime || Math.ceil((a.wordCount || 500) / 200),
    viewCount: a.views || 0,
    isExpertReviewed: a.expertReviewed || true,
  }));

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
          {serialized.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">No Articles Yet in {info.title}</h2>
              <p className="text-gray-500 mb-4">We&apos;re working on expert content for this category. Check back soon!</p>
              <Link href="/articles" className="btn-primary">Browse All Articles</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {serialized.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          )}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <div className="card p-5">
              <h3 className="font-heading font-bold text-sm mb-3">Categories</h3>
              <ul className="space-y-2">
                {Object.entries(categoryInfo).map(([slug, catInfo]) => (
                  <li key={slug}>
                    <Link href={`/category/${slug}`} className={`text-sm hover:text-primary-600 transition-colors ${
                      slug === params.category ? 'text-primary-600 font-semibold' : 'text-gray-600'
                    }`}>
                      {catInfo.title}
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
