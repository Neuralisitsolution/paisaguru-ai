import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { fetchFinanceNews } from '@/lib/rss-fetcher';
import { generateArticle } from '@/lib/ai-engine';
import { checkArticleQuality } from '@/lib/quality-checker';
import { formatSlug, calculateReadingTime } from '@/lib/seo-helpers';
import { insertAffiliateLinks } from '@/lib/affiliate-links';

const ALL_CATEGORIES = [
  'investments',
  'mutual-funds',
  'income-tax',
  'insurance',
  'stock-market',
  'banking',
];

// Rotate category each run based on day of year
function getCategoryForRun(): string[] {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  // Pick 2 categories per run for variety
  const idx1 = dayOfYear % ALL_CATEGORIES.length;
  const idx2 = (dayOfYear + 1) % ALL_CATEGORIES.length;
  return [ALL_CATEGORIES[idx1], ALL_CATEGORIES[idx2]];
}

const CATEGORY_TOPICS: Record<string, string[]> = {
  'investments': [
    'Best investment options for salaried employees in India',
    'How to build a diversified portfolio with ₹10,000 per month',
    'Fixed deposit vs debt mutual funds — which gives better returns after tax',
    'Gold investment options in India — ETF, sovereign bonds, or physical gold',
    'How to invest ₹1 lakh for maximum returns in India',
  ],
  'mutual-funds': [
    'Best SIP mutual funds for long term wealth creation in India',
    'How to pick the right ELSS fund for tax saving under 80C',
    'Index funds vs actively managed funds — what works better in India',
    'How to review and rebalance your mutual fund portfolio',
    'Best liquid funds in India for emergency fund parking',
  ],
  'income-tax': [
    'How to save income tax for salaried employees — complete guide',
    'New tax regime vs old tax regime — which saves more money',
    'Section 80C deduction — all investment options compared',
    'How to file ITR online — step by step guide for beginners',
    'HRA exemption calculation — how salaried employees can claim it',
  ],
  'insurance': [
    'Best term insurance plans in India — comparison and review',
    'Health insurance for family — how to choose the right plan',
    'Why you should never buy ULIPs — a detailed analysis',
    'Critical illness rider vs standalone critical illness policy',
    'How much life insurance cover do you actually need',
  ],
  'stock-market': [
    'How to start investing in stocks as a beginner in India',
    'Best Demat account in India — Zerodha vs Groww vs Angel One',
    'How to analyze stocks before investing — fundamental analysis basics',
    'IPO investing in India — should you apply for every IPO',
    'Dividend stocks in India — building a passive income portfolio',
  ],
  'banking': [
    'Best savings account interest rates in India — comparison',
    'How to improve your CIBIL score quickly — practical tips',
    'Personal loan vs credit card EMI — which is cheaper',
    'Best credit cards in India for cashback and rewards',
    'How to open a PPF account online — complete process',
  ],
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();

    const categories = getCategoryForRun();
    let totalCreated = 0;
    const results: string[] = [];

    for (const category of categories) {
      const topics = CATEGORY_TOPICS[category] || CATEGORY_TOPICS['investments'];
      // Pick a random topic from the category
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const templateType = (totalCreated % 5) + 1;

      try {
        const generated = await generateArticle(topic, category, templateType);
        const quality = checkArticleQuality(generated.content, generated.title);

        if (!quality.passed) {
          results.push(`${category}: quality too low (${quality.score})`);
          continue;
        }

        const slug = formatSlug(generated.title);
        const existing = await Article.findOne({ slug });
        if (existing) {
          results.push(`${category}: duplicate slug`);
          continue;
        }

        // Insert affiliate links based on category
        const contentWithLinks = insertAffiliateLinks(generated.content, category);

        await Article.create({
          title: generated.title,
          slug,
          content: contentWithLinks,
          excerpt: generated.excerpt || generated.metaDescription || '',
          metaDescription: generated.metaDescription || generated.excerpt || '',
          category,
          author: generated.author,
          metaTitle: generated.title,
          tags: [category, 'finance', 'india'],
          faqs: generated.faqs,
          qualityScore: quality.score,
          wordCount: generated.content.split(/\s+/).length,
          readingTime: calculateReadingTime(generated.content),
          templateType,
          status: 'published',
          publishedAt: new Date(),
        });

        totalCreated++;
        results.push(`${category}: created "${generated.title.substring(0, 50)}..."`);
      } catch (err: any) {
        results.push(`${category}: error — ${err?.message?.substring(0, 100) || 'unknown'}`);
        console.error(`Cron error for ${category}:`, err);
      }
    }

    // Also fetch RSS news for SEO freshness signals
    let newsCount = 0;
    try {
      const news = await fetchFinanceNews(5);
      newsCount = news.length;
    } catch {
      // RSS fetch is optional, don't fail the whole cron
    }

    return NextResponse.json({
      message: `Created ${totalCreated} articles across ${categories.join(', ')}`,
      details: results,
      newsItemsFetched: newsCount,
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Cron job failed', detail: error?.message }, { status: 500 });
  }
}
