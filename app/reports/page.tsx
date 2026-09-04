"use client"

import { useState, useEffect } from 'react'
import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { FileText, Download, ArrowRight, Sparkles, CheckCircle2, Clock, Trash2, Check, Briefcase } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { getAllReports, getActiveReport, setActiveReport, deleteReport, BusinessReport } from '@/lib/report-store'

export default function ReportsIndexPage() {
  const { t } = useLanguage()
  const [reportsList, setReportsList] = useState<BusinessReport[]>([])
  const [activeReportId, setActiveReportId] = useState<string>('')

  const loadReports = () => {
    const list = getAllReports()
    setReportsList(list)
    const active = getActiveReport()
    setActiveReportId(active.id)
  }

  useEffect(() => {
    loadReports()

    const handleReportChange = () => {
      loadReports()
    }

    window.addEventListener('gs_report_changed', handleReportChange)
    return () => window.removeEventListener('gs_report_changed', handleReportChange)
  }, [])

  const handleSelectActive = (id: string) => {
    setActiveReport(id)
    setActiveReportId(id)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (confirm('Are you sure you want to remove this feasibility appraisal?')) {
      const updated = deleteReport(id)
      setReportsList(updated)
      const currentActive = getActiveReport()
      setActiveReportId(currentActive.id)
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {reportsList.length} Business {reportsList.length === 1 ? 'Appraisal' : 'Appraisals'} Available
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-1">{t('reports.title')}</h1>
            <p className="text-xs text-gray-500 mt-0.5">{t('reports.subtitle')}</p>
          </div>
          <Link
            href="/wizard"
            className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> {t('reports.runNew')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportsList.map((r) => {
            const isActive = r.id === activeReportId
            return (
              <div
                key={r.id}
                className={`bg-white p-6 rounded-3xl border transition shadow-sm space-y-4 flex flex-col justify-between relative ${
                  isActive
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-emerald-100/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isActive
                            ? 'bg-emerald-700 text-white'
                            : r.status === 'Active Custom'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {isActive ? 'CURRENT ACTIVE' : r.status === 'Active Custom' ? t('reports.activeCustom') : r.id}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">
                        {r.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        Score: {r.feasibilityScore}/100
                      </span>
                      {!r.isDemo && (
                        <button
                          onClick={(e) => handleDelete(r.id, e)}
                          title="Delete appraisal"
                          className="p-1 text-gray-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 text-base mt-2.5 leading-snug">{r.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <span>📍 {r.location}</span>
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t text-xs">
                    <div>
                      <span className="text-gray-400">Scheme:</span>
                      <p className="font-semibold text-gray-800 truncate" title={r.scheme}>{r.scheme}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Project Sizing:</span>
                      <p className="font-semibold text-gray-800">₹{r.projectCost.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Own Margin (10%):</span>
                      <p className="font-semibold text-gray-800">₹{r.marginCapital.toLocaleString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Loan (90%):</span>
                      <p className="font-semibold text-emerald-700">₹{r.loanAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{r.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!isActive && (
                      <button
                        onClick={() => handleSelectActive(r.id)}
                        className="text-[11px] font-semibold text-gray-600 hover:text-emerald-700 bg-gray-100 hover:bg-emerald-50 px-2.5 py-1.5 rounded-xl transition"
                      >
                        Select Active
                      </button>
                    )}
                    <Link
                      href={`/report?id=${r.id}`}
                      onClick={() => handleSelectActive(r.id)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition"
                    >
                      {t('reports.viewDossier')} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AppShell>
  )
}
