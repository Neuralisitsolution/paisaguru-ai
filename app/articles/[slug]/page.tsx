import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import AuthorBox from '@/components/AuthorBox';
import SocialShare from '@/components/SocialShare';
import ReadingProgress from '@/components/ReadingProgress';
import AdBanner from '@/components/AdBanner';
import NewsletterInArticle from '@/components/NewsletterInArticle';
import WhatsAppFloat from '@/components/WhatsAppFloat';

async function getArticle(slug: string) {
  try {
    await connectDB();
    const article = await Article.findOne({ slug, status: 'published' }).lean();
    if (!article) return null;
    // Increment views
    await Article.updateOne({ slug }, { $inc: { views: 1 } });
    return JSON.parse(JSON.stringify(article));
  } catch {
    return null;
  }
}

async function getRelatedArticles(category: string, currentSlug: string) {
  try {
    await connectDB();
    const articles = await Article.find({ category, status: 'published', slug: { $ne: currentSlug } })
      .sort({ views: -1 })
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
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt || article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || 'PaisaGuru Team'],
    },
  };
}

function insertAdsAndWidgets(content: string): string {
  // Split content by paragraphs (double newline or closing tags)
  const paragraphs = content.split(/\n\n+/);
  const result: string[] = [];

  for (let i = 0; i < paragraphs.length; i++) {
    result.push(paragraphs[i]);

    // After 3rd paragraph — insert newsletter widget placeholder
    if (i === 2) {
      result.push('<!--NEWSLETTER_WIDGET-->');
    }

    // After every 6th paragraph — insert in-article ad placeholder
    if (i > 0 && (i + 1) % 6 === 0) {
      result.push('<!--AD_SLOT-->');
    }
  }

  return result.join('\n\n');
}

function renderContentWithWidgets(content: string) {
  const parts = content.split(/<!--(NEWSLETTER_WIDGET|AD_SLOT)-->/);
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part === 'NEWSLETTER_WIDGET') {
      elements.push(<NewsletterInArticle key={`newsletter-${i}`} />);
    } else if (part === 'AD_SLOT') {
      elements.push(<AdBanner key={`ad-${i}`} format="in-article" slot="in-article" />);
    } else if (part.trim()) {
      // Convert markdown-style content to HTML for display
      elements.push(
        <div
          key={`content-${i}`}
          className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(part) }}
        />
      );
    }
  }

  return elements;
}

function markdownToHtml(md: string): string {
  return md
    // Headings
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs (lines that aren't already tags)
    .replace(/^(?!<[hlua]|<li|<strong)(.+)$/gm, '<p>$1</p>')
    // Wrap consecutive li elements
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, '<ul>$&</ul>');
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article.category, article.slug);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articleUrl = `${siteUrl}/articles/${article.slug}`;
  const publishDate = article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const updateDate = article.updatedAt ? new Date(article.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
  const readingTime = article.readingTime || Math.ceil((article.wordCount || 500) / 200);

  // Extract headings for TOC
  const headingRegex = /^## (.+)$/gm;
  const headings: { id: string; text: string }[] = [];
  let match;
  while ((match = headingRegex.exec(article.content)) !== null) {
    headings.push({ id: match[1].trim(), text: match[1].trim() });
  }

  const processedContent = insertAdsAndWidgets(article.content);

  // Check if article is beginner-friendly
  const beginnerKeywords = ['beginner', 'basics', 'start', 'first time', 'guide', 'how to', 'introduction', 'what is'];
  const isBeginnerFriendly = beginnerKeywords.some(kw =>
    article.title.toLowerCase().includes(kw) || article.category === 'banking'
  );

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
          <Link href={`/category/${article.category}`} className="hover:text-primary-600 capitalize">{article.category.replace(/-/g, ' ')}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">Article</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              {headings.length > 0 && (
                <>
                  <h4 className="font-heading font-bold text-sm text-gray-900 mb-3 uppercase tracking-wider">Table of Contents</h4>
                  <ul className="space-y-1 border-l-2 border-gray-200">
                    {headings.map(h => (
                      <li key={h.id} className="pl-3">
                        <a href={`#${h.id}`} className="block py-1 text-sm text-gray-500 hover:text-primary-600 transition-colors border-l-2 border-transparent -ml-[2px] hover:border-primary-600">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize">
                {article.category.replace(/-/g, ' ')}
              </span>
              {isBeginnerFriendly && (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Beginner Friendly
                </span>
              )}
              {article.expertReviewed && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  Expert Reviewed
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                  {(article.author?.name || 'PG').split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{article.author?.name || 'PaisaGuru Team'}</p>
                  <p className="text-xs text-gray-500">
                    {publishDate && `Published ${publishDate}`}
                    {updateDate && ` · Updated ${updateDate}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{readingTime} min read</span>
                <span>{(article.views || 0).toLocaleString('en-IN')} views</span>
              </div>
            </div>

            {/* Article Content with inline ads and newsletter */}
            <div className="mb-8">
              {renderContentWithWidgets(processedContent)}
            </div>

            {/* FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <section className="mb-8">
                <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {article.faqs.map((faq: { question: string; answer: string }, i: number) => (
                    <details key={i} className="bg-gray-50 border border-gray-200 rounded-lg">
                      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.question}</summary>
                      <p className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Share */}
            <div className="border-t border-b border-gray-200 py-4 mb-8">
              <SocialShare url={articleUrl} title={article.title} />
            </div>

            {/* Author Box */}
            {article.author && (
              <div className="mb-8">
                <AuthorBox
                  name={article.author.name}
                  title={article.author.title}
                  bio={article.author.bio}
                  slug={article.author.slug}
                  expertise={article.author.expertise || []}
                />
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">Related Articles</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedArticles.map((rel: any) => (
                    <Link key={rel.slug} href={`/articles/${rel.slug}`} className="card p-4 group">
                      <span className="text-xs text-primary-600 font-medium capitalize">{(rel.category || '').replace(/-/g, ' ')}</span>
                      <h4 className="font-heading font-semibold text-sm text-gray-900 group-hover:text-primary-600 transition-colors mt-1">{rel.title}</h4>
                      {rel.readingTime && <span className="text-xs text-gray-400 mt-1 block">{rel.readingTime} min read</span>}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-8">
              <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute financial advice. Please consult a SEBI-registered advisor or qualified CA before making investment or tax decisions. Tax laws and rates are subject to change.
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              {/* Rectangle Ad */}
              <AdBanner format="rectangle" slot="article-sidebar" />

              <div className="card p-5">
                <h4 className="font-heading font-bold text-sm mb-3">Popular Calculators</h4>
                <ul className="space-y-2">
                  {[
                    { name: 'Income Tax Calculator', href: '/calculators/income-tax' },
                    { name: 'SIP Calculator', href: '/calculators/sip' },
                    { name: 'EMI Calculator', href: '/calculators/emi' },
                    { name: 'HRA Calculator', href: '/calculators/hra' },
                  ].map(c => (
                    <li key={c.href}>
                      <Link href={c.href} className="text-sm text-primary-600 hover:underline">{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar Ad */}
              <AdBanner format="sidebar" slot="article-sidebar-tall" />

              <div className="card p-5 bg-primary-50">
                <h4 className="font-heading font-bold text-sm mb-2">Free Tax Saving Guide</h4>
                <p className="text-xs text-gray-600 mb-3">Download our comprehensive tax saving guide for FY 2025-26.</p>
                <Link href="/contact" className="btn-primary text-xs w-full">Get Free Guide</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {/* Floating WhatsApp share on mobile */}
      <WhatsAppFloat url={articleUrl} title={article.title} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.metaDescription || article.excerpt,
        author: { '@type': 'Person', name: article.author?.name || 'PaisaGuru Team', jobTitle: article.author?.title || '' },
        datePublished: article.publishedAt || article.createdAt,
        dateModified: article.updatedAt || article.publishedAt || article.createdAt,
        publisher: { '@type': 'Organization', name: 'PaisaGuru', url: siteUrl },
        mainEntityOfPage: articleUrl,
      })}} />
      {article.faqs && article.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: article.faqs.map((f: { question: string; answer: string }) => ({
            '@type': 'Question', name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        })}} />
      )}
    </>
  );
}
