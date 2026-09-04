"use client"

import { useState, useEffect, useRef, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { 
  Download, 
  Coins, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  Sparkles,
  Bot,
  Loader2,
  Briefcase,
  ChevronDown
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getTradeProfile } from '@/lib/trade-data'
import { getAllReports, getReportById, getActiveReport, setActiveReport, BusinessReport } from '@/lib/report-store'

function ReportContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const idFromUrl = searchParams.get('id')

  const { language, t } = useLanguage()
  const dossierRef = useRef<HTMLDivElement>(null)
  const [downloading, setDownloading] = useState(false)
  const [reportsList, setReportsList] = useState<BusinessReport[]>([])
  const [currentReport, setCurrentReport] = useState<BusinessReport>(() => getActiveReport())

  // Load reports and set active report based on URL or storage
  const syncReportData = () => {
    const all = getAllReports()
    setReportsList(all)

    let selected: BusinessReport | null = null
    if (idFromUrl) {
      selected = getReportById(idFromUrl)
    }

    if (!selected) {
      selected = getActiveReport()
    }

    if (selected) {
      setCurrentReport(selected)
      setActiveReport(selected.id)
    }
  }

  useEffect(() => {
    syncReportData()

    const handleReportChange = () => {
      syncReportData()
    }

    window.addEventListener('gs_report_changed', handleReportChange)
    return () => window.removeEventListener('gs_report_changed', handleReportChange)
  }, [idFromUrl])

  const handleSwitchReport = (newId: string) => {
    setActiveReport(newId)
    router.push(`/report?id=${newId}`)
  }

  const trade = getTradeProfile(currentReport.category, language.toLowerCase())

  // 1-Click Direct Download as real PDF file
  const handleDirectDownload = async () => {
    if (!dossierRef.current) return
    setDownloading(true)

    // Reusable canvas context for exact browser color space -> RGBA conversion
    const colorCanvas = typeof window !== 'undefined' ? document.createElement('canvas') : null
    if (colorCanvas) {
      colorCanvas.width = 1
      colorCanvas.height = 1
    }
    const colorCtx = colorCanvas ? colorCanvas.getContext('2d', { willReadFrequently: true }) : null

    const convertColorStr = (str: string): string => {
      if (!str || typeof str !== 'string') return str
      if (!/(?:lab|oklch|lch|oklab|color)\([^)]+\)/i.test(str)) {
        return str
      }
      return str.replace(/(?:lab|oklch|lch|oklab|color)\([^)]+\)/gi, (match) => {
        try {
          if (!colorCtx) return 'rgb(0, 0, 0)'
          colorCtx.clearRect(0, 0, 1, 1)
          colorCtx.fillStyle = '#000000'
          colorCtx.fillStyle = match
          colorCtx.fillRect(0, 0, 1, 1)
          const data = colorCtx.getImageData(0, 0, 1, 1).data
          const r = data[0]
          const g = data[1]
          const b = data[2]
          const a = +(data[3] / 255).toFixed(3)
          return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
        } catch {
          return 'rgba(0, 0, 0, 0.5)'
        }
      })
    }

    const wrapComputedStyle = (origFn: typeof window.getComputedStyle) => {
      return function (el: Element, pseudo?: string | null) {
        const style = origFn(el, pseudo)
        return new Proxy(style, {
          get(target, prop: string | symbol) {
            if (typeof prop !== 'string') {
              return (target as any)[prop]
            }
            if (prop === 'getPropertyValue') {
              return (name: string) => {
                const val = target.getPropertyValue(name)
                return convertColorStr(val)
              }
            }
            const val = (target as any)[prop]
            if (typeof val === 'function') {
              return val.bind(target)
            }
            if (typeof val === 'string') {
              return convertColorStr(val)
            }
            return val
          },
        })
      }
    }

    // Intercept top-level window.getComputedStyle globally during html2canvas run
    const origWindowGetComputedStyle = window.getComputedStyle
    window.getComputedStyle = wrapComputedStyle(origWindowGetComputedStyle)

    try {
      const html2canvas = (await import('html2canvas')).default
      const { jsPDF } = await import('jspdf')

      const canvas = await html2canvas(dossierRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          if (clonedDoc.defaultView) {
            const origClonedGet = clonedDoc.defaultView.getComputedStyle.bind(clonedDoc.defaultView)
            clonedDoc.defaultView.getComputedStyle = wrapComputedStyle(origClonedGet)
          }

          if (clonedDoc.documentElement) {
            clonedDoc.documentElement.style.backgroundColor = '#ffffff'
          }
          if (clonedDoc.body) {
            clonedDoc.body.style.backgroundColor = '#ffffff'
          }

          // Also convert inline styles on all cloned nodes
          const allElements = clonedDoc.querySelectorAll('*')
          allElements.forEach((node) => {
            const el = node as HTMLElement
            if (!el.style) return
            for (let i = 0; i < el.style.length; i++) {
              const p = el.style[i]
              const v = el.style.getPropertyValue(p)
              if (v && /(?:lab|oklch|lch|oklab|color)\([^)]+\)/i.test(v)) {
                el.style.setProperty(p, convertColorStr(v), 'important')
              }
            }
          })
        },
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

      const cleanCategory = currentReport.category.replace(/\s+/g, '_')
      const cleanEntrepreneur = currentReport.entrepreneur.replace(/\s+/g, '_')
      const cleanFileName = `GramSaarthi_Feasibility_Report_${cleanCategory}_${cleanEntrepreneur}.pdf`
      pdf.save(cleanFileName)
    } catch (err) {
      console.error('Direct PDF download error, falling back to window.print():', err)
      window.print()
    } finally {
      window.getComputedStyle = origWindowGetComputedStyle
      setDownloading(false)
    }
  }

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ACTION BAR */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {t('report.officialBadge')}
              </span>
              <span className="text-[11px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                DOSSIER #{currentReport.id}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {t('report.title')}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            {/* BUSINESS SWITCHER */}
            {reportsList.length > 1 && (
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span className="text-[11px] text-gray-500 font-semibold hidden sm:inline">Select Dossier:</span>
                <select
                  value={currentReport.id}
                  onChange={(e) => handleSwitchReport(e.target.value)}
                  className="bg-transparent text-xs font-bold text-gray-800 outline-none cursor-pointer pr-1"
                >
                  {reportsList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.category} ({r.district || 'Vadodara'}) · Score {r.feasibilityScore}
                    </option>
                  ))}
                </select>
              </div>
            )}

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
                {t('report.subTitle')}
              </p>
            </div>
            <div className="text-left sm:text-right text-xs text-gray-600 space-y-1">
              <div><strong>{t('report.candidate')}:</strong> <span className="font-bold text-emerald-800">{currentReport.entrepreneur}</span></div>
              <div><strong>{t('report.date')}:</strong> {currentReport.date}</div>
              <div><strong>{t('report.cluster')}:</strong> {currentReport.location}</div>
            </div>
          </div>

          {/* EXECUTIVE SNAPSHOT WITH FEASIBILITY BADGE */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white md:col-span-3 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-700/60 px-2 py-0.5 rounded-full">
                  {t('report.execBadge')}
                </span>
                <h3 className="text-xl font-bold mt-2">
                  {t('report.viableHeading')}: {currentReport.category} ({currentReport.location})
                </h3>
                <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                  {t('report.execSummary')} ({currentReport.scheme}).
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-emerald-300 border-t border-emerald-700/60 pt-3">
                <span>{t('report.custBase')}</span>
                <span>•</span>
                <span>{t('report.radius')}</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col justify-center items-center text-center">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">{t('report.scoreBadge')}</span>
              <div className="text-5xl font-black text-emerald-800 my-2">{currentReport.feasibilityScore}</div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                {t('report.highViability')}
              </span>
            </div>
          </div>

          {/* FINANCIAL STRUCTURING METRICS TABLE */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b pb-2">
              <Coins className="w-5 h-5 text-emerald-700" /> {t('report.financialHeading')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t('report.ownMargin')}</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{currentReport.marginCapital.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{t('report.statutoryCommitment')}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t('report.feasibleProject')}</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{currentReport.projectCost.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{t('report.marginMultiplier')}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t('report.loanPrincipal')}</span>
                <p className="text-base font-extrabold text-emerald-800 mt-0.5">₹{currentReport.loanAmount.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{currentReport.scheme}</p>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t('report.monthlyEmi')}</span>
                <p className="text-base font-extrabold text-gray-900 mt-0.5">₹{currentReport.emiMonthly.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{currentReport.interestRate}% p.a. / {currentReport.tenureYears} yrs</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 text-xs text-emerald-950 flex items-center justify-between">
              <span>{t('report.moratoriumProvision')}</span>
              <span className="font-semibold text-emerald-800">{t('report.concessionalVerified')}</span>
            </div>
          </div>

          {/* SWOT ANALYSIS MATRIX */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-base flex items-center gap-2 border-b pb-2">
              <Layers className="w-5 h-5 text-emerald-700" /> {t('report.swotHeading')}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* STRENGTHS */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> {t('report.strengths')}
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  {trade.strengths.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* WEAKNESSES */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
                <div className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-rose-700" /> {t('report.weaknesses')}
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  {trade.weaknesses.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* OPPORTUNITIES */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
                <div className="font-bold text-blue-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-blue-700" /> {t('report.opportunities')}
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  {trade.opportunities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* THREATS */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <div className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-700" /> {t('report.threats')}
                </div>
                <ul className="text-xs text-gray-700 space-y-1.5 list-disc list-inside">
                  {trade.threats.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* LOCAL COMPETITOR DENSITY & PRICING STRATEGY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{t('report.competitorDensity')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {language === 'HI' ? (
                  <><strong>{currentReport.location}</strong> के 5 किमी दायरे में: {trade.competitorDensityDesc}</>
                ) : language === 'GU' ? (
                  <><strong>{currentReport.location}</strong> ની આસપાસ ૫ કિમી વિસ્તારમાં: {trade.competitorDensityDesc}</>
                ) : (
                  <>Within a 5 km radius of <strong>{currentReport.location}</strong>: {trade.competitorDensityDesc}</>
                )}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-sm">{t('report.pricingStrategy')}</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {trade.pricingBenchmarks.map((bm, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded-xl border">
                    <span className="text-gray-500 font-medium block truncate">{bm.label}</span>
                    <p className="font-bold text-gray-900">{bm.range}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* STATUTORY DISCLAIMER */}
          <div className="pt-6 border-t text-[11px] text-gray-400 leading-relaxed">
            {t('report.statutoryDisclaimer')}
          </div>
        </div>
      </div>
    </AppShell>
  )
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <AppShell>
          <div className="max-w-5xl mx-auto p-12 text-center text-gray-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-700" />
            <p className="text-sm font-semibold">Loading Feasibility Dossier...</p>
          </div>
        </AppShell>
      }
    >
      <ReportContent />
    </Suspense>
  )
}
