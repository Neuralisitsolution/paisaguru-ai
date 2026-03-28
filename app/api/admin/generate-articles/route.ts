import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
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

const CATEGORY_TOPICS: Record<string, string[]> = {
  'investments': [
    'Best investment options for salaried employees in India 2025',
    'How to build a diversified portfolio with ₹10,000 per month',
    'Fixed deposit vs debt mutual funds — which gives better returns after tax',
    'Gold investment options in India — ETF, sovereign bonds, or physical gold',
    'How to invest ₹1 lakh for maximum returns in India',
    'PPF vs ELSS vs NPS — best tax saving investment compared',
    'Top 5 safe investments for senior citizens in India',
  ],
  'mutual-funds': [
    'Best SIP mutual funds for long term wealth creation in India',
    'How to pick the right ELSS fund for tax saving under 80C',
    'Index funds vs actively managed funds — what works better in India',
    'How to review and rebalance your mutual fund portfolio',
    'Best liquid funds in India for emergency fund parking',
    'Large cap vs mid cap vs small cap funds — which to choose',
    'How to start SIP with just ₹500 per month — complete beginner guide',
  ],
  'income-tax': [
    'How to save income tax for salaried employees — complete guide',
    'New tax regime vs old tax regime — which saves more money in 2025',
    'Section 80C deduction — all investment options compared',
    'How to file ITR online — step by step guide for beginners',
    'HRA exemption calculation — how salaried employees can claim it',
    'Income tax on fixed deposit interest — how to save legally',
    'Tax benefits of home loan — Section 24 and Section 80C explained',
  ],
  'insurance': [
    'Best term insurance plans in India — comparison and review',
    'Health insurance for family — how to choose the right plan',
    'Why you should never buy ULIPs — a detailed analysis',
    'Critical illness rider vs standalone critical illness policy',
    'How much life insurance cover do you actually need in India',
    'Top 5 health insurance plans for parents above 60',
    'Motor insurance — comprehensive vs third party explained',
  ],
  'stock-market': [
    'How to start investing in stocks as a beginner in India',
    'Best Demat account in India — Zerodha vs Groww vs Angel One compared',
    'How to analyze stocks before investing — fundamental analysis basics',
    'IPO investing in India — should you apply for every IPO',
    'Dividend stocks in India — building a passive income portfolio',
    'Nifty 50 vs Sensex — which index to track for investments',
    'Intraday trading tips for beginners — mistakes to avoid',
  ],
  'banking': [
    'Best savings account interest rates in India — bank comparison 2025',
    'How to improve your CIBIL score quickly — practical tips',
    'Personal loan vs credit card EMI — which is cheaper',
    'Best credit cards in India for cashback and rewards',
    'How to open a PPF account online — complete process',
    'Fixed deposit interest rates comparison — top 10 banks in India',
    'UPI payment limits and charges — everything you need to know',
  ],
};

// GET method — just open in browser: http://localhost:3000/api/admin/generate-articles?password=YOUR_PASSWORD
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password') || '';

  if (password !== process.env.ADMIN_PASSWORD && password !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized. Add ?password=YOUR_ADMIN_PASSWORD to the URL' }, { status: 401 });
  }

  // Convert to same logic as POST
  return handleGeneration(password, ALL_CATEGORIES, 1);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const adminPass = body.password;

    if (adminPass !== process.env.ADMIN_PASSWORD && adminPass !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requestedCategories = body.categories || ALL_CATEGORIES;
    const articlesPerCategory = body.count || 1;
    return handleGeneration(adminPass, requestedCategories, articlesPerCategory);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed: ' + message }, { status: 500 });
  }
}

async function handleGeneration(adminPass: string, requestedCategories: string[], articlesPerCategory: number) {
  try {

    await connectDB();

    // Step 1: Clean up broken articles (titles with ```json, raw JSON, etc.)
    const brokenArticles = await Article.find({
      $or: [
        { title: { $regex: '```' } },
        { title: { $regex: '^\\s*\\{' } },
        { title: { $regex: '"title"' } },
        { title: { $regex: '"content"' } },
      ],
    });

    const deletedCount = brokenArticles.length;
    if (deletedCount > 0) {
      const ids = brokenArticles.map((a: { _id: string }) => a._id);
      await Article.deleteMany({ _id: { $in: ids } });
    }

    // Step 2: Generate articles for requested categories
    const results: string[] = [];
    let totalCreated = 0;

    for (const category of requestedCategories) {
      const topics = CATEGORY_TOPICS[category] || CATEGORY_TOPICS['investments'];

      for (let i = 0; i < articlesPerCategory; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const templateType = (i % 5) + 1;

        try {
          const generated = await generateArticle(topic, category, templateType);
          const quality = checkArticleQuality(generated.content, generated.title);

          if (!quality.passed) {
            results.push(`❌ ${category}: quality too low (${quality.score}) — ${quality.issues.join(', ')}`);
            continue;
          }

          const slug = formatSlug(generated.title);
          const existing = await Article.findOne({ slug });
          if (existing) {
            results.push(`⏭️ ${category}: duplicate slug "${slug}"`);
            continue;
          }

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
          results.push(`✅ ${category}: "${generated.title.substring(0, 60)}..."`);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : 'unknown';
          results.push(`❌ ${category}: error — ${message.substring(0, 100)}`);
          console.error(`Generate error for ${category}:`, err);
        }
      }
    }

    return NextResponse.json({
      message: `Cleaned ${deletedCount} broken articles. Created ${totalCreated} new articles.`,
      deleted: deletedCount,
      created: totalCreated,
      details: results,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Generate articles failed:', error);
    return NextResponse.json({ error: 'Failed: ' + message }, { status: 500 });
  }
}
