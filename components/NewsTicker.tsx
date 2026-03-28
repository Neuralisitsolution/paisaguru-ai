'use client';

import Link from 'next/link';

interface NewsItem {
  title: string;
  link: string;
}

const defaultNews: NewsItem[] = [
  { title: 'Sensex surges 500 points on strong FII inflows', link: '#' },
  { title: 'RBI keeps repo rate unchanged at 6.5% in latest MPC meeting', link: '#' },
  { title: 'New tax regime benefits: Standard deduction raised to ₹75,000', link: '#' },
  { title: 'Gold prices hit all-time high of ₹78,000 per 10 grams', link: '#' },
  { title: 'SEBI introduces new mutual fund lite regulations for passive funds', link: '#' },
];

export default function NewsTicker({ items = defaultNews }: { items?: NewsItem[] }) {
  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div className="container-custom flex items-center gap-4">
        <span className="flex-shrink-0 px-2.5 py-0.5 bg-red-600 text-white text-xs font-bold rounded animate-pulse">
          BREAKING
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.link}
                className="inline-block text-sm text-gray-300 hover:text-white mx-8"
              >
                {item.title}
                {i < items.length - 1 && <span className="ml-8 text-gray-600">|</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
