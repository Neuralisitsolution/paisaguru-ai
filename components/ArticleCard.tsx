import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: { name: string; image?: string };
  featuredImage?: string;
  publishedAt: string;
  readingTime: number;
  viewCount?: number;
  isExpertReviewed?: boolean;
}

export default function ArticleCard({
  title, slug, excerpt, category, author, publishedAt, readingTime, viewCount, isExpertReviewed,
}: ArticleCardProps) {
  return (
    <article className="card group">
      <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 relative">
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full capitalize">
            {category.replace(/-/g, ' ')}
          </span>
        </div>
        {isExpertReviewed && (
          <div className="absolute top-3 right-3">
            <span className="badge-expert text-[10px]">Expert Reviewed</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <Link href={`/articles/${slug}`}>
          <h3 className="font-heading font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold text-[10px]">
              {author.name.charAt(0)}
            </div>
            <span>{author.name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{readingTime} min read</span>
            {viewCount && <span>{viewCount.toLocaleString('en-IN')} views</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
