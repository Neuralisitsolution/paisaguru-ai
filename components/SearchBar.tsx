'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const popularSearches = [
  { label: 'Income Tax Calculator', href: '/calculators/income-tax' },
  { label: 'SIP Calculator', href: '/calculators/sip' },
  { label: 'EMI Calculator', href: '/calculators/emi' },
  { label: 'How to Save Tax', href: '/category/income-tax' },
  { label: 'Best Mutual Funds', href: '/category/mutual-funds' },
  { label: 'PPF Calculator', href: '/calculators/ppf' },
];

export default function SearchBar({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const filtered = popularSearches.filter(s =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="max-w-2xl mx-auto mt-20 px-4" onClick={e => e.stopPropagation()}>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center px-6 py-4 border-b">
            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search calculators, articles, topics..."
              className="flex-1 text-lg outline-none"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 ml-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {query ? 'Results' : 'Popular Searches'}
            </p>
            <div className="space-y-1">
              {filtered.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-primary-50 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </Link>
              ))}
              {query && filtered.length === 0 && (
                <p className="text-sm text-gray-500 py-4 text-center">No results found for &ldquo;{query}&rdquo;</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
