import type { Metadata } from 'next';
import Link from 'next/link';
import QuizComponent from '@/components/QuizComponent';

const defaultQuestions = [
  { question: 'What is the maximum deduction allowed under Section 80C of the Income Tax Act?', options: ['₹1,00,000', '₹1,50,000', '₹2,00,000', '₹2,50,000'], correctAnswer: 1, explanation: 'Section 80C allows a maximum deduction of ₹1,50,000 per financial year for investments in PPF, ELSS, EPF, LIC premium, etc.' },
  { question: 'What is the current PPF interest rate (FY 2025-26)?', options: ['6.5%', '7.1%', '7.5%', '8.0%'], correctAnswer: 1, explanation: 'The PPF interest rate for Q1 FY 2025-26 is 7.1% per annum, compounded annually.' },
  { question: 'Which of these is NOT a tax-saving instrument under Section 80C?', options: ['PPF', 'ELSS', 'NPS (80CCD 1B)', 'EPF'], correctAnswer: 2, explanation: 'NPS deduction under 80CCD(1B) is a separate section that provides additional ₹50,000 deduction over and above Section 80C limit.' },
  { question: 'What is the lock-in period for ELSS mutual funds?', options: ['1 year', '3 years', '5 years', '7 years'], correctAnswer: 1, explanation: 'ELSS (Equity Linked Savings Scheme) has the shortest lock-in period of 3 years among all Section 80C investments.' },
  { question: 'What percentage of salary is contributed to EPF by the employer?', options: ['8%', '10%', '12%', '15%'], correctAnswer: 2, explanation: 'Both employer and employee contribute 12% of basic salary to EPF. Of the employer\'s 12%, 8.33% goes to EPS and 3.67% to EPF.' },
  { question: 'What is the standard deduction for salaried individuals under the new tax regime (FY 2025-26)?', options: ['₹50,000', '₹60,000', '₹75,000', '₹1,00,000'], correctAnswer: 2, explanation: 'Under the new tax regime for FY 2025-26, the standard deduction has been increased to ₹75,000 from ₹50,000.' },
  { question: 'What is the health and education cess rate on income tax in India?', options: ['2%', '3%', '4%', '5%'], correctAnswer: 2, explanation: 'A 4% Health and Education Cess is levied on the total income tax amount (including surcharge if applicable).' },
  { question: 'What is the maximum amount exempt from tax on gratuity for private employees?', options: ['₹10 lakh', '₹15 lakh', '₹20 lakh', '₹25 lakh'], correctAnswer: 2, explanation: 'As per current tax rules, gratuity up to ₹20 lakh is exempt from income tax for private sector employees.' },
  { question: 'Which city is NOT considered a metro city for HRA calculation?', options: ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata'], correctAnswer: 2, explanation: 'Only Delhi, Mumbai, Kolkata, and Chennai are classified as metro cities for HRA exemption calculation. Bangalore, despite being a major city, is classified as non-metro.' },
  { question: 'What is SIP in mutual funds?', options: ['Single Investment Plan', 'Systematic Investment Plan', 'Standard Investment Protocol', 'Strategic Investment Plan'], correctAnswer: 1, explanation: 'SIP stands for Systematic Investment Plan, which allows investors to invest a fixed amount regularly in mutual funds, typically monthly.' },
];

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const title = params.id === 'daily' ? 'Daily Finance Quiz' : `${params.id.replace(/-/g, ' ')} Quiz`;
  return {
    title: `${title} | PaisaGuru`,
    description: `Test your knowledge with our ${title}. 10 questions with detailed explanations.`,
  };
}

export default function QuizPage({ params }: { params: { id: string } }) {
  const title = params.id === 'daily'
    ? 'Daily Finance Quiz'
    : `${params.id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Quiz`;

  return (
    <div className="container-custom py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/quiz" className="hover:text-primary-600">Quiz</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{title}</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <QuizComponent title={title} questions={defaultQuestions} />

        <div className="mt-8">
          <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">More Quizzes</h3>
          <div className="grid grid-cols-2 gap-4">
            {['income-tax', 'investments', 'insurance', 'mutual-funds'].filter(q => q !== params.id).slice(0, 4).map(q => (
              <Link key={q} href={`/quiz/${q}`} className="card p-4 hover:border-primary-200">
                <h4 className="font-heading font-semibold text-sm capitalize">{q.replace(/-/g, ' ')} Quiz</h4>
                <p className="text-xs text-gray-500 mt-1">10 questions</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
