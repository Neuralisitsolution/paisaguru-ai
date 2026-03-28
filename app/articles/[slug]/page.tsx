import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import AuthorBox from '@/components/AuthorBox';
import RelatedArticles from '@/components/RelatedArticles';
import SocialShare from '@/components/SocialShare';
import ReadingProgress from '@/components/ReadingProgress';

export const revalidate = 60;

async function getArticle(slug: string) {
  try {
    await connectDB();
    const article = await Article.findOne({
      slug,
      status: { $in: ['published', 'review'] },
    }).lean();
    return article ? JSON.parse(JSON.stringify(article)) : null;
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

async function getRelatedArticles(category: string, currentSlug: string) {
  try {
    await connectDB();
    const articles = await Article.find({
      category,
      slug: { $ne: currentSlug },
      status: { $in: ['published', 'review'] },
    })
      .limit(4)
      .select('title slug category readingTime')
      .lean();
    return JSON.parse(JSON.stringify(articles));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'Article Not Found | PaisaGuru' };
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      authors: [article.author?.name],
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();

  const relatedArticles = await getRelatedArticles(article.category, article.slug);

  // Convert markdown-style content to basic HTML if needed
  const content = article.content || '';

  return (
    <>
      <ReadingProgress />
      <article className="container-custom py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-primary-600">Articles</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${article.category}`} className="hover:text-primary-600 capitalize">
            {article.category?.replace(/-/g, ' ')}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-1">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize mb-4">
              {article.category?.replace(/-/g, ' ')}
            </span>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                  {article.author?.name?.split(' ').map((n: string) => n[0]).join('') || 'PG'}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{article.author?.name || 'PaisaGuru'}</p>
                  <p className="text-xs text-gray-500">
                    {article.author?.title || 'Finance Expert'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{article.readingTime || 5} min read</span>
                <span>{article.wordCount?.toLocaleString('en-IN') || 0} words</span>
              </div>
            </div>

            {/* Featured Image Placeholder */}
            <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl mb-8 flex items-center justify-center">
              <span className="text-primary-400 text-lg font-medium capitalize">
                {article.category?.replace(/-/g, ' ')}
              </span>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-li:text-gray-700 mb-8 whitespace-pre-wrap"
            >
              {content}
            </div>

            {/* FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faqs.map((faq: any, i: number) => (
                    <details key={i} className="bg-gray-50 border border-gray-200 rounded-lg">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">
                        {faq.question}
                      </summary>
                      <p className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Share */}
            <div className="border-t border-b border-gray-200 py-4 mb-8">
              <SocialShare
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/articles/${article.slug}`}
                title={article.title}
              />
            </div>

            {/* Author Box */}
            {article.author && (
              <div className="mb-8">
                <AuthorBox {...article.author} />
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-8">
                <RelatedArticles articles={relatedArticles} />
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-8">
              <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making any investment or tax-related decisions.
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-20 space-y-6">
              <div className="card p-5">
                <h4 className="font-heading font-bold text-sm mb-3">Popular Calculators</h4>
                <ul className="space-y-2">
                  {[
                    { name: 'SIP Calculator', href: '/calculators/sip' },
                    { name: 'NPS Calculator', href: '/calculators/nps' },
                  ].map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="text-sm text-primary-600 hover:underline">
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}