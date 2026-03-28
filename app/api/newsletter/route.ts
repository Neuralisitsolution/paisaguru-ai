import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, interests } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed!' });
    }

    await Newsletter.create({
      email,
      name: name || '',
      interests: interests || [],
      isActive: true,
    });

    // Send welcome email via Brevo SMTP (non-blocking)
    sendWelcomeEmail(email, name).catch((err) => {
      console.error('Failed to send welcome email:', err.message);
    });

    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch (error: any) {
    const message = error?.message?.includes('MONGODB_URI')
      ? 'Database not configured. Add MONGODB_URI to .env.local'
      : 'Failed to subscribe: ' + (error?.message || 'Unknown error');
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
