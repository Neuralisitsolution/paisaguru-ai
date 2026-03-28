import type { Metadata } from 'next';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleCard from '@/components/ArticleCard';

export const metadata: Metadata = {
  title: 'Finance Articles | PaisaGuru',
  description: 'Expert articles on income tax, mutual funds, insurance, stock market, banking, and personal finance for Indians.',
};

export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  let articles: any[] = [];
  try {
    await connectDB();
    articles = await Article.find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(30)
      .lean();
  } catch {
    // DB not connected — show empty state
  }

  // Serialize MongoDB documents
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
        <span className="text-gray-900">Articles</span>
      </nav>

      <h1 className="section-title">Latest Finance Articles</h1>
      <p className="section-subtitle max-w-2xl">
        Expert-written guides on tax saving, investments, insurance, and everything personal finance in India.
      </p>

      {serialized.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-heading font-bold text-xl text-gray-900 mb-2">Articles Coming Soon</h2>
          <p className="text-gray-500 mb-4">Our experts are working on fresh content. Check back soon!</p>
          <Link href="/calculators" className="btn-primary">Try Our Free Calculators</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {serialized.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      )}
    </div>
  );
}
