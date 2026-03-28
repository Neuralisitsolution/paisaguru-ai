'use client';

import { useState, useMemo } from 'react';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

type Compounding = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(7.1);
  const [tenureYears, setTenureYears] = useState(5);
  const [compounding, setCompounding] = useState<Compounding>('quarterly');

  const compoundFreq: Record<Compounding, number> = { monthly: 12, quarterly: 4, 'half-yearly': 2, yearly: 1 };

  const calculate = (comp: Compounding) => {
    const n = compoundFreq[comp];
    const t = tenureYears;
    const r = rate / 100;
    const maturity = principal * Math.pow(1 + r / n, n * t);
    return { maturity, interest: maturity - principal };
  };

  const result = useMemo(() => calculate(compounding), [principal, rate, tenureYears, compounding]);

  const comparison = useMemo(() => {
    return (Object.keys(compoundFreq) as Compounding[]).map(c => {
      const calc = calculate(c);
      return { type: c, ...calc };
    });
  }, [principal, rate, tenureYears]);

  const yearlyBreakdown = useMemo(() => {
    const n = compoundFreq[compounding];
    const r = rate / 100;
    const rows: { year: number; opening: number; interest: number; closing: number }[] = [];
    let balance = principal;
    for (let y = 1; y <= tenureYears; y++) {
      const closing = balance * Math.pow(1 + r / n, n);
      rows.push({ year: y, opening: balance, interest: closing - balance, closing });
      balance = closing;
    }
    return rows;
  }, [principal, rate, tenureYears, compounding]);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Principal Amount</span>
              <span className="text-primary-600 font-mono">{formatCurrency(principal)}</span>
            </label>
            <input type="range" min={10000} max={10000000} step={10000} value={principal}
              onChange={e => setPrincipal(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-primary-600 font-mono">{rate}%</span>
            </label>
            <input type="range" min={1} max={10} step={0.1} value={rate}
              onChange={e => setRate(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Tenure</span>
              <span className="text-primary-600 font-mono">{tenureYears} years</span>
            </label>
            <input type="range" min={1} max={10} step={1} value={tenureYears}
              onChange={e => setTenureYears(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(compoundFreq) as Compounding[]).map(c => (
                <button key={c} onClick={() => setCompounding(c)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    compounding === c ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 mb-1">Maturity Amount</p>
            <p className="calculator-display">{formatCurrency(result.maturity)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Principal</p>
              <p className="font-mono font-bold text-gray-900">{formatCurrency(principal)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Interest Earned</p>
              <p className="font-mono font-bold text-primary-600">{formatCurrency(result.interest)}</p>
            </div>
          </div>
          <h4 className="font-heading font-semibold text-sm text-gray-900 mb-3">Compounding Comparison</h4>
          <div className="space-y-2">
            {comparison.map(c => (
              <div key={c.type} className={`flex justify-between p-2.5 rounded-lg text-sm ${
                c.type === compounding ? 'bg-primary-50 border border-primary-200' : 'bg-white'
              }`}>
                <span className="capitalize font-medium">{c.type}</span>
                <span className="font-mono">{formatCurrency(c.maturity)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Year-wise Growth</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Year</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Opening Balance</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Interest</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {yearlyBreakdown.map(row => (
                <tr key={row.year} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-mono">{row.year}</td>
                  <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.opening)}</td>
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
