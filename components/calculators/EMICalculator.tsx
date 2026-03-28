'use client';

import { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

export default function EMICalculator() {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  const result = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - principal;

    const schedule: { year: number; principalPaid: number; interestPaid: number; balance: number }[] = [];
    let balance = principal;
    for (let y = 1; y <= tenure; y++) {
      let yearPrincipal = 0;
      let yearInterest = 0;
      for (let m = 0; m < 12; m++) {
        const monthInterest = balance * r;
        const monthPrincipal = emi - monthInterest;
        yearPrincipal += monthPrincipal;
        yearInterest += monthInterest;
        balance -= monthPrincipal;
      }
      schedule.push({ year: y, principalPaid: yearPrincipal, interestPaid: yearInterest, balance: Math.max(0, balance) });
    }

    return { emi, totalPayment, totalInterest, schedule };
  }, [principal, rate, tenure]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#059669' },
    { name: 'Interest', value: result.totalInterest, color: '#d97706' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Loan Amount</span>
              <span className="text-primary-600 font-mono">{formatCurrency(principal)}</span>
            </label>
            <input type="range" min={100000} max={100000000} step={100000} value={principal}
              onChange={e => setPrincipal(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Interest Rate (% p.a.)</span>
              <span className="text-primary-600 font-mono">{rate}%</span>
            </label>
            <input type="range" min={1} max={20} step={0.1} value={rate}
              onChange={e => setRate(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Loan Tenure</span>
              <span className="text-primary-600 font-mono">{tenure} years</span>
            </label>
            <input type="range" min={1} max={30} step={1} value={tenure}
              onChange={e => setTenure(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Monthly EMI</p>
            <p className="calculator-display">{formatCurrency(result.emi)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Total Payment</p>
              <p className="font-mono font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <p className="text-xs text-gray-500">Total Interest</p>
              <p className="font-mono font-bold text-secondary-600">{formatCurrency(result.totalInterest)}</p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                  {pieData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary-600" /> Principal</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-secondary-600" /> Interest</span>
          </div>
        </div>
      </div>

      {/* Amortization Schedule */}
      <div>
        <h3 className="font-heading font-bold text-lg text-gray-900 mb-4">Year-wise Amortization Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Year</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Principal Paid</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Interest Paid</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Balance</th>
              </tr>
            </thead>
            <tbody>
              {result.schedule.map(row => (
                <tr key={row.year} className="border-b border-gray-100">
                  <td className="px-4 py-2.5 font-mono">{row.year}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-primary-600">{formatCurrency(row.principalPaid)}</td>
                  <td className="px-4 py-2.5 text-right font-mono text-secondary-600">{formatCurrency(row.interestPaid)}</td>
                  <td className="px-4 py-2.5 text-right font-mono">{formatCurrency(row.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
