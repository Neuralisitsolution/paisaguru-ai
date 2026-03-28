'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

export default function PPFCalculator() {
  const [annual, setAnnual] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [period, setPeriod] = useState(15);

  const result = useMemo(() => {
    const rows: { year: number; opening: number; deposit: number; interest: number; closing: number }[] = [];
    let balance = 0;
    for (let y = 1; y <= period; y++) {
      const opening = balance;
      balance += annual;
      const interest = balance * rate / 100;
      balance += interest;
      rows.push({ year: y, opening, deposit: annual, interest, closing: balance });
    }
    const totalInvested = annual * period;
    return { rows, totalInvested, maturity: balance, totalInterest: balance - totalInvested };
  }, [annual, rate, period]);

  const chartData = result.rows.map(r => ({
    year: `Yr ${r.year}`,
    invested: r.year * annual,
    value: r.closing,
  }));

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Annual Investment</span>
              <span className="text-primary-600 font-mono">{formatCurrency(annual)}</span>
            </label>
            <input type="range" min={500} max={150000} step={500} value={annual}
              onChange={e => setAnnual(Number(e.target.value))} className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Max ₹1,50,000 per year under PPF</p>
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-primary-600 font-mono">{rate}%</span>
            </label>
            <input type="range" min={5} max={10} step={0.1} value={rate}
              onChange={e => setRate(Number(e.target.value))} className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Current PPF rate: 7.1% (Q1 FY 2025-26)</p>
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Time Period</span>
              <span className="text-primary-600 font-mono">{period} years</span>
            </label>
            <input type="range" min={15} max={50} step={5} value={period}
              onChange={e => setPeriod(Number(e.target.value))} className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Min 15 years, extendable in blocks of 5 years</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">Maturity Amount</p>
            <p className="calculator-display">{formatCurrency(result.maturity)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Total Invested</p>
              <p className="font-mono font-bold text-gray-900">{formatCurrency(result.totalInvested)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Interest Earned</p>
              <p className="font-mono font-bold text-primary-600">{formatCurrency(result.totalInterest)}</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v: number) => v >= 10000000 ? `${(v/10000000).toFixed(0)}Cr` : v >= 100000 ? `${(v/100000).toFixed(0)}L` : `${(v/1000).toFixed(0)}K`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="invested" stackId="1" stroke="#d97706" fill="#fef3c7" name="Invested" />
                <Area type="monotone" dataKey="value" stroke="#059669" fill="#d1fae5" name="Total Value" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Year-wise Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Year</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Opening</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Deposit</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Interest</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Closing</th>
              </tr>
            </thead>
            <tbody>
              {result.rows.map(row => (
                <tr key={row.year} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-mono">{row.year}</td>
                  <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.opening)}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-blue-600">{formatCurrency(row.deposit)}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-primary-600">{formatCurrency(row.interest)}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-medium">{formatCurrency(row.closing)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
