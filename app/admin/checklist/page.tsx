'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CheckItem {
  label: string;
  status: 'pass' | 'fail' | 'pending';
  auto: boolean;
  detail?: string;
}

export default function AdminChecklist() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checklist, setChecklist] = useState<CheckItem[]>([
    { label: 'Minimum 50 articles published', status: 'pending', auto: true },
    { label: 'All articles above 1000 words', status: 'pending', auto: true },
    { label: 'About page complete with team info', status: 'pass', auto: false, detail: '/about page created' },
    { label: 'Contact page with working form', status: 'pass', auto: false, detail: '/contact page created' },
    { label: 'Privacy Policy page (GDPR compliant)', status: 'pass', auto: false, detail: '/privacy-policy page created' },
    { label: 'Terms of Service page', status: 'pass', auto: false, detail: '/terms page created' },
    { label: 'Financial Disclaimer page', status: 'pass', auto: false, detail: '/disclaimer page created' },
    { label: 'Sitemap submitted to Google', status: 'pending', auto: false },
    { label: 'Domain minimum 30 days old', status: 'pending', auto: false },
    { label: 'HTTPS enabled', status: 'pending', auto: false },
    { label: 'Mobile responsive (Lighthouse 90+)', status: 'pending', auto: false },
    { label: 'Page speed score 90+ (Lighthouse)', status: 'pending', auto: false },
    { label: 'No broken links', status: 'pending', auto: false },
    { label: 'Author bios on all articles', status: 'pending', auto: true },
    { label: 'No copyright content', status: 'pending', auto: false },
    { label: 'Consistent publishing schedule', status: 'pending', auto: false },
  ]);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const autoCheck = async () => {
      try {
        const res = await fetch('/api/articles?status=published&limit=1');
        const data = await res.json();
        const count = data.total || 0;
        setChecklist(prev => prev.map(item => {
          if (item.label.includes('50 articles')) {
            return { ...item, status: count >= 50 ? 'pass' : 'fail', detail: `${count}/50 articles published` };
          }
          return item;
        }));
      } catch {}
    };
    autoCheck();
  }, [authenticated]);

  const toggleStatus = (idx: number) => {
    setChecklist(prev => prev.map((item, i) => {
      if (i !== idx || item.auto) return item;
      const next = item.status === 'pass' ? 'fail' : item.status === 'fail' ? 'pending' : 'pass';
      return { ...item, status: next };
    }));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card p-8">
          <p className="text-gray-600">Please login from the <Link href="/admin" className="text-primary-600 hover:underline">admin dashboard</Link> first.</p>
        </div>
      </div>
    );
  }

  const passed = checklist.filter(c => c.status === 'pass').length;
  const percentage = Math.round((passed / checklist.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">&larr; Dashboard</Link>
            <h1 className="font-heading font-bold text-xl text-gray-900">AdSense Readiness Checklist</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-bold text-lg">Overall Readiness</h2>
            <span className={`text-2xl font-heading font-bold ${
              percentage >= 80 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`h-3 rounded-full transition-all duration-500 ${
              percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`} style={{ width: `${percentage}%` }} />
          </div>
          <p className="text-sm text-gray-500 mt-2">{passed} of {checklist.length} requirements met</p>
        </div>

        {/* Checklist */}
        <div className="card divide-y">
          {checklist.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleStatus(idx)}
                  disabled={item.auto}
                  className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                    item.status === 'pass' ? 'bg-green-500 text-white' :
                    item.status === 'fail' ? 'bg-red-500 text-white' :
                    'bg-gray-200 text-gray-400'
                  } ${!item.auto ? 'cursor-pointer hover:opacity-80' : ''}`}
                >
                  {item.status === 'pass' ? '✓' : item.status === 'fail' ? '✗' : '?'}
                </button>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.label}</p>
                  {item.detail && <p className="text-xs text-gray-500">{item.detail}</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.auto && <span className="text-xs text-gray-400">Auto-checked</span>}
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                  item.status === 'pass' ? 'bg-green-100 text-green-700' :
                  item.status === 'fail' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-600'
                }`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>Tip:</strong> Apply for Google AdSense only when readiness is above 90%. Most rejections happen because of insufficient content or missing legal pages.
        </div>
      </div>
    </div>
  );
}
