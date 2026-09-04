"use client"

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { 
  Calculator, 
  Coins, 
  TrendingUp, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  FileSpreadsheet,
  AlertCircle,
  Sliders,
  Sparkles,
  Info
} from 'lucide-react'
import { 
  calculateFinancials, 
  generateRepaymentSchedule, 
  calculateWorkingCapital,
  MARGIN_CONFIG,
  ApplicantCategory
} from '@/lib/financial-engine'
import { useLanguage } from '@/lib/language-context'

export default function CalculatorPage() {
  const { t } = useLanguage()
  const [margin, setMargin] = useState<number>(100000)
  const [enterpriseCategory, setEnterpriseCategory] = useState<string>('Dairy')
  const [applicantCategory, setApplicantCategory] = useState<string>('general')
  const [enableOverride, setEnableOverride] = useState<boolean>(false)
  const [customMarginPercent, setCustomMarginPercent] = useState<number>(15)
  const [interestWaived, setInterestWaived] = useState<boolean>(false)

  const fin = calculateFinancials(margin, {
    category: applicantCategory,
    userOverridePercent: enableOverride ? customMarginPercent / 100 : undefined,
    interestWaivedOverride: interestWaived,
  })

  const schedule = fin.isValid
    ? generateRepaymentSchedule(
        fin.loanAmount,
        fin.interestRate,
        fin.tenureYears,
        fin.moratoriumMonths,
        fin.interestWaivedDuringMoratorium
      )
    : []

  const wc = calculateWorkingCapital(fin.projectCost, enterpriseCategory)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> {t('calc.module')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {t('calc.title')}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              {t('calc.subtitle')}
            </p>
          </div>
          <div className="text-xs text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 font-mono">
            P = Margin ÷ {Math.round(fin.marginPercent * 100)}% | L = P × {fin.fundingPercent}%
          </div>
        </div>

        {/* INPUT & PRIMARY SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CONFIGURATION & MARGIN INPUT CARD */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-600" /> {t('calc.equityHeading')}
            </h3>

            {/* MARGIN INPUT */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t('calc.availableContrib')}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-gray-400">₹</span>
                <input
                  type="number"
                  min="5000"
                  max="1000000"
                  step="5000"
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 font-bold text-lg text-gray-900"
                />
              </div>
            </div>

            {/* PRESET CHIPS */}
            <div className="flex flex-wrap gap-2">
              {[7000, 14000, 50000, 100000, 250000, 500000].map((amt) => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setMargin(amt)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-semibold transition ${
                    margin === amt
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  ₹{amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}k`}
                </button>
              ))}
            </div>

            {/* APPLICANT CATEGORY (Bug 1 Fix) */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Applicant Social Category</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  Floor: {applicantCategory === 'general' ? '10%' : '5%'} Margin
                </span>
              </label>
              <select
                value={applicantCategory}
                onChange={(e) => setApplicantCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white"
              >
                <option value="general">General Category (10% Equity Floor)</option>
                <option value="special">Special Category (5% Equity Floor)</option>
                <option value="sc_st">SC / ST Beneficiary (5% Equity Floor)</option>
                <option value="women">Women Entrepreneur (5% Equity Floor)</option>
                <option value="obc">OBC Beneficiary (5% Equity Floor)</option>
                <option value="minority">Minority Community (5% Equity Floor)</option>
                <option value="differently_abled">Differently-Abled (PwD) (5% Equity Floor)</option>
              </select>
            </div>

            {/* VOLUNTARY USER MARGIN OVERRIDE (Bug 1 Fix) */}
            <div className="bg-emerald-50/50 p-3.5 rounded-2xl border border-emerald-100 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableOverride}
                  onChange={(e) => setEnableOverride(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="text-xs font-bold text-gray-800">
                  Voluntarily Contribute Higher Margin %
                </span>
              </label>
              {enableOverride && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Contribution Rate:</span>
                    <strong className="text-emerald-800 font-bold">{customMarginPercent}%</strong>
                  </div>
                  <input
                    type="range"
                    min={applicantCategory === 'general' ? 10 : 5}
                    max={40}
                    step={1}
                    value={customMarginPercent}
                    onChange={(e) => setCustomMarginPercent(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <p className="text-[10px] text-gray-500">
                    Contributing above the {applicantCategory === 'general' ? '10%' : '5%'} floor lowers your total loan liability and monthly EMI.
                  </p>
                </div>
              )}
            </div>

            {/* MORATORIUM INTEREST POLICY TOGGLE (Bug 2 Fix) */}
            <div className="pt-2 border-t border-gray-100">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Moratorium Interest Policy
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInterestWaived(false)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    !interestWaived
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold">Repayment Holiday</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Interest Capitalized (Standard)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setInterestWaived(true)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition ${
                    interestWaived
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-bold'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="font-bold">Interest Waiver</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">Moratorium Interest Waived</div>
                </button>
              </div>
            </div>

            {/* ENTERPRISE DOMAIN */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                {t('calc.domainLabel')}
              </label>
              <select
                value={enterpriseCategory}
                onChange={(e) => setEnterpriseCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white"
              >
                <option value="Dairy">Dairy & Livestock</option>
                <option value="Retail">Retail & Provisions</option>
                <option value="Food Processing">Food Processing & Milling</option>
                <option value="Textile">Textiles & Apparel</option>
                <option value="Agriculture">Agri-Inputs & Services</option>
              </select>
            </div>

            {/* THRESHOLD ROUTING NOTICE */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-700" /> Statutory Scheme Boundary:
              </div>
              <p className="leading-relaxed">
                {t('calc.thresholdAlert')}
              </p>
            </div>
          </div>

          {/* DYNAMIC SCHEME ROUTING CARD */}
          <div className="lg:col-span-2 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 bg-emerald-700/60 px-3 py-1 rounded-full uppercase tracking-wider">
                  {t('calc.schemeQualification')}
                </span>
                <span className="text-xs font-mono text-emerald-300">
                  {fin.schemeCode === 'micro' ? 'PROJECT COST ≤ ₹1.4L' : 'PROJECT COST > ₹1.4L'}
                </span>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {fin.scheme?.name || 'Unsupported Threshold'}
                </h2>
                <p className="text-xs text-emerald-200 mt-1 max-w-md">
                  {fin.schemeCode === 'micro'
                    ? `Designed for micro-units. 3-year term with 3 months ${fin.interestWaivedDuringMoratorium ? 'interest moratorium (waived)' : 'principal moratorium (interest capitalized)'}.`
                    : `Targeted at rural commercial scale. 7-year term with 6 months ${fin.interestWaivedDuringMoratorium ? 'interest moratorium (waived)' : 'principal moratorium (interest capitalized)'}.`}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-emerald-700/60">
                <div>
                  <span className="text-[11px] text-emerald-300 uppercase">{t('calc.feasibleProject')}</span>
                  <p className="text-xl sm:text-2xl font-extrabold mt-0.5">₹{fin.projectCost.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[11px] text-emerald-300 uppercase">{t('calc.loanAmount')}</span>
                  <p className="text-xl sm:text-2xl font-extrabold mt-0.5">₹{fin.loanAmount.toLocaleString('en-IN')}</p>
                </div>
                <div>
                  <span className="text-[11px] text-emerald-300 uppercase">{t('calc.interestRate')}</span>
                  <p className="text-xl sm:text-2xl font-extrabold mt-0.5">{fin.interestRate}% p.a.</p>
                </div>
                <div>
                  <span className="text-[11px] text-emerald-300 uppercase">{t('calc.monthlyEmi')}</span>
                  <p className="text-xl sm:text-2xl font-extrabold mt-0.5">₹{fin.emiMonthly.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* MORATORIUM POLICY BADGE */}
              <div className="mt-4 p-3 bg-emerald-900/50 rounded-2xl border border-emerald-700/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-emerald-300 font-semibold">Moratorium Type: </span>
                  <span className="text-white font-bold">
                    {fin.interestWaivedDuringMoratorium
                      ? 'Interest Moratorium (Interest Waived)'
                      : 'Principal Moratorium (Interest Capitalized into Principal)'}
                  </span>
                </div>
                <span className="text-[10px] bg-emerald-700/70 text-emerald-200 px-2 py-0.5 rounded">
                  {fin.moratoriumMonths} Mo. Grace
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('calc.tenure')}: {fin.tenureYears} {t('calc.years')} | {t('calc.moratoriumGrace')}: {fin.moratoriumMonths} {t('calc.months')}</span>
              </div>
              <Link
                href="/report"
                className="bg-white text-emerald-950 font-bold px-4 py-2 rounded-xl text-xs hover:bg-emerald-50 transition shadow"
              >
                {t('calc.compileReport')}
              </Link>
            </div>
          </div>
        </div>

        {/* WORKING CAPITAL ADVISORY */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-base">{t('calc.workingCapitalHeading')}</h3>
              <p className="text-xs text-gray-500">{t('calc.workingCapitalSub')}</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {t('calc.estReserve')}: ₹{wc.total.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.entries(wc.breakdown).map(([label, val]) => (
              <div key={label} className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider block truncate">{label}</span>
                <p className="text-sm font-bold text-gray-900 mt-1">₹{val.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QUARTERLY REPAYMENT AMORTIZATION SCHEDULE */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                {t('calc.amortizationHeading')}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {t('calc.amortizationSub')}
              </p>
            </div>
            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg">
              {schedule.length} {t('calc.quartersModeled')}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-semibold border-b">
                <tr>
                  <th className="py-3 px-4">{t('calc.quarter')}</th>
                  <th className="py-3 px-4">{t('calc.type')}</th>
                  <th className="py-3 px-4">{t('calc.quarterlyPayment')}</th>
                  <th className="py-3 px-4">{t('calc.principalAmortized')}</th>
                  <th className="py-3 px-4">{t('calc.interestOutflow')}</th>
                  <th className="py-3 px-4">{t('calc.closingBalance')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schedule.slice(0, 8).map((row) => (
                  <tr key={row.period} className={row.isMoratorium ? 'bg-amber-50/40 font-medium' : 'hover:bg-gray-50/60'}>
                    <td className="py-3 px-4 font-bold text-gray-900">Q{row.period}</td>
                    <td className="py-3 px-4">
                      {row.isMoratorium ? (
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                          {t('calc.moratoriumGraceTag')}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          {t('calc.activeAmortizationTag')}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">₹{row.payment.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-gray-600">₹{row.principal.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 text-gray-600">₹{row.interest.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4 font-bold text-emerald-900">₹{row.balance.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-gray-400 italic pt-2">
            * Displaying initial 8 quarters. Schedule reflects {fin.interestWaivedDuringMoratorium ? 'interest waiver' : 'capitalized interest during repayment holiday'}. Exact schedule finalized upon sanction by State Channelizing Agency (SCA).
          </p>
        </div>
      </div>
    </AppShell>
  )
}
