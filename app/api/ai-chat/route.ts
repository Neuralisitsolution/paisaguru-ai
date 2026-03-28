import { NextResponse } from 'next/server';
import { chatResponse } from '@/lib/ai-engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const reply = await chatResponse(message, history);
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({
      reply: 'I apologize, but I\'m unable to process your request right now. Please try again later or browse our articles and calculators for finance information.',
    });
  }
}
