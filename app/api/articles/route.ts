import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { generateArticle } from '@/lib/ai-engine';
import { checkArticleQuality } from '@/lib/quality-checker';
import { formatSlug, calculateReadingTime } from '@/lib/seo-helpers';
import { insertAffiliateLinks } from '@/lib/affiliate-links';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'published';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const sort = searchParams.get('sort') || '-publishedAt';

    const query: Record<string, unknown> = {};
    if (status !== 'all') query.status = status;
    if (category) query.category = category;

    const articles = await Article.find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Article.countDocuments(query);

    return NextResponse.json({ articles, total, page, limit });
  } catch (error: any) {
    const message = error?.message?.includes('MONGODB_URI')
      ? 'Database not configured. Add MONGODB_URI to .env.local'
      : 'Failed to fetch articles';
    return NextResponse.json({ error: message, articles: [], total: 0, page: 1, limit: 10 }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { topic, category, templateType } = body;

    if (!topic || !category) {
      return NextResponse.json({ error: 'Topic and category are required' }, { status: 400 });
    }

    const generated = await generateArticle(topic, category, templateType || Math.ceil(Math.random() * 5));

    const qualityResult = checkArticleQuality(generated.content, generated.title);

    const slug = formatSlug(generated.title);
    const wordCount = generated.content.split(/\s+/).length;
    const readingTime = calculateReadingTime(generated.content);

    const contentWithLinks = insertAffiliateLinks(generated.content, category);

    const article = await Article.create({
      title: generated.title,
      slug,
      content: contentWithLinks,
      excerpt: generated.excerpt,
      category,
      author: generated.author,
      metaTitle: generated.title,
      metaDescription: generated.metaDescription,
      tags: [category],
      faqs: generated.faqs,
      qualityScore: qualityResult.score,
      wordCount,
      readingTime,
      templateType: templateType || 1,
      status: qualityResult.passed ? 'published' : 'draft',
      publishedAt: qualityResult.passed ? new Date() : null,
    });

    return NextResponse.json({
      article,
      quality: qualityResult,
      message: qualityResult.passed ? 'Article created and published' : 'Article quality too low, saved as draft',
    }, { status: 201 });
  } catch (error: any) {
    const message = error?.message?.includes('MONGODB_URI')
      ? 'Database not configured. Add MONGODB_URI to .env.local'
      : error?.message?.includes('API_KEY')
      ? 'Gemini API key not configured. Add GEMINI_API_KEY to .env.local'
      : 'Failed to create article: ' + (error?.message || 'Unknown error');
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
