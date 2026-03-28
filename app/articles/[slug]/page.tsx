import type { Metadata } from 'next';
import Link from 'next/link';
import AuthorBox from '@/components/AuthorBox';
import RelatedArticles from '@/components/RelatedArticles';
import SocialShare from '@/components/SocialShare';
import ReadingProgress from '@/components/ReadingProgress';

const mockArticle = {
  title: 'How to Save Income Tax for Salaried Employees in India 2025 - Complete Guide',
  slug: 'how-to-save-income-tax-salaried-employees-india-2025',
  content: `
<h2 id="introduction">Introduction</h2>
<p>Saving income tax is a priority for every salaried employee in India. With the right planning and knowledge of available deductions, you can legally reduce your tax liability significantly. This comprehensive guide covers all the tax-saving strategies available for salaried individuals in FY 2025-26.</p>

<h2 id="section-80c">Section 80C Deductions (Up to ₹1.5 Lakh)</h2>
<p>Section 80C is the most popular tax-saving section that allows deductions up to ₹1,50,000. Here are the best options:</p>
<ul>
<li><strong>ELSS Mutual Funds:</strong> Best for wealth creation with only 3-year lock-in. Historically returns 12-15% CAGR.</li>
<li><strong>PPF (Public Provident Fund):</strong> Safe option with 7.1% interest rate and 15-year lock-in. Completely tax-free returns.</li>
<li><strong>EPF (Employee Provident Fund):</strong> Mandatory for salaried employees. Your 12% contribution qualifies for 80C.</li>
<li><strong>Life Insurance Premium:</strong> Premium paid for self, spouse, or children qualifies under 80C.</li>
<li><strong>5-Year Tax Saving FD:</strong> Fixed returns with 5-year lock-in. Good for risk-averse investors.</li>
</ul>

<h2 id="section-80d">Section 80D - Health Insurance</h2>
<p>You can claim deduction for health insurance premiums:</p>
<ul>
<li>Up to ₹25,000 for self and family</li>
<li>Additional ₹25,000 for parents (₹50,000 if parents are senior citizens)</li>
<li>Maximum deduction: ₹75,000 (if parents are senior citizens)</li>
</ul>

<h2 id="hra-exemption">HRA Exemption</h2>
<p>If you live in a rented accommodation, you can claim HRA exemption under Section 10(13A). The exemption is the minimum of:</p>
<ul>
<li>Actual HRA received</li>
<li>50% of salary (metro) / 40% (non-metro)</li>
<li>Rent paid minus 10% of salary</li>
</ul>
<p><strong>Example:</strong> Rahul in Mumbai earns ₹60,000 basic salary, receives ₹24,000 HRA, and pays ₹30,000 rent. His HRA exemption would be ₹24,000 (minimum of ₹24,000, ₹30,000, ₹24,000).</p>

<h2 id="nps-benefit">NPS Additional Benefit - Section 80CCD(1B)</h2>
<p>Over and above the ₹1.5 lakh limit of 80C, you can claim an additional deduction of ₹50,000 by investing in the National Pension System (NPS) under Section 80CCD(1B). This effectively increases your total deduction to ₹2 lakh.</p>

<h2 id="home-loan">Home Loan Tax Benefits</h2>
<p>Home loan borrowers get dual benefits:</p>
<ul>
<li><strong>Section 80C:</strong> Principal repayment up to ₹1.5 lakh</li>
<li><strong>Section 24:</strong> Interest payment up to ₹2 lakh for self-occupied property</li>
</ul>

<h2 id="new-vs-old">New Regime vs Old Regime</h2>
<p>The new tax regime offers lower tax rates but no deductions. Use our <a href="/calculators/income-tax">Income Tax Calculator</a> to compare both regimes and find which saves you more.</p>

<h2 id="action-plan">Action Plan for Maximum Tax Saving</h2>
<ol>
<li>Max out ₹1.5 lakh under Section 80C (prefer ELSS or PPF)</li>
<li>Buy health insurance for ₹25,000+ deduction under 80D</li>
<li>Invest ₹50,000 in NPS for additional 80CCD(1B) deduction</li>
<li>Claim HRA exemption if paying rent</li>
<li>Claim home loan benefits if applicable</li>
</ol>
`,
  excerpt: 'Complete guide to saving income tax for salaried employees in India. Learn about 80C, 80D, HRA, NPS, and more tax-saving strategies for FY 2025-26.',
  category: 'income-tax',
  author: { name: 'Priya Sharma', slug: 'priya-sharma', title: 'Chartered Accountant | Tax Expert | 10 Years Experience', bio: 'Priya is a practicing Chartered Accountant with 10 years of experience in tax planning and compliance. She has helped over 5,000 individuals optimize their tax savings.', image: '', expertise: ['Income Tax', 'Tax Planning', 'GST', 'Audit'] },
  publishedAt: '2025-03-15',
  lastUpdated: '2025-03-20',
  readingTime: 8,
  viewCount: 15420,
  isExpertReviewed: true,
  isFactChecked: true,
  faqs: [
    { question: 'What is the maximum tax saving possible under old regime?', answer: 'Under the old regime, you can save up to ₹3-4 lakh through various deductions including 80C (₹1.5L), 80D (₹75K), NPS 80CCD(1B) (₹50K), HRA, and home loan interest (₹2L).' },
    { question: 'Should I choose old or new tax regime?', answer: 'If your total deductions exceed ₹3.75 lakh, the old regime is likely better. For lower deductions, the new regime with its lower rates may save more. Use our calculator to compare.' },
    { question: 'Can I claim 80C and NPS both?', answer: 'Yes! 80C allows ₹1.5 lakh deduction and NPS under 80CCD(1B) allows additional ₹50,000, totaling ₹2 lakh in deductions.' },
  ],
};

const relatedArticles = [
  { title: 'ELSS vs PPF vs FD: Which Tax Saving Investment is Best in 2025?', slug: 'elss-vs-ppf-vs-fd-comparison-2025', category: 'investments', readingTime: 6 },
  { title: 'Complete Guide to HRA Exemption Calculation for Salaried Employees', slug: 'hra-exemption-calculation-guide', category: 'income-tax', readingTime: 5 },
  { title: 'Section 80C Deduction: All Investment Options Explained', slug: 'section-80c-deduction-options', category: 'income-tax', readingTime: 7 },
  { title: 'New Tax Regime vs Old Tax Regime: Detailed Comparison 2025', slug: 'new-vs-old-tax-regime-comparison-2025', category: 'income-tax', readingTime: 8 },
];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: mockArticle.title,
    description: mockArticle.excerpt,
    openGraph: {
      title: mockArticle.title,
      description: mockArticle.excerpt,
      type: 'article',
      publishedTime: mockArticle.publishedAt,
      modifiedTime: mockArticle.lastUpdated,
      authors: [mockArticle.author.name],
    },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = mockArticle;
  const headings = [
    { id: 'introduction', text: 'Introduction', level: 2 },
    { id: 'section-80c', text: 'Section 80C Deductions', level: 2 },
    { id: 'section-80d', text: 'Section 80D - Health Insurance', level: 2 },
    { id: 'hra-exemption', text: 'HRA Exemption', level: 2 },
    { id: 'nps-benefit', text: 'NPS Additional Benefit', level: 2 },
    { id: 'home-loan', text: 'Home Loan Tax Benefits', level: 2 },
    { id: 'new-vs-old', text: 'New Regime vs Old Regime', level: 2 },
    { id: 'action-plan', text: 'Action Plan', level: 2 },
  ];

  return (
    <>
      <ReadingProgress />
      <article className="container-custom py-10">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/category/${article.category}`} className="hover:text-primary-600 capitalize">{article.category.replace(/-/g, ' ')}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">Article</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC Sidebar (Desktop) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
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
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full capitalize mb-4">
              {article.category.replace(/-/g, ' ')}
            </span>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                  {article.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-900">{article.author.name}</p>
                  <p className="text-xs text-gray-500">Published {article.publishedAt} · Updated {article.lastUpdated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>{article.readingTime} min read</span>
                <span>{article.viewCount.toLocaleString('en-IN')} views</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex gap-2 mb-6">
              {article.isExpertReviewed && <span className="badge-expert">Expert Reviewed</span>}
              {article.isFactChecked && <span className="badge-fact-check">Fact Checked</span>}
            </div>

            {/* Featured Image Placeholder */}
            <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl mb-8 flex items-center justify-center">
              <span className="text-primary-300 text-lg font-medium">Featured Image</span>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-strong:text-gray-900 prose-li:text-gray-700 mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* FAQs */}
            <section className="mb-8">
              <h2 className="font-heading font-bold text-2xl text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {article.faqs.map((faq, i) => (
                  <details key={i} className="bg-gray-50 border border-gray-200 rounded-lg">
                    <summary className="px-5 py-4 cursor-pointer font-medium text-gray-900 hover:text-primary-600">{faq.question}</summary>
                    <p className="px-5 pb-4 text-sm text-gray-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* Share */}
            <div className="border-t border-b border-gray-200 py-4 mb-8">
              <SocialShare url={`https://paisaguru.com/articles/${article.slug}`} title={article.title} />
            </div>

            {/* Author Box */}
            <div className="mb-8">
              <AuthorBox {...article.author} />
            </div>

            {/* Related Articles */}
            <div className="mb-8">
              <RelatedArticles articles={relatedArticles} />
            </div>

            {/* Disclaimer */}
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 mb-8">
              <strong>Disclaimer:</strong> This article is for informational purposes only and does not constitute financial advice. Please consult a qualified financial advisor before making any investment or tax-related decisions. Tax laws are subject to change.
            </div>

            {/* Disqus Placeholder */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-heading font-bold text-xl text-gray-900 mb-4">Comments</h3>
              <div id="disqus_thread" className="bg-gray-50 rounded-lg p-8 text-center text-gray-500 text-sm">
                Comments powered by Disqus will load here.
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20 space-y-6">
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
              <div className="card p-5 bg-primary-50">
                <h4 className="font-heading font-bold text-sm mb-2">Free Tax Saving Guide</h4>
                <p className="text-xs text-gray-600 mb-3">Download our comprehensive tax saving guide for FY 2025-26.</p>
                <Link href="/contact" className="btn-primary text-xs w-full">Get Free Guide</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        author: { '@type': 'Person', name: article.author.name, jobTitle: article.author.title },
        datePublished: article.publishedAt,
        dateModified: article.lastUpdated,
        publisher: { '@type': 'Organization', name: 'PaisaGuru', url: 'https://paisaguru.com' },
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faqs.map(f => ({
          '@type': 'Question', name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      })}} />
    </>
  );
}
