import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Quiz from '@/models/Quiz';
import { generateQuiz } from '@/lib/ai-engine';

export async function GET(request: Request) {
  // Protect cron endpoint
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const categories = ['income-tax', 'investments', 'insurance', 'banking', 'mutual-funds'];
    const category = categories[Math.floor(Math.random() * categories.length)];

    const questions = await generateQuiz(category, 10);

    const quiz = await Quiz.create({
      title: `Daily Finance Quiz - ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      slug: `daily-quiz-${Date.now()}`,
      category,
      questions,
      difficulty: 'medium',
      totalQuestions: questions.length,
      status: 'published',
    });

    return NextResponse.json({ message: 'Daily quiz generated', quiz });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
