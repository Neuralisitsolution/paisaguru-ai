import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { fetchFinanceNews } from '@/lib/rss-fetcher';
import { generateArticle } from '@/lib/ai-engine';
import { checkArticleQuality } from '@/lib/quality-checker';
import { formatSlug, calculateReadingTime } from '@/lib/seo-helpers';

export async function GET() {
  try {
    await connectDB();
    const news = await fetchFinanceNews();
    let created = 0;

    for (const item of news.slice(0, 5)) {
      try {
        const templateType = (created % 5) + 1;
        const generated = await generateArticle(item.title, 'investments', templateType);
        const quality = checkArticleQuality(generated.content, generated.title);

        if (!quality.passed) continue;

        const slug = formatSlug(generated.title);
        const existing = await Article.findOne({ slug });
        if (existing) continue;

        await Article.create({
          title: generated.title,
          slug,
          content: generated.content,
          excerpt: generated.excerpt,
          category: 'investments',
          author: generated.author,
          metaTitle: generated.title,
          metaDescription: generated.metaDescription,
          tags: ['news', 'investments'],
          faqs: generated.faqs,
          qualityScore: quality.score,
          wordCount: generated.content.split(/\s+/).length,
          readingTime: calculateReadingTime(generated.content),
          templateType,
          status: 'review',
        });
        created++;
      } catch {
        continue;
      }
    }

    return NextResponse.json({ message: `Fetched ${news.length} news items, created ${created} articles` });
  } catch (error) {
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
