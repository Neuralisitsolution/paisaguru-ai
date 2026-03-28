import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';

function handleError(error: any, action: string) {
  const message = error?.message?.includes('MONGODB_URI')
    ? 'Database not configured. Add MONGODB_URI to .env.local'
    : `Failed to ${action}: ${error?.message || 'Unknown error'}`;
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const article = await Article.findById(params.id).lean();
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    return handleError(error, 'fetch article');
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();

    const updateData: Record<string, unknown> = { ...body, lastUpdated: new Date() };
    if (body.status === 'published' && !body.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const article = await Article.findByIdAndUpdate(params.id, updateData, { new: true });
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    return handleError(error, 'update article');
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const article = await Article.findByIdAndDelete(params.id);
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Article deleted' });
  } catch (error) {
    return handleError(error, 'delete article');
  }
}
