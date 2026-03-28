'use client';

import { useState } from 'react';

export default function NewsletterInArticle() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="my-8 p-6 bg-primary-50 border border-primary-200 rounded-xl text-center">
        <p className="text-primary-700 font-semibold">You&apos;re subscribed! Check your email for the free Tax Saving Guide.</p>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 border border-primary-200 rounded-xl">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <h4 className="font-heading font-bold text-gray-900 text-lg mb-1">
            Get Weekly Finance Tips in Your Inbox
          </h4>
          <p className="text-sm text-gray-600">
            Join 50,000+ Indians who get our free Tax Saving Guide + weekly money tips. No spam, unsubscribe anytime.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 sm:w-56 px-4 py-2.5 rounded-lg border border-gray-300 text-sm outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors whitespace-nowrap disabled:opacity-50"
          >
            {loading ? '...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
