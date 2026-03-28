'use client';

import { useState, useMemo } from 'react';

const formatCurrency = (n: number) => '₹' + new Intl.NumberFormat('en-IN').format(Math.round(n));

interface SlabBreakdown {
  slab: string;
  rate: string;
  tax: number;
}

function calculateOldRegimeTax(income: number, age: string, deductions: { sec80c: number; sec80d: number; hra: number; other: number }) {
  const totalDeductions = deductions.sec80c + deductions.sec80d + deductions.hra + deductions.other;
  const taxableIncome = Math.max(0, income - totalDeductions - 50000); // 50000 standard deduction

  let exemptionLimit = 250000;
  if (age === '60-80') exemptionLimit = 300000;
  if (age === 'above-80') exemptionLimit = 500000;

  const slabs: SlabBreakdown[] = [];
  let tax = 0;
  let remaining = taxableIncome;

  // Slab 1: Up to exemption limit - Nil
  const slab1 = Math.min(remaining, exemptionLimit);
  slabs.push({ slab: `₹0 - ${formatCurrency(exemptionLimit)}`, rate: 'Nil', tax: 0 });
  remaining = Math.max(0, remaining - exemptionLimit);

  // Slab 2: exemption to 5L - 5%
  const slab2Limit = 500000 - exemptionLimit;
  const slab2 = Math.min(remaining, slab2Limit);
  const slab2Tax = slab2 * 0.05;
  tax += slab2Tax;
  slabs.push({ slab: `${formatCurrency(exemptionLimit)} - ₹5,00,000`, rate: '5%', tax: slab2Tax });
  remaining = Math.max(0, remaining - slab2Limit);

  // Slab 3: 5L to 10L - 20%
  const slab3 = Math.min(remaining, 500000);
  const slab3Tax = slab3 * 0.20;
  tax += slab3Tax;
  slabs.push({ slab: '₹5,00,000 - ₹10,00,000', rate: '20%', tax: slab3Tax });
  remaining = Math.max(0, remaining - 500000);

  // Slab 4: Above 10L - 30%
  const slab4Tax = remaining * 0.30;
  tax += slab4Tax;
  slabs.push({ slab: 'Above ₹10,00,000', rate: '30%', tax: slab4Tax });

  // Rebate u/s 87A for income <= 5L
  if (taxableIncome <= 500000) tax = 0;

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return { taxableIncome, tax, cess, totalTax, slabs, totalDeductions: totalDeductions + 50000 };
}

function calculateNewRegimeTax(income: number) {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, income - standardDeduction);

  const slabs: SlabBreakdown[] = [];
  let tax = 0;
  let remaining = taxableIncome;

  const slabDefs = [
    { limit: 400000, rate: 0, label: '₹0 - ₹4,00,000', rateStr: 'Nil' },
    { limit: 400000, rate: 0.05, label: '₹4,00,000 - ₹8,00,000', rateStr: '5%' },
    { limit: 400000, rate: 0.10, label: '₹8,00,000 - ₹12,00,000', rateStr: '10%' },
    { limit: 400000, rate: 0.15, label: '₹12,00,000 - ₹16,00,000', rateStr: '15%' },
    { limit: 400000, rate: 0.20, label: '₹16,00,000 - ₹20,00,000', rateStr: '20%' },
    { limit: 400000, rate: 0.25, label: '₹20,00,000 - ₹24,00,000', rateStr: '25%' },
    { limit: Infinity, rate: 0.30, label: 'Above ₹24,00,000', rateStr: '30%' },
  ];

  for (const s of slabDefs) {
    const amt = Math.min(remaining, s.limit);
    const slabTax = amt * s.rate;
    tax += slabTax;
    slabs.push({ slab: s.label, rate: s.rateStr, tax: slabTax });
    remaining = Math.max(0, remaining - s.limit);
  }

  // Rebate u/s 87A for new regime: income up to 12L (taxable up to 12L after std deduction)
  if (taxableIncome <= 1200000) tax = 0;

  const cess = tax * 0.04;
  const totalTax = tax + cess;

  return { taxableIncome, tax, cess, totalTax, slabs, totalDeductions: standardDeduction };
}

export default function TaxCalculator() {
  const [income, setIncome] = useState(1000000);
  const [age, setAge] = useState('below-60');
  const [sec80c, setSec80c] = useState(150000);
  const [sec80d, setSec80d] = useState(25000);
  const [hra, setHra] = useState(0);
  const [other, setOther] = useState(0);

  const oldResult = useMemo(
    () => calculateOldRegimeTax(income, age, { sec80c: Math.min(sec80c, 150000), sec80d: Math.min(sec80d, age === 'below-60' ? 25000 : 50000), hra, other }),
    [income, age, sec80c, sec80d, hra, other]
  );

  const newResult = useMemo(() => calculateNewRegimeTax(income), [income]);

  const betterRegime = oldResult.totalTax <= newResult.totalTax ? 'Old Regime' : 'New Regime';
  const taxSaved = Math.abs(oldResult.totalTax - newResult.totalTax);

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Enter Your Details</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Annual Income (Gross)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="input-field"
              min={0}
            />
            <p className="text-xs text-gray-500 mt-1">{formatCurrency(income)}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age Group</label>
            <select value={age} onChange={(e) => setAge(e.target.value)} className="input-field">
              <option value="below-60">Below 60 years</option>
              <option value="60-80">60 - 80 years (Senior Citizen)</option>
              <option value="above-80">Above 80 years (Super Senior)</option>
            </select>
          </div>
        </div>

        {/* Deductions for Old Regime */}
        <div className="mt-8">
          <h4 className="text-md font-semibold text-gray-800 mb-4">Deductions (for Old Regime)</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section 80C (max ₹1.5L)</label>
              <input type="number" value={sec80c} onChange={(e) => setSec80c(Number(e.target.value))} className="input-field" min={0} max={150000} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section 80D (max ₹{age === 'below-60' ? '25K' : '50K'})</label>
              <input type="number" value={sec80d} onChange={(e) => setSec80d(Number(e.target.value))} className="input-field" min={0} max={age === 'below-60' ? 25000 : 50000} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HRA Exemption</label>
              <input type="number" value={hra} onChange={(e) => setHra(Number(e.target.value))} className="input-field" min={0} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Deductions</label>
              <input type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} className="input-field" min={0} />
            </div>
          </div>
        </div>
      </div>

      {/* Side by Side Comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Old Regime */}
        <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${betterRegime === 'Old Regime' ? 'border-primary-500' : 'border-gray-100'}`}>
          {betterRegime === 'Old Regime' && (
            <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Recommended</span>
          )}
          <h3 className="text-lg font-bold text-gray-900 mb-4">Old Regime</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gross Income</span>
              <span className="font-medium">{formatCurrency(income)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Deductions</span>
              <span className="font-medium text-primary-600">- {formatCurrency(oldResult.totalDeductions)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxable Income</span>
              <span className="font-medium">{formatCurrency(oldResult.taxableIncome)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Income Tax</span>
              <span className="font-medium">{formatCurrency(oldResult.tax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cess (4%)</span>
              <span className="font-medium">{formatCurrency(oldResult.cess)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Tax</span>
              <span className="text-red-600">{formatCurrency(oldResult.totalTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Effective Rate</span>
              <span className="font-medium">{income > 0 ? ((oldResult.totalTax / income) * 100).toFixed(1) : 0}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Tax</span>
              <span className="font-medium">{formatCurrency(oldResult.totalTax / 12)}</span>
            </div>
          </div>

          {/* Slab Breakdown */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Slab-wise Breakdown</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2">Income Slab</th>
                  <th className="text-right p-2">Rate</th>
                  <th className="text-right p-2">Tax</th>
                </tr>
              </thead>
              <tbody>
                {oldResult.slabs.map((s, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-2">{s.slab}</td>
                    <td className="text-right p-2">{s.rate}</td>
                    <td className="text-right p-2">{formatCurrency(s.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Regime */}
        <div className={`bg-white rounded-xl shadow-sm border-2 p-6 ${betterRegime === 'New Regime' ? 'border-primary-500' : 'border-gray-100'}`}>
          {betterRegime === 'New Regime' && (
            <span className="inline-block bg-primary-100 text-primary-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">Recommended</span>
          )}
          <h3 className="text-lg font-bold text-gray-900 mb-4">New Regime (FY 2025-26)</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Gross Income</span>
              <span className="font-medium">{formatCurrency(income)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Standard Deduction</span>
              <span className="font-medium text-primary-600">- {formatCurrency(75000)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxable Income</span>
              <span className="font-medium">{formatCurrency(newResult.taxableIncome)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Income Tax</span>
              <span className="font-medium">{formatCurrency(newResult.tax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Cess (4%)</span>
              <span className="font-medium">{formatCurrency(newResult.cess)}</span>
            </div>
            <hr />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Tax</span>
              <span className="text-red-600">{formatCurrency(newResult.totalTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Effective Rate</span>
              <span className="font-medium">{income > 0 ? ((newResult.totalTax / income) * 100).toFixed(1) : 0}%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Monthly Tax</span>
              <span className="font-medium">{formatCurrency(newResult.totalTax / 12)}</span>
            </div>
          </div>

          {/* Slab Breakdown */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-gray-800 mb-2">Slab-wise Breakdown</h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-2">Income Slab</th>
                  <th className="text-right p-2">Rate</th>
                  <th className="text-right p-2">Tax</th>
                </tr>
              </thead>
              <tbody>
                {newResult.slabs.map((s, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="p-2">{s.slab}</td>
                    <td className="text-right p-2">{s.rate}</td>
                    <td className="text-right p-2">{formatCurrency(s.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Tax Saved */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Tax Comparison Summary</h3>
        <p className="text-gray-700">
          You save <span className="font-bold text-primary-600">{formatCurrency(taxSaved)}</span> by choosing the <span className="font-bold">{betterRegime}</span>.
        </p>
      </div>

      {/* Tax Saving Suggestions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Tax Saving Suggestions</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-bold">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Section 80C - Up to ₹1.5 Lakh</h4>
              <p className="text-xs text-gray-600">Invest in ELSS, PPF, EPF, NSC, Life Insurance, or tax-saving FDs.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-bold">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">Section 80D - Health Insurance</h4>
              <p className="text-xs text-gray-600">Get deduction up to ₹25,000 for self and ₹50,000 for senior citizen parents.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-bold">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">HRA Exemption</h4>
              <p className="text-xs text-gray-600">Claim HRA exemption if you live in rented accommodation.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-primary-600 text-sm font-bold">4</span>
            </div>
            <div>
              <h4 className="font-semibold text-sm">NPS - Section 80CCD(1B)</h4>
              <p className="text-xs text-gray-600">Additional deduction of ₹50,000 for NPS contributions over 80C limit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
