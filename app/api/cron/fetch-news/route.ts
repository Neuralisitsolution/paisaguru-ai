import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { fetchFinanceNews } from '@/lib/rss-fetcher';
import { generateArticle } from '@/lib/ai-engine';
import { checkArticleQuality } from '@/lib/quality-checker';
import { formatSlug, calculateReadingTime } from '@/lib/seo-helpers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const news = await fetchFinanceNews();
    console.log(`Fetched ${news.length} news items`);
    let created = 0;
    const errors: string[] = [];

    for (const item of news.slice(0, 5)) {
      try {
        console.log(`Generating article for: ${item.title}`);
        const templateType = (created % 5) + 1;
        const generated = await generateArticle(item.title, 'investments', templateType);

        console.log(`Generated article: "${generated.title}" (${generated.content.split(/\s+/).length} words)`);

        const quality = checkArticleQuality(generated.content, generated.title);
        console.log(`Quality score: ${quality.score}, passed: ${quality.passed}`);

        if (!quality.passed) {
          errors.push(`Quality failed for "${generated.title}": score=${quality.score}`);
          continue;
        }

        const slug = formatSlug(generated.title);
        const existing = await Article.findOne({ slug });
        if (existing) {
          console.log(`Article already exists: ${slug}`);
          continue;
        }

        // Fallbacks to prevent validation errors
        const excerpt = generated.excerpt
          || generated.content.substring(0, 200).replace(/\n/g, ' ').trim() + '...';

        const metaDescription = generated.metaDescription
          || generated.excerpt?.substring(0, 160)
          || generated.title.substring(0, 160);

        await Article.create({
          title: generated.title,
          slug,
          content: generated.content,
          excerpt,
          category: 'investments',
          author: generated.author,
          metaTitle: generated.title,
          metaDescription,
          tags: ['news', 'investments'],
          faqs: generated.faqs || [],
          qualityScore: quality.score,
          wordCount: generated.content.split(/\s+/).length,
          readingTime: calculateReadingTime(generated.content),
          templateType,
          status: 'review',
        });

        created++;
        console.log(`✅ Created article: ${slug}`);
      } catch (err: any) {
        const msg = err?.message || String(err);
        console.error(`❌ Article generation error:`, msg);
        errors.push(msg);
        continue;
      }
    }

    return NextResponse.json({
      message: `Fetched ${news.length} news items, created ${created} articles`,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error: any) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Cron job failed', detail: error?.message }, { status: 500 });
  }
}
