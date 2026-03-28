import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';
import { generateQuiz } from '@/lib/ai-engine';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: Record<string, unknown> = { status: 'published' };
    if (category) query.category = category;

    const quizzes = await Quiz.find(query).sort('-createdAt').limit(limit).lean();
    return NextResponse.json(quizzes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quizzes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { category = 'general', count = 10 } = body;

    const questions = await generateQuiz(category, count);

    const quiz = await Quiz.create({
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Finance Quiz`,
      slug: `${category}-quiz-${Date.now()}`,
      category,
      questions,
      difficulty: 'medium',
      totalQuestions: questions.length,
      status: 'published',
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create quiz' }, { status: 500 });
  }
}
