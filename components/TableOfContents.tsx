'use client';

import { useState, useEffect } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );
    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20" aria-label="Table of contents">
      <h4 className="font-heading font-bold text-sm text-gray-900 mb-3 uppercase tracking-wider">
        Table of Contents
      </h4>
      <ul className="space-y-1 border-l-2 border-gray-200">
        {headings.map(h => (
          <li key={h.id} style={{ paddingLeft: `${(h.level - 2) * 12 + 12}px` }}>
            <a
              href={`#${h.id}`}
              className={`block py-1 text-sm transition-colors border-l-2 -ml-[2px] ${
                activeId === h.id
                  ? 'text-primary-600 border-primary-600 font-medium'
                  : 'text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-400'
              }`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
