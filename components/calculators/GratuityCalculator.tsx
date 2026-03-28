'use client';

import { useState, useMemo } from 'react';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

export default function GratuityCalculator() {
  const [salary, setSalary] = useState(80000);
  const [years, setYears] = useState(10);
  const [type, setType] = useState<'private' | 'government'>('private');

  const result = useMemo(() => {
    const gratuity = type === 'private'
      ? (15 * salary * years) / 26
      : (15 * salary * years) / 30;

    const exemptLimit = 2000000;
    const exempt = Math.min(gratuity, exemptLimit);
    const taxable = Math.max(0, gratuity - exemptLimit);

    return { gratuity, exempt, taxable };
  }, [salary, years, type]);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Last Drawn Salary (Basic + DA)</span>
              <span className="text-primary-600 font-mono">{formatCurrency(salary)}</span>
            </label>
            <input type="range" min={10000} max={500000} step={5000} value={salary}
              onChange={e => setSalary(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Years of Service</span>
              <span className="text-primary-600 font-mono">{years} years</span>
            </label>
            <input type="range" min={5} max={40} step={1} value={years}
              onChange={e => setYears(Number(e.target.value))} className="w-full" />
            <p className="text-xs text-gray-500 mt-1">Minimum 5 years required for gratuity eligibility</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Employee Type</label>
            <div className="grid grid-cols-2 gap-2">
              {(['private', 'government'] as const).map(t => (
                <button key={t} onClick={() => setType(t)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                    type === t ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Formula:</strong> Gratuity = (15 × Last Salary × Years) ÷ {type === 'private' ? '26' : '30'}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">Gratuity Amount</p>
            <p className="calculator-display">{formatCurrency(result.gratuity)}</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Tax Exempt Amount</span>
              <span className="font-mono font-bold text-primary-600">{formatCurrency(result.exempt)}</span>
            </div>
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Taxable Amount</span>
              <span className="font-mono font-bold text-secondary-600">{formatCurrency(result.taxable)}</span>
            </div>
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Tax Exemption Limit</span>
              <span className="font-mono font-bold text-gray-900">{formatCurrency(2000000)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            As per current rules, gratuity up to ₹20 lakh is exempt from income tax for private sector employees.
          </p>
        </div>
      </div>
    </div>
  );
}
