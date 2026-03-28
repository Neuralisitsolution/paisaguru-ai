'use client';

import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizComponentProps {
  title: string;
  questions: Question[];
}

export default function QuizComponent({ title, questions }: QuizComponentProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (idx === questions[current].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const shareText = `I scored ${score}/${questions.length} (${percentage}%) on the ${title} quiz on PaisaGuru! Can you beat my score?`;

    return (
      <div className="card p-8 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl font-heading font-bold text-primary-600">{percentage}%</span>
        </div>
        <h3 className="font-heading font-bold text-2xl text-gray-900 mb-2">Quiz Complete!</h3>
        <p className="text-gray-600 mb-4">
          You scored <strong className="text-primary-600">{score}</strong> out of <strong>{questions.length}</strong>
        </p>
        <div className="mb-6">
          {percentage >= 80 ? (
            <span className="badge-expert">Finance Expert!</span>
          ) : percentage >= 50 ? (
            <span className="px-3 py-1 bg-secondary-100 text-secondary-800 text-sm font-medium rounded-full">Good Knowledge!</span>
          ) : (
            <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full">Keep Learning!</span>
          )}
        </div>
        <div className="flex gap-2 justify-center">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            Share on WhatsApp
          </a>
          <button
            onClick={() => {
              setCurrent(0); setSelected(null); setShowExplanation(false);
              setScore(0); setFinished(false); setAnswers([]);
            }}
            className="btn-outline text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="card p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg text-gray-900">{title}</h3>
        <span className="text-sm text-gray-500 font-medium">
          {current + 1} / {questions.length}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div
          className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>
      <p className="text-gray-800 font-medium mb-4">{q.question}</p>
      <div className="space-y-2 mb-4">
        {q.options.map((opt, idx) => {
          let cls = 'border border-gray-200 hover:border-primary-300 hover:bg-primary-50';
          if (showExplanation) {
            if (idx === q.correctAnswer) cls = 'border-2 border-primary-600 bg-primary-50';
            else if (idx === selected && idx !== q.correctAnswer) cls = 'border-2 border-red-500 bg-red-50';
            else cls = 'border border-gray-200 opacity-60';
          } else if (selected === idx) {
            cls = 'border-2 border-primary-600 bg-primary-50';
          }
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showExplanation}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${cls}`}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            <strong>Explanation:</strong> {q.explanation}
          </p>
        </div>
      )}
      {showExplanation && (
        <button onClick={handleNext} className="btn-primary w-full text-sm">
          {current + 1 >= questions.length ? 'View Results' : 'Next Question'}
        </button>
      )}
    </div>
  );
}
