import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import ArticleCard from '@/components/ArticleCard';
import TrustBadges from '@/components/TrustBadges';
import NewsTicker from '@/components/NewsTicker';
import AIChatBot from '@/components/AIChatBot';

export const dynamic = 'force-dynamic';

const calculators = [
  { name: 'Income Tax', href: '/calculators/income-tax', icon: '🧾', desc: 'Old vs New Regime' },
  { name: 'SIP', href: '/calculators/sip', icon: '📈', desc: 'Plan Your SIP' },
  { name: 'EMI', href: '/calculators/emi', icon: '🏠', desc: 'Loan EMI' },
  { name: 'FD', href: '/calculators/fd', icon: '🏦', desc: 'FD Returns' },
  { name: 'PPF', href: '/calculators/ppf', icon: '💰', desc: '15 Year Projection' },
  { name: 'HRA', href: '/calculators/hra', icon: '🏘️', desc: 'HRA Exemption' },
];

const expertPicks = [
  { title: 'ELSS funds offer best tax saving with wealth creation', author: 'Rajesh Kumar, CFP', category: 'investments' },
  { title: 'Max out ₹50K NPS deduction before March 31st', author: 'Priya Sharma, CA', category: 'income-tax' },
  { title: 'Health insurance for parents saves up to ₹50K in tax', author: 'Sunita Rao, Insurance Expert', category: 'insurance' },
];

export default async function HomePage() {
  // Fetch real articles from MongoDB
  let articles: any[] = [];
  try {
    await connectDB();
    const dbArticles = await Article.find({ status: 'published' })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(6)
      .lean();
    articles = dbArticles.map((a: any) => ({
      title: a.title,
      slug: a.slug,
      excerpt: a.excerpt || a.metaDescription || '',
      category: a.category,
      author: { name: a.author?.name || 'PaisaGuru Team' },
      publishedAt: a.publishedAt ? new Date(a.publishedAt).toISOString().split('T')[0] : new Date(a.createdAt).toISOString().split('T')[0],
      readingTime: a.readingTime || Math.ceil((a.wordCount || 500) / 200),
      viewCount: a.views || 0,
      isExpertReviewed: true,
    }));
  } catch {
    // DB not connected — show empty state
  }

  return (
    <>
      <NewsTicker />

      <div className="container-custom">
        {/* Hero Section */}
        <section className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
                India&apos;s #1 Finance Guide
              </span>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 leading-tight mb-4">
                Smart Money Decisions, <span className="text-gradient">Made Simple</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Free financial calculators, expert articles, and AI-powered advice to help you save tax, invest wisely, and plan your future.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/calculators" className="btn-primary">
                  Free Calculators
                </Link>
                <Link href="/category/income-tax" className="btn-outline">
                  Tax Saving Guide
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500">
                <div><span className="font-bold text-gray-900 text-lg">50K+</span><br />Monthly readers</div>
                <div className="w-px h-10 bg-gray-200" />
                <div><span className="font-bold text-gray-900 text-lg">8</span><br />Free calculators</div>
                <div className="w-px h-10 bg-gray-200" />
                <div><span className="font-bold text-gray-900 text-lg">100+</span><br />Expert articles</div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-primary-100 via-primary-50 to-secondary-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">₹</div>
                  <p className="text-primary-600 font-heading font-bold text-xl">PaisaGuru AI</p>
                  <p className="text-gray-500 text-sm mt-1">Your Personal Finance Guide</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Snapshot */}
        <section className="py-4 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'SENSEX', value: '73,648.62', change: '+0.42%', up: true },
              { name: 'NIFTY 50', value: '22,326.90', change: '+0.38%', up: true },
              { name: 'GOLD', value: '₹78,250/10g', change: '+1.2%', up: true },
              { name: 'USD/INR', value: '83.42', change: '-0.05%', up: false },
            ].map(m => (
              <div key={m.name} className="flex items-center gap-3 px-4 py-2 bg-white border rounded-lg">
                <span className="text-xs font-semibold text-gray-500">{m.name}</span>
                <span className="font-mono font-bold text-sm text-gray-900">{m.value}</span>
                <span className={`text-xs font-medium ${m.up ? 'text-green-600' : 'text-red-600'}`}>{m.change}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Calculators */}
        <section className="py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="section-title !mb-0">Free Calculators</h2>
            <Link href="/calculators" className="text-sm font-semibold text-primary-600 hover:underline">View All &rarr;</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {calculators.map(c => (
              <Link key={c.href} href={c.href} className="card p-4 text-center group hover:border-primary-200">
                <span className="text-3xl block mb-2">{c.icon}</span>
                <h3 className="font-heading font-semibold text-sm text-gray-900 group-hover:text-primary-600 transition-colors">{c.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Articles — Real from MongoDB */}
        {articles.length > 0 && (
          <section className="py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title !mb-0">Latest Expert Articles</h2>
              <Link href="/articles" className="text-sm font-semibold text-primary-600 hover:underline">View All &rarr;</Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(0, 3).map(article => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </section>
        )}

        {/* Expert Picks */}
        <section className="py-10">
          <h2 className="section-title">Expert Picks This Week</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {expertPicks.map((pick, i) => (
              <div key={i} className="card p-5 border-l-4 border-l-primary-600">
                <p className="text-sm text-gray-800 font-medium mb-3">&ldquo;{pick.title}&rdquo;</p>
                <p className="text-xs text-primary-600 font-semibold">{pick.author}</p>
                <span className="text-xs text-gray-400 capitalize">{pick.category.replace(/-/g, ' ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Most Read — Real from MongoDB */}
        {articles.length > 0 && (
          <section className="py-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-title !mb-0">Most Read This Week</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.slice(0, 4).map((article, i) => (
                <Link key={article.slug} href={`/articles/${article.slug}`} className="flex gap-4 items-start card p-4 group">
                  <span className="font-heading font-bold text-3xl text-primary-200 mt-1">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-heading font-semibold text-sm text-gray-900 group-hover:text-primary-600 transition-colors mb-1">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.author.name}</span>
                      <span>{article.readingTime} min read</span>
                      <span>{(article.viewCount || 0).toLocaleString('en-IN')} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No articles fallback */}
        {articles.length === 0 && (
          <section className="py-10">
            <div className="card p-8 text-center">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-3">Expert Articles Coming Soon</h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Our team is working on expert finance articles. Meanwhile, try our free calculators!
              </p>
              <Link href="/calculators" className="btn-primary">Explore Calculators</Link>
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="py-10">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">Get Free Tax Saving Guide 2025-26</h2>
            <p className="text-primary-100 mb-6 max-w-lg mx-auto">
              Join 50,000+ Indians who receive weekly finance tips, tax saving strategies, and investment ideas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none" />
              <button className="px-6 py-3 bg-secondary-600 text-white rounded-lg font-semibold hover:bg-secondary-700 transition-colors whitespace-nowrap">
                Get Free Guide
              </button>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-10">
          <TrustBadges />
        </section>

        {/* Quiz CTA */}
        <section className="py-10">
          <div className="card p-8 text-center">
            <h2 className="font-heading font-bold text-2xl text-gray-900 mb-3">Test Your Finance Knowledge</h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">Take our daily finance quiz and compete with thousands of other finance enthusiasts.</p>
            <Link href="/quiz" className="btn-primary">Take Today&apos;s Quiz</Link>
          </div>
        </section>
      </div>

      <AIChatBot />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'PaisaGuru',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com',
        description: 'India\'s #1 personal finance guide with free calculators and expert advice.',
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paisaguru.com'}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      })}} />
    </>
  );
}
