"use client"

import { useState, useEffect, useRef } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { 
  FileText, 
  Download, 
  Share2, 
  Printer, 
  Sparkles, 
  MapPin, 
  ShieldAlert, 
  Coins, 
  Layers, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  Bot,
  Loader2
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export default function ReportPage() {
  const { t } = useLanguage()
  const dossierRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [data, setData] = useState({
    entrepreneur: 'Rajesh Patel',
    location: 'Tarsali, Savli Block, Vadodara, Gujarat',
    category: 'Dairy',
    marginCapital: 100000,
    projectCost: 1000000,
    loanAmount: 900000,
    scheme: 'Term Loan Scheme',
    interestRate: 8.0,
    tenureYears: 7,
    moratoriumMonths: 6,
    emiMonthly: 14025,
    score: 84,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  })

  useEffect(() => {
    let entrepreneurName = 'Rajesh Patel'
    const userStr = localStorage.getItem('gs_user')
    if (userStr) {
      try {
        const u = JSON.parse(userStr)
        if (u.name) entrepreneurName = u.name
      } catch (e) {
        console.error(e)
      }
    }

    const saved = localStorage.getItem('gs_analysis')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setData((prev) => ({
          ...prev,
          entrepreneur: entrepreneurName,
          category: parsed.category || prev.category,
          location: `${parsed.village ? parsed.village + ', ' : ''}${parsed.block ? parsed.block + ', ' : ''}${parsed.district || 'Vadodara'}, ${parsed.state || 'Gujarat'}`,
          marginCapital: parsed.marginCapital || prev.marginCapital,
          projectCost: parsed.projectCost || prev.projectCost,
          loanAmount: parsed.loanAmount || prev.loanAmount,
          scheme: parsed.scheme === 'micro' ? 'Micro Finance Scheme' : 'Term Loan Scheme',
          interestRate: parsed.interestRate || prev.interestRate,
          tenureYears: parsed.tenureYears || prev.tenureYears,
          moratoriumMonths: parsed.moratoriumMonths || prev.moratoriumMonths,
          emiMonthly: parsed.emiMonthly || prev.emiMonthly,
          score: parsed.feasibilityScore || prev.score,
        }))
      } catch (e) {
        console.error(e)
      }
    } else {
      setData((prev) => ({ ...prev, entrepreneur: entrepreneurName }))
    }
  }, [])

  // 1-Click Direct Download as real PDF file
  const handleDirectDownload = async () => {
    if (!dossierRef.current) return
    setDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(dossierRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      const cleanFileName = `GramSaarthi_Feasibility_Report_${data.category}_${data.entrepreneur.replace(/\s+/g, '_')}.pdf`
      pdf.save(cleanFileName)
    } catch (err) {
      console.error('Direct PDF download error, falling back to window.print():', err)
      window.print()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ACTION BAR */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {t('report.officialBadge')}
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-1">
              {t('report.title')}
            </h1>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={handleDirectDownload}
              disabled={downloading}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-60 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow transition"
            >
              {downloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t('report.downloading')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> {t('report.downloadPdf')}
                </>
              )}
            </button>
            <Link
              href="/chat"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs sm:text-sm px-3.5 py-2.5 rounded-xl transition"
            >
              <Bot className="w-4 h-4 text-emerald-700" /> {t('report.discussAI')}
            </Link>
          </div>
        </div>

        {/* PRINTABLE / EXPORTABLE DOSSIER CONTAINER */}
        <div ref={dossierRef} className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8 print:shadow-none print:border-none print:p-0">
          {/* HEADER DOSSIER BANNER */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-700 text-white font-extrabold flex items-center justify-center rounded-xl text-sm">
                  GS
                </div>
                <span className="font-extrabold text-gray-900 text-lg">GramSaarthi AI</span>
              </div>
              <p className="text-xs text-gray-500 font-medium max-w-sm">
                National Micro-Enterprise Evaluation Engine · Concessional Credit Appraisal Framework
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-gray-600 space-y-1">
              <div><strong>{t('report.candidate')}:</strong> <span className="font-bold text-emerald-800">{data.entrepreneur}</span></div>
              <div><strong>{t('report.date')}:</strong> {data.date}</div>
              <div><strong>{t('report.cluster')}:</strong> {data.location}</div>
            </div>
          </div>

          {/* EXECUTIVE SNAPSHOT WITH FEASIBILITY BADGE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white md:col-span-3 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-700/60 px-2 py-0.5 rounded-full">
                  Executive Appraisal
                </span>
                <h3 className="text-xl font-bold mt-2">
                  Viable Enterprise Opportunity: {data.category} in Vadodara Rural Belt
                </h3>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  The candidate business displays resilient underlying fundamentals. Favorable local cooperative integration, coupled with rapid demand expansion across the Savli–Vadodara peri-urban corridor, supports an investment rating above baseline. The proposed 10% equity commitment qualifies under the statutory <strong>{data.scheme}</strong>.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-emerald-300 border-t border-emerald-700/60 pt-3">
                <span>Estimated Customer Base: <strong>8,000–12,000</strong></span>
                <span>•</span>
                <span>Catchment Radius: <strong>10 km</strong></span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">Feasibility Score</span>
              <div className="text-5xl font-black text-emerald-800 my-2">{data.score}</div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                High Viability ✓
              </span>
            </div>
          </div>

          {/* FINANCIAL STRUCTURING METRICS TABLE */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b pb-2">
              <Coins className="w-5 h-5 text-emerald-700" /> Statutory Financial Structuring (Module 2)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Own Margin (10%)</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{data.marginCapital.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Statutory commitment</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Feasible Project Cost</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{data.projectCost.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Margin ÷ 10%</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Loan Principal (90%)</span>
                <p className="text-base font-extrabold text-emerald-800 mt-0.5">₹{data.loanAmount.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{data.scheme}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Monthly Repayment</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{data.emiMonthly.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{data.interestRate}% p.a. / {data.tenureYears} yrs</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 flex items-center justify-between">
              <span>Moratorium Provision: <strong>{data.moratoriumMonths} Months Interest Grace Period</strong> prior to principal repayment.</span>
              <span className="font-semibold text-emerald-800">Concessional Credit Verified</span>
            </div>
          </div>

          {/* SWOT ANALYSIS MATRIX */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b pb-2">
              <Layers className="w-5 h-5 text-emerald-700" /> Hyper-Local SWOT Matrix (Module 1)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* STRENGTHS */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Strengths (Local Catalysts)
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  <li>Direct access to established Gujarat cooperative network (Amul daily routes).</li>
                  <li>Inherent daily liquidity generation from continuous morning/evening yields.</li>
                  <li>Eligibility for State livestock shelter subsidies under Kamdhenu scheme.</li>
                  <li>Deep familial familiarity with animal husbandry practices in Anand-Savli belt.</li>
                </ul>
              </div>

              {/* WEAKNESSES */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                <div className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-700" /> Weaknesses (Internal Constraints)
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  <li>High operational labor intensity requiring uninterrupted bi-daily attention.</li>
                  <li>Perishable inventory demanding immediate offtake or cold-chain chilling access.</li>
                  <li>Initial capital heavily locked into biological assets vulnerable to disease.</li>
                </ul>
              </div>

              {/* OPPORTUNITIES */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                <div className="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-700" /> Opportunities (Market Upside)
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  <li>Value-addition into Ghee (₹550–680/kg) and Paneer (₹320/kg) multiplies gross margins 3x.</li>
                  <li>Proximity to Vadodara urban center (22 km) enables premium A2 milk delivery models.</li>
                  <li>Institutional bulk supply contracts for local residential boarding institutes.</li>
                </ul>
              </div>

              {/* THREATS */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <div className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" /> Threats (Environmental & Supply Risks)
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  <li>Severe summer fodder price surges (up to 30% inflation in peak dry periods).</li>
                  <li>Foot-and-Mouth Disease (FMD) risks requiring strict vaccination compliance.</li>
                  <li>Nearest full-capacity veterinary hospital located 7.5 km away at Taluka HQ.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* LOCAL COMPETITOR DENSITY & PRICING STRATEGY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Competitor Mapping Density</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Within the immediate 5 km radius of Tarsali, approximately <strong>8–11 traditional dairy farmers</strong> operate. However, 100% of existing players sell non-differentiated raw milk to the primary society. No local player currently converts surplus yield into packaged Ghee or curd, creating a wide-open value-addition niche.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">Target Pricing Strategy</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gray-50 rounded-xl border">
                  <span className="text-gray-500 font-medium">Raw Milk</span>
                  <p className="font-bold text-gray-900">₹42 – ₹48 / L</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl border">
                  <span className="text-gray-500 font-medium">Clarified Ghee</span>
                  <p className="font-bold text-gray-900">₹550 – ₹680 / kg</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl border">
                  <span className="text-gray-500 font-medium">Fresh Paneer</span>
                  <p className="font-bold text-gray-900">₹280 – ₹350 / kg</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-xl border">
                  <span className="text-gray-500 font-medium">Set Curd (Dahi)</span>
                  <p className="font-bold text-gray-900">₹60 – ₹80 / 500g</p>
                </div>
              </div>
            </div>
          </div>

          {/* STATUTORY DISCLAIMER */}
          <div className="pt-6 border-t text-[11px] text-gray-400 leading-relaxed">
            <strong>Statutory Disclaimer:</strong> This Feasibility Dossier is synthesized by GramSaarthi AI for the MSU Hack-A-Throne 2026 evaluation process. All market size figures, demographic estimations, and competitor mappings represent model-driven indicative approximations. Official credit sanctioning remains strictly subject to physical scrutiny by designated State Channelizing Agencies (SCA) and participating financial institutions.
          </div>
        </div>
      </div>
    </AppShell>
  )
}
