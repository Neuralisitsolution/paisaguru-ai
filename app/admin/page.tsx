'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [stats, setStats] = useState({ total: 0, published: 0, review: 0, draft: 0 });
  const [recentArticles, setRecentArticles] = useState<any[]>([]);
  const [dbError, setDbError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    const fetchData = async () => {
      try {
        const [allRes, pubRes, revRes, draftRes] = await Promise.all([
          fetch('/api/articles?status=all&limit=5'),
          fetch('/api/articles?status=published&limit=1'),
          fetch('/api/articles?status=review&limit=1'),
          fetch('/api/articles?status=draft&limit=1'),
        ]);
        const all = await allRes.json();
        const pub = await pubRes.json();
        const rev = await revRes.json();
        const dr = await draftRes.json();
        if (all.error) {
          setDbError(all.error);
        } else {
          setStats({ total: all.total || 0, published: pub.total || 0, review: rev.total || 0, draft: dr.total || 0 });
          setRecentArticles(all.articles || []);
        }
      } catch {
        setDbError('Cannot connect to the server. Make sure .env.local is configured.');
      }
    };
    fetchData();
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'paisaguru2025')) {
      setAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="card p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white text-2xl font-bold">₹</span>
            </div>
            <h1 className="font-heading font-bold text-xl text-gray-900">PaisaGuru Admin</h1>
            <p className="text-sm text-gray-500">Enter password to continue</p>
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="input-field mb-4"
          />
          <button type="submit" className="btn-primary w-full">Login</button>
        </form>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Articles', value: stats.total, color: 'bg-blue-50 text-blue-600' },
    { label: 'Published', value: stats.published, color: 'bg-green-50 text-green-600' },
    { label: 'In Review', value: stats.review, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Drafts', value: stats.draft, color: 'bg-gray-50 text-gray-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-heading font-bold text-xl text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-3">
            <Link href="/admin/articles" className="btn-primary text-sm">Manage Articles</Link>
            <Link href="/admin/checklist" className="btn-outline text-sm">AdSense Checklist</Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">View Site</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {dbError && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-heading font-bold text-yellow-800 mb-2">Setup Required</h3>
            <p className="text-sm text-yellow-700 mb-3">{dbError}</p>
            <div className="text-sm text-yellow-800 space-y-1">
              <p><strong>To get started:</strong></p>
              <p>1. Copy <code className="bg-yellow-100 px-1 rounded">.env.example</code> to <code className="bg-yellow-100 px-1 rounded">.env.local</code></p>
              <p>2. Add your <strong>MongoDB Atlas</strong> connection string (free at cloud.mongodb.com)</p>
              <p>3. Add your <strong>Gemini API</strong> key (free at aistudio.google.com)</p>
              <p>4. Restart the dev server with <code className="bg-yellow-100 px-1 rounded">npm run dev</code></p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {statCards.map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-sm text-gray-500 mb-1">{s.label}</p>
              <p className={`text-3xl font-heading font-bold ${s.color.split(' ')[1]}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/admin/articles" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
                <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">+</span>
                <div>
                  <p className="font-medium text-sm text-gray-900">Generate New Article</p>
                  <p className="text-xs text-gray-500">Use AI to create a new finance article</p>
                </div>
              </Link>
              <Link href="/admin/checklist" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">✓</span>
                <div>
                  <p className="font-medium text-sm text-gray-900">AdSense Readiness Check</p>
                  <p className="text-xs text-gray-500">View checklist for AdSense approval</p>
                </div>
              </Link>
              <Link href="/admin/analytics" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors">
                <span className="w-8 h-8 bg-secondary-100 rounded-lg flex items-center justify-center text-secondary-600">📊</span>
                <div>
                  <p className="font-medium text-sm text-gray-900">View Analytics</p>
                  <p className="text-xs text-gray-500">Article performance and traffic data</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-heading font-bold text-lg text-gray-900 mb-4">Recent Articles</h2>
            {recentArticles.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No articles yet. Generate your first article!</p>
            ) : (
              <div className="space-y-3">
                {recentArticles.map((a: any) => (
                  <div key={a._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{a.title}</p>
                      <p className="text-xs text-gray-500">{a.category} · Score: {a.qualityScore}</p>
                    </div>
                    <span className={`ml-3 px-2 py-0.5 text-xs font-medium rounded-full ${
                      a.status === 'published' ? 'bg-green-100 text-green-700' :
                      a.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{a.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
