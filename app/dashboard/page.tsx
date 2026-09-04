"use client"

import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  Compass, 
  Clock, 
  Calendar, 
  ChevronRight,
  Bot,
  Briefcase,
  Layers,
  MapPin,
  ShieldAlert
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getAllReports, getActiveReport, setActiveReport, BusinessReport } from '@/lib/report-store'
import { getTradeProfile } from '@/lib/trade-data'

export default function DashboardPage() {
  const { language, t } = useLanguage()
  const [reportsList, setReportsList] = useState<BusinessReport[]>([])
  const [activeReport, setActiveReportState] = useState<BusinessReport>(() => getActiveReport())

  const syncData = () => {
    const list = getAllReports()
    setReportsList(list)
    const active = getActiveReport()
    setActiveReportState(active)
  }

  useEffect(() => {
    syncData()

    const handleReportChange = (e: any) => {
      syncData()
    }

    window.addEventListener('gs_report_changed', handleReportChange)
    return () => window.removeEventListener('gs_report_changed', handleReportChange)
  }, [])

  const handleSwitchEnterprise = (id: string) => {
    const updated = setActiveReport(id)
    if (updated) {
      setActiveReportState(updated)
    }
  }

  const trade = getTradeProfile(activeReport.category, language.toLowerCase())

  // Compute portfolio aggregates
  const totalPortfolioCost = reportsList.reduce((acc, r) => acc + r.projectCost, 0)
  const totalLoanEligible = reportsList.reduce((acc, r) => acc + r.loanAmount, 0)
  const avgFeasibility = reportsList.length > 0 
    ? Math.round(reportsList.reduce((acc, r) => acc + r.feasibilityScore, 0) / reportsList.length)
    : activeReport.feasibilityScore

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER GREETING & MULTI-ENTERPRISE SWITCHER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-emerald-950/10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider inline-block">
                {t('dash.badge')}
              </span>
              <span className="bg-emerald-900/80 border border-emerald-400/20 text-emerald-300 text-xs px-2.5 py-1 rounded-full font-mono">
                {reportsList.length} {reportsList.length === 1 ? 'Enterprise' : 'Enterprises'} Analyzed
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('dash.title')}
            </h1>

            <p className="text-emerald-200 text-xs sm:text-sm leading-relaxed">
              Evaluating hyper-local market feasibility, consumer catchment density, and concessional debt-structuring for{' '}
              <strong className="text-white underline decoration-emerald-400 underline-offset-4">{activeReport.category} Enterprise</strong> in{' '}
              <span className="text-white font-medium">{activeReport.location}</span>.
            </p>

            {/* QUICK SWITCHER DROPDOWN */}
            {reportsList.length > 1 && (
              <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                <span className="text-emerald-300 font-semibold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" /> Switch Active Business:
                </span>
                <select
                  value={activeReport.id}
                  onChange={(e) => handleSwitchEnterprise(e.target.value)}
                  className="bg-emerald-900/90 border border-emerald-500/40 text-white font-bold rounded-xl px-3 py-1.5 outline-none cursor-pointer text-xs"
                >
                  {reportsList.map((r) => (
                    <option key={r.id} value={r.id} className="bg-gray-900 text-white">
                      {r.category} ({r.district || 'Vadodara'}) · ₹{(r.projectCost / 100000).toFixed(1)}L · Score {r.feasibilityScore}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex sm:flex-col gap-2.5 flex-shrink-0">
            <Link
              href="/wizard"
              className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" /> {t('dash.newAnalysis')}
            </Link>
            <Link
              href={`/report?id=${activeReport.id}`}
              className="bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-emerald-500/40 transition text-center"
            >
              {t('dash.viewReport')}
            </Link>
          </div>
        </div>

        {/* PRIMARY METRIC CARDS FOR ACTIVE BUSINESS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FEASIBILITY SCORE */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('dash.score')}</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">{t('common.indicative')}</span>
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-emerald-700">{activeReport.feasibilityScore}</span>
              <span className="text-gray-400 font-semibold text-sm">/ 100</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 py-1.5 px-2.5 rounded-xl font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="truncate">{t('dash.highFeasibility')} in {activeReport.category}</span>
            </div>
          </div>

          {/* PROJECT COST */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('dash.capital')}</span>
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Margin / 10%</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{activeReport.projectCost.toLocaleString('en-IN')}</span>
              <p className="text-xs text-gray-500 mt-0.5">{t('dash.marginReq')}: ₹{activeReport.marginCapital.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              Capital multiplier: <strong>10.0x</strong>
            </div>
          </div>

          {/* LOAN STRUCTURING */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('dash.loan')}</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">90% Coverage</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{activeReport.loanAmount.toLocaleString('en-IN')}</span>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5 truncate">{activeReport.scheme}</p>
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              Interest rate: <strong>{activeReport.interestRate}% p.a.</strong>
            </div>
          </div>

          {/* REPAYMENT & GRACE */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('dash.emi')}</span>
              <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">
                {activeReport.moratoriumMonths} Mo Grace
              </span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{activeReport.emiMonthly.toLocaleString('en-IN')}</span>
              <p className="text-xs text-gray-500 mt-0.5">Post-grace amortization ({activeReport.tenureYears} yrs)</p>
            </div>
            <div className="text-xs text-emerald-700 font-medium border-t pt-2 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> Moratorium protection active
            </div>
          </div>
        </div>

        {/* MULTI-BUSINESS PORTFOLIO SECTION */}
        {reportsList.length > 1 && (
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-700" />
                  Your Multi-Enterprise Portfolio
                </h2>
                <p className="text-xs text-gray-500">
                  Switch active context or compare capital structuring across all your registered enterprises.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="bg-gray-50 px-3 py-1.5 rounded-xl border">
                  <span className="text-gray-400">Total Project Value:</span>{' '}
                  <strong className="text-gray-900">₹{totalPortfolioCost.toLocaleString('en-IN')}</strong>
                </div>
                <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <span className="text-emerald-700">Combined Loan:</span>{' '}
                  <strong className="text-emerald-900">₹{totalLoanEligible.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {reportsList.map((r) => {
                const isCurrent = r.id === activeReport.id
                return (
                  <div
                    key={r.id}
                    onClick={() => handleSwitchEnterprise(r.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                      isCurrent
                        ? 'bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-gray-50/60 hover:bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{r.category}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCurrent ? 'bg-emerald-700 text-white' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {isCurrent ? 'ACTIVE' : `Score ${r.feasibilityScore}`}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mt-1 truncate">{r.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">📍 {r.location}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-2 border-t text-[11px]">
                      <div>
                        <span className="text-gray-400">Project:</span>
                        <p className="font-bold text-gray-800">₹{r.projectCost.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Loan:</span>
                        <p className="font-bold text-emerald-700">₹{r.loanAmount.toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-gray-400">{r.date}</span>
                      <Link
                        href={`/report?id=${r.id}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSwitchEnterprise(r.id)
                        }}
                        className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        View Dossier <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* SECONDARY DASHBOARD MODULES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* APPLICANT ROADMAP */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-base">{t('dash.appraisalRoadmap')}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Statutory stages for {activeReport.category} in {activeReport.district || 'Vadodara'}
                </p>
              </div>
              <span className="text-xs text-emerald-700 bg-emerald-50 font-bold px-3 py-1 rounded-full">
                4 / 4 Stages Compiled
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Demographic Intake</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Catchment verified for {activeReport.location}.</p>
                  <Link href="/map" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    View Catchment Map <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Debt & Equity Ratio</h4>
                  <p className="text-xs text-gray-600 mt-0.5">₹{activeReport.marginCapital.toLocaleString('en-IN')} committed for ₹{activeReport.loanAmount.toLocaleString('en-IN')} debt.</p>
                  <Link href="/calculator" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Adjust Calculator <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">SWOT & Risk Matrix</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Sector-tailored intelligence for {activeReport.category}.</p>
                  <Link href={`/report?id=${activeReport.id}`} className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Examine SWOT <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">GramSaarthi AI Advisor</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Operational cost & pricing strategy advisor.</p>
                  <Link href="/chat" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Consult AI Assistant <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS BANNER */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-emerald-700 flex-shrink-0" />
                <span className="text-xs text-gray-700 font-medium">
                  Have questions about repayment tenure, capital subsidy, or {activeReport.category} operations?
                </span>
              </div>
              <Link
                href="/chat"
                className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-2 rounded-xl transition whitespace-nowrap"
              >
                Ask GramSaarthi
              </Link>
            </div>
          </div>

          {/* DYNAMIC RISK & ADVISORY SNAPSHOT */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-gray-900 text-base">Key Risk & Advisory</h3>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Score: {activeReport.feasibilityScore}/100
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {/* DYNAMIC THREAT ALERT FROM TRADE DATA */}
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Key Sector Threat
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    {trade.threats[0] || 'Maintain adequate working capital buffer to handle raw material price fluctuations.'}
                  </p>
                </div>

                {/* DYNAMIC OPPORTUNITY / OFFTAKE FROM TRADE DATA */}
                <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" /> Market Opportunity
                  </div>
                  <p className="text-blue-800 leading-relaxed">
                    {trade.opportunities[0] || 'Capture local rural retail demand with high gross margins.'}
                  </p>
                </div>

                {/* GRACE PERIOD STRATEGY */}
                <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Statutory Moratorium
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    Utilize the {activeReport.moratoriumMonths}-month grace period strictly for equipment commissioning and building working capital before debt service begins.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Link
                href={`/report?id=${activeReport.id}`}
                className="w-full text-center block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs py-2.5 rounded-xl transition"
              >
                Inspect Complete Feasibility Dossier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
