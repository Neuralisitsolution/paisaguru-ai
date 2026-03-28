import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Finance Quiz - Test Your Financial Knowledge | PaisaGuru',
  description: 'Test your personal finance knowledge with fun quizzes on income tax, investments, insurance, banking, and mutual funds. Win certificates!',
};

const quizCategories = [
  { name: 'Income Tax', slug: 'income-tax', description: 'Test your knowledge of Indian income tax rules, deductions, and filing.', questions: 10, icon: '🧾' },
  { name: 'Investments', slug: 'investments', description: 'How well do you understand stocks, mutual funds, and other investments?', questions: 10, icon: '📈' },
  { name: 'Insurance', slug: 'insurance', description: 'Test your knowledge of life, health, and vehicle insurance in India.', questions: 10, icon: '🛡️' },
  { name: 'Banking', slug: 'banking', description: 'How well do you know Indian banking products and services?', questions: 10, icon: '🏦' },
  { name: 'Mutual Funds', slug: 'mutual-funds', description: 'Test your understanding of mutual fund types, NAV, and SIP concepts.', questions: 10, icon: '💰' },
];

export default function QuizHub() {
  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Quiz</span>
      </nav>

      <div className="text-center mb-10">
        <h1 className="section-title">Finance Quiz Arena</h1>
        <p className="section-subtitle max-w-2xl mx-auto">
          Test your personal finance knowledge, learn new concepts, and challenge your friends!
        </p>
      </div>

      {/* Daily Quiz Featured */}
      <div className="card p-8 mb-10 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-center">
        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">Daily Challenge</span>
        <h2 className="font-heading font-bold text-2xl mb-2">Today&apos;s Finance Quiz</h2>
        <p className="text-primary-100 mb-6 max-w-lg mx-auto">10 questions across all finance topics. Updated daily. Score 80%+ to earn a certificate!</p>
        <Link href="/quiz/daily" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Start Daily Quiz
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Category Quizzes */}
      <h2 className="font-heading font-bold text-xl text-gray-900 mb-6">Category Quizzes</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {quizCategories.map(q => (
          <Link key={q.slug} href={`/quiz/${q.slug}`} className="card p-6 group hover:border-primary-200">
            <span className="text-3xl mb-3 block">{q.icon}</span>
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">{q.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{q.description}</p>
            <span className="text-xs text-gray-500">{q.questions} Questions</span>
          </Link>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="card p-6">
        <h2 className="font-heading font-bold text-xl text-gray-900 mb-4">Leaderboard</h2>
        <div className="space-y-3">
          {[
            { rank: 1, name: 'Arun M.', score: 980, badge: '🥇' },
            { rank: 2, name: 'Sneha P.', score: 940, badge: '🥈' },
            { rank: 3, name: 'Vikram S.', score: 920, badge: '🥉' },
            { rank: 4, name: 'Deepa K.', score: 890, badge: '' },
            { rank: 5, name: 'Rohit A.', score: 870, badge: '' },
          ].map(p => (
            <div key={p.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                  {p.badge || p.rank}
                </span>
                <span className="font-medium text-sm text-gray-900">{p.name}</span>
              </div>
              <span className="font-mono font-bold text-sm text-primary-600">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
