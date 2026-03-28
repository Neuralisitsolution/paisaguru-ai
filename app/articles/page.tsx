import type { Metadata } from 'next';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

export const metadata: Metadata = {
  title: 'Articles | PaisaGuru - Indian Personal Finance',
  description: 'Expert articles on mutual funds, tax planning, insurance, stock market and more for Indian investors.',
};

export const revalidate = 60;

async function getArticles() {
  try {
    await connectDB();
    const articles = await Article.find({ status: { $in: ['published', 'review'] } })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    return JSON.parse(JSON.stringify(articles));
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return [];
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="container-custom py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-3">
          Finance Articles
        </h1>
        <p className="text-gray-600 text-lg">
          Expert insights on personal finance, investments, tax planning and more for Indian investors.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl mb-2">No articles yet.</p>
          <p className="text-sm">Run the cron job to generate AI articles.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <Link
              key={article._id}
              href={`/articles/${article.slug}`}
              className="card p-5 hover:shadow-lg transition-shadow group"
            >
              {/* Category Badge */}
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize mb-3">
                {article.category?.replace(/-/g, ' ')}
              </span>

              {/* Title */}
              <h2 className="font-heading font-bold text-gray-900 text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                {article.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>{article.author?.name || 'PaisaGuru'}</span>
                <span>{article.readingTime || 5} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}