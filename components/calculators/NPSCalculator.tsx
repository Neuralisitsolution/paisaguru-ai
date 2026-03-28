'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

export default function NPSCalculator() {
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(10);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);

  const result = useMemo(() => {
    const years = retirementAge - currentAge;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    let corpus = 0;
    const rows: { year: number; age: number; contributed: number; corpus: number }[] = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        corpus = (corpus + monthly) * (1 + monthlyRate);
      }
      rows.push({ year: y, age: currentAge + y, contributed: monthly * 12 * y, corpus });
    }

    const totalContribution = monthly * months;
    const totalReturns = corpus - totalContribution;
    const lumpsum = corpus * 0.6;
    const annuityCorpus = corpus * 0.4;
    const monthlyPension = (annuityCorpus * 0.06) / 12;

    return { corpus, totalContribution, totalReturns, lumpsum, annuityCorpus, monthlyPension, rows };
  }, [monthly, rate, currentAge, retirementAge]);

  const chartData = result.rows.filter((_, i) => i % 2 === 0 || i === result.rows.length - 1).map(r => ({
    age: `Age ${r.age}`,
    contributed: r.contributed,
    corpus: r.corpus,
  }));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Monthly Contribution</span>
              <span className="text-primary-600 font-mono">{formatCurrency(monthly)}</span>
            </label>
            <input type="range" min={500} max={100000} step={500} value={monthly}
              onChange={e => setMonthly(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Expected Return Rate (% p.a.)</span>
              <span className="text-primary-600 font-mono">{rate}%</span>
            </label>
            <input type="range" min={8} max={14} step={0.5} value={rate}
              onChange={e => setRate(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Current Age</span>
              <span className="text-primary-600 font-mono">{currentAge} years</span>
            </label>
            <input type="range" min={18} max={55} step={1} value={currentAge}
              onChange={e => setCurrentAge(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Retirement Age</span>
              <span className="text-primary-600 font-mono">{retirementAge} years</span>
            </label>
            <input type="range" min={Math.max(currentAge + 5, 55)} max={75} step={1} value={retirementAge}
              onChange={e => setRetirementAge(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">Total Corpus at Retirement</p>
            <p className="calculator-display">{formatCurrency(result.corpus)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Total Invested</p>
              <p className="font-mono font-bold text-sm text-gray-900">{formatCurrency(result.totalContribution)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Total Returns</p>
              <p className="font-mono font-bold text-sm text-primary-600">{formatCurrency(result.totalReturns)}</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between p-2.5 bg-white rounded-lg text-sm">
              <span className="text-gray-600">Lumpsum (60%)</span>
              <span className="font-mono font-medium">{formatCurrency(result.lumpsum)}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-white rounded-lg text-sm">
              <span className="text-gray-600">Annuity (40%)</span>
              <span className="font-mono font-medium">{formatCurrency(result.annuityCorpus)}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-primary-50 border border-primary-200 rounded-lg text-sm">
              <span className="text-primary-800 font-medium">Est. Monthly Pension</span>
              <span className="font-mono font-bold text-primary-600">{formatCurrency(result.monthlyPension)}</span>
            </div>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => v >= 10000000 ? `${(v/10000000).toFixed(0)}Cr` : `${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="contributed" stroke="#d97706" fill="#fef3c7" name="Invested" />
                <Area type="monotone" dataKey="corpus" stroke="#059669" fill="#d1fae5" name="Corpus" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
