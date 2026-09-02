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
  Bot
} from 'lucide-react'

export default function DashboardPage() {
  const [profile, setProfile] = useState({
    business: 'Dairy Unit Expansion',
    category: 'Dairy',
    location: 'Savli, Vadodara, Gujarat',
    margin: 100000,
    projectCost: 1000000,
    loan: 900000,
    scheme: 'Term Loan Scheme',
    interestRate: 8.0,
    tenure: '7 Years',
    moratorium: '6 Months',
    emi: 14025,
    score: 82,
    risk: 'Moderate',
  })

  useEffect(() => {
    const saved = localStorage.getItem('gs_analysis')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProfile((prev) => ({
          ...prev,
          business: `${parsed.category} Enterprise`,
          category: parsed.category || prev.category,
          location: `${parsed.village ? parsed.village + ', ' : ''}${parsed.district || 'Vadodara'}, ${parsed.state || 'Gujarat'}`,
          margin: parsed.marginCapital || prev.margin,
          projectCost: parsed.projectCost || prev.projectCost,
          loan: parsed.loanAmount || prev.loan,
          scheme: parsed.scheme === 'micro' ? 'Micro Finance Scheme' : 'Term Loan Scheme',
          interestRate: parsed.interestRate || prev.interestRate,
          tenure: `${parsed.tenureYears || 7} Years`,
          moratorium: `${parsed.moratoriumMonths || 6} Months`,
          emi: parsed.emiMonthly || prev.emi,
          score: parsed.feasibilityScore || prev.score,
        }))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  return (
    <AppShell>
      <div className="space-y-6">
        {/* HEADER GREETING */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-800 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-emerald-950/10">
          <div>
            <span className="bg-emerald-700/60 border border-emerald-500/30 text-emerald-200 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider inline-block mb-3">
              Active Case Study · Prototype
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Rural Enterprise Advisory Desk
            </h1>
            <p className="text-emerald-200 text-sm mt-1 max-w-xl leading-relaxed">
              Evaluating hyper-local market feasibility, consumer density, and concessional debt-structuring for <strong>{profile.business}</strong> in {profile.location}.
            </p>
          </div>
          <div className="flex sm:flex-col gap-2.5">
            <Link
              href="/wizard"
              className="bg-white hover:bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow transition text-center flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-emerald-700" /> New Analysis
            </Link>
            <Link
              href="/report"
              className="bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-emerald-500/40 transition text-center"
            >
              View Full Report
            </Link>
          </div>
        </div>

        {/* PRIMARY METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FEASIBILITY SCORE */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Feasibility Score</span>
              <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">Indicative</span>
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-emerald-700">{profile.score}</span>
              <span className="text-gray-400 font-semibold text-sm">/ 100</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 py-1.5 px-2.5 rounded-xl font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>High viability in {profile.category} sector</span>
            </div>
          </div>

          {/* PROJECT COST */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Cost</span>
              <span className="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-md">Margin / 10%</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{profile.projectCost.toLocaleString('en-IN')}</span>
              <p className="text-xs text-gray-500 mt-0.5">Own contribution: ₹{profile.margin.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              Capital efficiency factor: <strong>10.0x</strong>
            </div>
          </div>

          {/* LOAN STRUCTURING */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Estimated Loan</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">90% Coverage</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{profile.loan.toLocaleString('en-IN')}</span>
              <p className="text-xs text-emerald-700 font-semibold mt-0.5">{profile.scheme}</p>
            </div>
            <div className="text-xs text-gray-500 border-t pt-2">
              Concessional Interest: <strong>{profile.interestRate}% p.a.</strong>
            </div>
          </div>

          {/* ESTIMATED EMI */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Monthly EMI</span>
              <span className="text-xs text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-md">{profile.tenure}</span>
            </div>
            <div className="my-3">
              <span className="text-3xl font-extrabold text-gray-900">₹{profile.emi.toLocaleString('en-IN')}</span>
              <p className="text-xs text-gray-500 mt-0.5">Moratorium: <strong>{profile.moratorium} grace</strong></p>
            </div>
            <div className="text-xs text-emerald-700 font-semibold border-t pt-2">
              Repayment post grace period
            </div>
          </div>
        </div>

        {/* WORKFLOW AND RECENT INTELLIGENCE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* GUIDED JOURNEY PROGRESS */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Guided Enterprise Evaluation Workflow</h3>
                <p className="text-xs text-gray-500">Step-by-step institutional appraisal pipeline for micro-funding</p>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Stage 4 of 4
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Hyper-Local Geographic Mapping</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Savli block, 5–10 km radius customer catchment defined.</p>
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
                  <h4 className="text-sm font-bold text-gray-900">Financial Structuring Engine</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Automated scheme qualification (Term Loan &gt; ₹1.4L threshold).</p>
                  <Link href="/calculator" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Audit Calculator <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">SWOT & Risk Assessment</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Identified summer fodder risks & Amul cooperative offtake.</p>
                  <Link href="/report" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Examine SWOT <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">GramSaarthi AI Advisory</h4>
                  <p className="text-xs text-gray-600 mt-0.5">Interactive multilingual chat for pricing & buffer strategy.</p>
                  <Link href="/chat" className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold mt-2 hover:underline">
                    Consult AI Assistant <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS BANNER */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-emerald-700" />
                <span className="text-xs text-gray-700 font-medium">
                  Have a question regarding repayment tenure or cattle shed construction subsidy?
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

          {/* RISK & CRITICAL ADVISORY SNAPSHOT */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-gray-900 text-base">Key Risk & Advisory</h3>
                <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Moderate Risk
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Fodder Seasonality Alert
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    Summer months create a 20–30% increase in dry fodder expenses. Maintain a 3-month working capital buffer.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-blue-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-blue-600" /> Offtake Assurance
                  </div>
                  <p className="text-blue-800 leading-relaxed">
                    District cooperative collection routes pass within 1.8 km of Tarsali center. Guaranteed daily off-take eliminates inventory decay.
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Grace Period Strategy
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    Utilize the 6-month moratorium period strictly for animal acclimatization and lactation cycle peak before principal amortization begins.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t">
              <Link
                href="/report"
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
