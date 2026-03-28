'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

const formatCompact = (n: number): string => {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(1) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(1) + ' L';
  if (n >= 1000) return '₹' + (n / 1000).toFixed(1) + ' K';
  return '₹' + n.toFixed(0);
};

export default function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflationAdjusted, setInflationAdjusted] = useState(false);
  const inflationRate = 6;

  const results = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const totalInvested = monthly * n;

    // FV = P × [(1+r)^n - 1] / r × (1+r)
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const estimatedReturns = fv - totalInvested;

    // Year-by-year data
    const yearData = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const invested = monthly * m;
      const value = monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
      const returns = value - invested;

      let adjustedValue = value;
      if (inflationAdjusted) {
        adjustedValue = value / Math.pow(1 + inflationRate / 100, y);
      }

      yearData.push({
        year: `Year ${y}`,
        invested,
        returns,
        totalValue: Math.round(value),
        adjustedValue: Math.round(adjustedValue),
      });
    }

    let displayTotal = fv;
    if (inflationAdjusted) {
      displayTotal = fv / Math.pow(1 + inflationRate / 100, years);
    }

    return { totalInvested, estimatedReturns, totalValue: fv, displayTotal, yearData };
  }, [monthly, rate, years, inflationAdjusted]);

  const chartData = results.yearData.map((d) => ({
    name: d.year,
    Invested: d.invested,
    Value: inflationAdjusted ? d.adjustedValue : d.totalValue,
  }));

  return (
    <div className="space-y-8">
      {/* Inputs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">SIP Details</h3>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Monthly Investment</label>
              <span className="text-sm font-bold text-primary-600">{formatCurrency(monthly)}</span>
            </div>
            <input type="range" min={500} max={100000} step={500} value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Expected Return Rate (p.a.)</label>
              <span className="text-sm font-bold text-primary-600">{rate}%</span>
            </div>
            <input type="range" min={1} max={30} step={0.5} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Time Period</label>
              <span className="text-sm font-bold text-primary-600">{years} years</span>
            </div>
            <input type="range" min={1} max={40} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 yr</span>
              <span>40 yrs</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={inflationAdjusted} onChange={(e) => setInflationAdjusted(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
            <span className="text-sm text-gray-700">Adjust for inflation (6% p.a.)</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Invested</p>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(results.totalInvested)}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-center">
          <p className="text-sm text-gray-600 mb-1">Estimated Returns</p>
          <p className="text-2xl font-bold text-primary-600">{formatCurrency(results.estimatedReturns)}</p>
        </div>
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl shadow-sm p-5 text-center text-white">
          <p className="text-sm opacity-90 mb-1">{inflationAdjusted ? 'Inflation-Adjusted Value' : 'Total Value'}</p>
          <p className="text-2xl font-bold">{formatCurrency(results.displayTotal)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCompact(v)} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value: number) => formatCurrency(value)} />
              <Area type="monotone" dataKey="Value" stroke="#059669" fill="url(#colorValue)" strokeWidth={2} />
              <Area type="monotone" dataKey="Invested" stroke="#d97706" fill="url(#colorInvested)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Year-by-Year Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Year-by-Year Breakdown</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-semibold">Year</th>
              <th className="text-right p-3 font-semibold">Invested Amount</th>
              <th className="text-right p-3 font-semibold">Returns</th>
              <th className="text-right p-3 font-semibold">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {results.yearData.map((row, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="p-3">{row.year}</td>
                <td className="text-right p-3">{formatCurrency(row.invested)}</td>
                <td className="text-right p-3 text-primary-600">{formatCurrency(row.returns)}</td>
                <td className="text-right p-3 font-medium">{formatCurrency(inflationAdjusted ? row.adjustedValue : row.totalValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
