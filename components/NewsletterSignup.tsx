'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
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
      <div className="text-center py-4">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 mb-3">
          <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">You&apos;re In!</h3>
        <p className="text-gray-400 text-sm">Check your email for the free Tax Saving Guide 2025-26.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="flex-1">
        <h3 className="text-xl font-heading font-bold text-white mb-1">
          Get Free Tax Saving Guide 2025-26
        </h3>
        <p className="text-gray-400 text-sm">
          Join 50,000+ Indians who receive weekly finance tips. Unsubscribe anytime.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
        <input
          type="email"
          required
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold text-sm hover:bg-primary-700 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Get Free Guide'}
        </button>
      </form>
    </div>
  );
}
