'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminArticles() {
  const [authenticated, setAuthenticated] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genTopic, setGenTopic] = useState('');
  const [genCategory, setGenCategory] = useState('income-tax');
  const [showGenModal, setShowGenModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('admin_auth') === 'true') {
      setAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    fetchArticles();
  }, [authenticated, filter]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/articles?status=${filter}&limit=50`);
      const data = await res.json();
      setArticles(data.articles || []);
    } catch {}
    setLoading(false);
  };

  const updateArticle = async (id: string, updates: Record<string, unknown>) => {
    try {
      await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      fetchArticles();
    } catch {}
  };

  const generateArticle = async () => {
    if (!genTopic) return;
    setGenerating(true);
    try {
      await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: genTopic, category: genCategory }),
      });
      setShowGenModal(false);
      setGenTopic('');
      fetchArticles();
    } catch {}
    setGenerating(false);
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

  const categories = ['income-tax', 'investments', 'insurance', 'loans', 'banking', 'mutual-funds', 'budget', 'real-estate', 'cryptocurrency', 'retirement'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700">&larr; Dashboard</Link>
            <h1 className="font-heading font-bold text-xl text-gray-900">Article Management</h1>
          </div>
          <button onClick={() => setShowGenModal(true)} className="btn-primary text-sm">+ Generate Article</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {['all', 'draft', 'review', 'published', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-colors ${
                filter === f ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Articles Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Author</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Quality</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                ) : articles.length === 0 ? (
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No articles found. Generate your first article!</td></tr>
                ) : (
                  articles.map((a: any) => (
                    <tr key={a._id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900 max-w-xs truncate">{a.title}</p>
                        <p className="text-xs text-gray-500">{a.wordCount} words · {a.readingTime} min read</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">{a.category?.replace(/-/g, ' ')}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{a.author?.name}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${
                          a.qualityScore >= 80 ? 'bg-green-100 text-green-700' :
                          a.qualityScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>{a.qualityScore}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                          a.status === 'published' ? 'bg-green-100 text-green-700' :
                          a.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                          a.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{a.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {a.status !== 'published' && (
                            <button onClick={() => updateArticle(a._id, { status: 'published' })}
                              className="px-2.5 py-1 text-xs font-medium text-green-700 bg-green-50 rounded hover:bg-green-100">
                              Approve
                            </button>
                          )}
                          {a.status !== 'rejected' && (
                            <button onClick={() => updateArticle(a._id, { status: 'rejected' })}
                              className="px-2.5 py-1 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100">
                              Reject
                            </button>
                          )}
                          <button onClick={() => updateArticle(a._id, { isExpertReviewed: !a.isExpertReviewed })}
                            className={`px-2.5 py-1 text-xs font-medium rounded ${
                              a.isExpertReviewed ? 'text-primary-700 bg-primary-50' : 'text-gray-500 bg-gray-50'
                            }`}>
                            {a.isExpertReviewed ? '✓ Expert' : 'Mark Expert'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Generate Modal */}
      {showGenModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="font-heading font-bold text-lg mb-4">Generate New Article</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Topic</label>
                <input type="text" value={genTopic} onChange={e => setGenTopic(e.target.value)}
                  placeholder="e.g., How to save tax on ₹15 lakh salary"
                  className="input-field" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Category</label>
                <select value={genCategory} onChange={e => setGenCategory(e.target.value)} className="input-field">
                  {categories.map(c => (
                    <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button onClick={generateArticle} disabled={generating} className="btn-primary flex-1 text-sm">
                  {generating ? 'Generating...' : 'Generate'}
                </button>
                <button onClick={() => setShowGenModal(false)} className="btn-outline flex-1 text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
