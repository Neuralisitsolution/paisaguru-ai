'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminAnalytics() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="card p-8">
          <p className="text-gray-600">Please login from the <Link href="/admin" className="text-primary-600 hover:underline">admin dashboard</Link> first.</p>
        </div>
      </div>
    );
  }

  const mockData = {
    topArticles: [
      { title: 'How to Save Income Tax for Salaried Employees', views: 15420, shares: 342, score: 92 },
      { title: 'New vs Old Tax Regime Comparison 2025', views: 20150, shares: 518, score: 88 },
      { title: 'Best SIP Plans for Beginners in 2025', views: 12340, shares: 267, score: 85 },
      { title: 'Section 80C Complete Guide', views: 8930, shares: 189, score: 90 },
      { title: 'How to File ITR Online Step by Step', views: 25600, shares: 423, score: 87 },
    ],
    categoryStats: [
      { category: 'Income Tax', count: 12, views: 85000 },
      { category: 'Investments', count: 8, views: 45000 },
      { category: 'Insurance', count: 6, views: 23000 },
      { category: 'Mutual Funds', count: 7, views: 38000 },
      { category: 'Banking', count: 5, views: 15000 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">&larr; Dashboard</Link>
          <h1 className="font-heading font-bold text-xl text-gray-900">Analytics</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Views', value: '2,06,000', color: 'text-blue-600' },
            { label: 'Total Shares', value: '1,739', color: 'text-green-600' },
            { label: 'Avg. Quality Score', value: '88.4', color: 'text-primary-600' },
            { label: 'Avg. Reading Time', value: '7.2 min', color: 'text-secondary-600' },
          ].map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-sm text-gray-500">{s.label}</p>
              <p className={`text-2xl font-heading font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Top Articles */}
        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Top Performing Articles</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="pb-3 text-left text-xs font-semibold text-gray-600">Article</th>
                <th className="pb-3 text-right text-xs font-semibold text-gray-600">Views</th>
                <th className="pb-3 text-right text-xs font-semibold text-gray-600">Shares</th>
                <th className="pb-3 text-right text-xs font-semibold text-gray-600">Quality</th>
              </tr>
            </thead>
            <tbody>
              {mockData.topArticles.map((a, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="py-3 text-sm text-gray-900">{a.title}</td>
                  <td className="py-3 text-sm text-right font-mono text-gray-600">{a.views.toLocaleString('en-IN')}</td>
                  <td className="py-3 text-sm text-right font-mono text-gray-600">{a.shares}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-0.5 text-xs font-bold rounded ${
                      a.score >= 85 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{a.score}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Category Distribution */}
        <div className="card p-6">
          <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Category Distribution</h2>
          <div className="space-y-3">
            {mockData.categoryStats.map(c => (
              <div key={c.category} className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 w-32">{c.category}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div className="bg-primary-500 h-3 rounded-full" style={{ width: `${(c.views / 85000) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-gray-500 w-20 text-right">{c.count} articles</span>
                <span className="text-xs font-mono text-gray-500 w-24 text-right">{(c.views / 1000).toFixed(0)}K views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
