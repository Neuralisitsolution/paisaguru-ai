import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import { generateArticle } from '@/lib/ai-engine';
import { checkArticleQuality } from '@/lib/quality-checker';
import { formatSlug, calculateReadingTime } from '@/lib/seo-helpers';

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
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
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

    const article = await Article.create({
      title: generated.title,
      slug,
      content: generated.content,
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
      status: qualityResult.passed ? 'review' : 'draft',
    });

    return NextResponse.json({
      article,
      quality: qualityResult,
      message: qualityResult.passed ? 'Article created and sent for review' : 'Article quality too low, saved as draft',
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}
