"use client"

import AppShell from '@/components/layout/AppShell'
import Link from 'next/link'
import { FileText, Download, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

export default function ReportsIndexPage() {
  const reports = [
    {
      id: 'GS-2026-P11',
      title: 'Dairy Enterprise Feasibility & Debt Structuring Dossier',
      location: 'Savli, Vadodara, Gujarat',
      date: 'Generated Today',
      score: 84,
      scheme: 'Term Loan Scheme (8.0% p.a.)',
      projectCost: '₹10,00,000',
      status: 'Ready'
    },
    {
      id: 'GS-2026-M04',
      title: 'Flour Milling & Spice Micro-Processing Unit',
      location: 'Padra, Vadodara, Gujarat',
      date: 'Archived Demo',
      score: 79,
      scheme: 'Micro Finance Scheme (6.5% p.a.)',
      projectCost: '₹1,20,000',
      status: 'Archived'
    }
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Saved Feasibility Dossiers</h1>
            <p className="text-xs text-gray-500 mt-1">Access or export pre-compiled candidate appraisals for presentation</p>
          </div>
          <Link
            href="/wizard"
            className="text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Run New Appraisal
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((r) => (
            <div key={r.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                    {r.id}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Score: {r.score}/100
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mt-2">{r.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{r.location}</p>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t text-xs">
                  <div>
                    <span className="text-gray-400">Scheme:</span>
                    <p className="font-semibold text-gray-800">{r.scheme}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Project Size:</span>
                    <p className="font-semibold text-gray-800">{r.projectCost}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t flex gap-2">
                <Link
                  href="/report"
                  className="flex-1 text-center bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs py-2.5 rounded-xl transition"
                >
                  Examine Dossier
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
