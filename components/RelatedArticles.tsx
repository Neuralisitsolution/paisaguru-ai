import Link from 'next/link';

interface RelatedArticle {
  title: string;
  slug: string;
  category: string;
  readingTime: number;
}

export default function RelatedArticles({ articles }: { articles: RelatedArticle[] }) {
  return (
    <div>
      <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">Related Articles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {articles.map(article => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="card p-4 group"
          >
            <div className="h-24 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg mb-3" />
            <span className="text-xs text-primary-600 font-semibold capitalize">{article.category.replace(/-/g, ' ')}</span>
            <h4 className="font-heading font-semibold text-sm text-gray-900 mt-1 group-hover:text-primary-600 transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-xs text-gray-500 mt-2">{article.readingTime} min read</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
