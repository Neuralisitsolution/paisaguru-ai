'use client';

import { useState, useMemo } from 'react';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

export default function HRACalculator() {
  const [basic, setBasic] = useState(50000);
  const [da, setDa] = useState(5000);
  const [hra, setHra] = useState(20000);
  const [rent, setRent] = useState(25000);
  const [metro, setMetro] = useState(true);

  const result = useMemo(() => {
    const annualBasic = (basic + da) * 12;
    const annualHRA = hra * 12;
    const annualRent = rent * 12;

    const actualHRA = annualHRA;
    const percentOfSalary = metro ? annualBasic * 0.5 : annualBasic * 0.4;
    const rentMinus10 = Math.max(0, annualRent - annualBasic * 0.1);

    const exempt = Math.min(actualHRA, percentOfSalary, rentMinus10);
    const taxable = annualHRA - exempt;

    return {
      actualHRA,
      percentOfSalary,
      rentMinus10,
      exempt,
      taxable,
      monthlyExempt: exempt / 12,
      monthlyTaxable: taxable / 12,
    };
  }, [basic, da, hra, rent, metro]);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Basic Salary (Monthly)</span>
              <span className="text-primary-600 font-mono">{formatCurrency(basic)}</span>
            </label>
            <input type="range" min={10000} max={500000} step={5000} value={basic}
              onChange={e => setBasic(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Dearness Allowance (Monthly)</span>
              <span className="text-primary-600 font-mono">{formatCurrency(da)}</span>
            </label>
            <input type="range" min={0} max={100000} step={1000} value={da}
              onChange={e => setDa(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>HRA Received (Monthly)</span>
              <span className="text-primary-600 font-mono">{formatCurrency(hra)}</span>
            </label>
            <input type="range" min={0} max={200000} step={1000} value={hra}
              onChange={e => setHra(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-2">
              <span>Rent Paid (Monthly)</span>
              <span className="text-primary-600 font-mono">{formatCurrency(rent)}</span>
            </label>
            <input type="range" min={0} max={200000} step={1000} value={rent}
              onChange={e => setRent(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">City Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setMetro(true)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  metro ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                Metro (50%)
              </button>
              <button onClick={() => setMetro(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  !metro ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                Non-Metro (40%)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-1">HRA Exemption (Annual)</p>
            <p className="calculator-display">{formatCurrency(result.exempt)}</p>
            <p className="text-sm text-gray-500 mt-1">Monthly: {formatCurrency(result.monthlyExempt)}</p>
          </div>

          <h4 className="font-heading font-semibold text-sm text-gray-900 mb-3">Exemption Calculation</h4>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Actual HRA Received</span>
              <span className="font-mono text-sm">{formatCurrency(result.actualHRA)}</span>
            </div>
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">{metro ? '50%' : '40%'} of (Basic + DA)</span>
              <span className="font-mono text-sm">{formatCurrency(result.percentOfSalary)}</span>
            </div>
            <div className="flex justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-600">Rent - 10% of Salary</span>
              <span className="font-mono text-sm">{formatCurrency(result.rentMinus10)}</span>
            </div>
          </div>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
            <p className="text-sm text-primary-800">
              <strong>Exempt:</strong> {formatCurrency(result.exempt)} (minimum of above three)
            </p>
          </div>
          <div className="mt-3 p-3 bg-secondary-50 border border-secondary-200 rounded-lg">
            <p className="text-sm text-secondary-800">
              <strong>Taxable HRA:</strong> {formatCurrency(result.taxable)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
