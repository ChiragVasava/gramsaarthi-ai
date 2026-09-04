// =====================================================
// REPORT STORE & MULTI-BUSINESS PERSISTENCE ENGINE
// Real-Time Local & Server Synchronization for GramSaarthi AI
// =====================================================

export interface BusinessReport {
  id: string
  title: string
  category: string
  entrepreneur: string
  location: string
  state: string
  district: string
  block?: string
  village?: string
  experience?: string
  distribution?: string
  applicantCategory?: string
  marginCapital: number
  marginPercent: number
  fundingPercent: number
  projectCost: number
  loanAmount: number
  scheme: string // 'micro' | 'term' | 'Term Loan Scheme' | 'Micro Finance Scheme'
  interestRate: number
  tenureYears: number
  moratoriumMonths: number
  interestWaivedDuringMoratorium: boolean
  emiMonthly: number
  feasibilityScore: number
  marketScore: number
  financialScore: number
  riskScore: number
  date: string
  generatedAt: string
  status: 'Active Custom' | 'Baseline' | 'Draft'
  isDemo?: boolean
}

export const BASELINE_REPORTS: BusinessReport[] = [
  {
    id: 'GS-2026-P11',
    title: 'Dairy Enterprise Feasibility & Debt Structuring Dossier',
    category: 'Dairy',
    entrepreneur: 'Rajesh Patel',
    location: 'Savli, Vadodara, Gujarat',
    state: 'Gujarat',
    district: 'Vadodara',
    block: 'Savli',
    village: 'Tarsali',
    experience: 'Family / Informal Exposure',
    distribution: 'Direct Retail & Cooperative Offtake',
    applicantCategory: 'general',
    marginCapital: 100000,
    marginPercent: 0.10,
    fundingPercent: 90,
    projectCost: 1000000,
    loanAmount: 900000,
    scheme: 'Term Loan Scheme',
    interestRate: 8.0,
    tenureYears: 7,
    moratoriumMonths: 6,
    interestWaivedDuringMoratorium: false,
    emiMonthly: 14025,
    feasibilityScore: 84,
    marketScore: 88,
    financialScore: 82,
    riskScore: 28,
    date: '15 Jan 2026',
    generatedAt: '2026-01-15T10:00:00.000Z',
    status: 'Baseline',
    isDemo: true,
  },
  {
    id: 'GS-2026-M04',
    title: 'Flour Milling & Spice Micro-Processing Unit',
    category: 'Food Processing',
    entrepreneur: 'Rajesh Patel',
    location: 'Padra, Vadodara, Gujarat',
    state: 'Gujarat',
    district: 'Vadodara',
    block: 'Padra',
    village: 'Mobha',
    experience: 'Prior Enterprise Worker',
    distribution: 'Local Mandi & Retail Grocers',
    applicantCategory: 'general',
    marginCapital: 12000,
    marginPercent: 0.10,
    fundingPercent: 90,
    projectCost: 120000,
    loanAmount: 108000,
    scheme: 'Micro Finance Scheme',
    interestRate: 6.5,
    tenureYears: 3,
    moratoriumMonths: 3,
    interestWaivedDuringMoratorium: false,
    emiMonthly: 3310,
    feasibilityScore: 79,
    marketScore: 82,
    financialScore: 78,
    riskScore: 32,
    date: '02 Feb 2026',
    generatedAt: '2026-02-02T14:30:00.000Z',
    status: 'Baseline',
    isDemo: true,
  },
]

export function computeDynamicScore(data: {
  category: string
  marginCapital: number
  projectCost: number
  experience?: string
  distribution?: string
}): { feasibilityScore: number; marketScore: number; financialScore: number; riskScore: number } {
  const baseMap: Record<string, number> = {
    Dairy: 82,
    'Food Processing': 80,
    'Goat Rearing': 76,
    'Solar Agriculture': 85,
    Poultry: 77,
    Tailoring: 75,
    Carpentry: 76,
    Pottery: 74,
  }

  let base = baseMap[data.category] || 78

  // Equity cushion modifier
  const equityRatio = data.projectCost > 0 ? data.marginCapital / data.projectCost : 0.1
  if (equityRatio >= 0.15) base += 4
  else if (equityRatio >= 0.12) base += 2

  // Experience modifier
  const exp = (data.experience || '').toLowerCase()
  if (exp.includes('prior') || exp.includes('experienced') || exp.includes('worker')) base += 3
  else if (exp.includes('family') || exp.includes('informal')) base += 2

  // Distribution modifier
  const dist = (data.distribution || '').toLowerCase()
  if (dist.includes('cooperative') || dist.includes('mandi') || dist.includes('retail')) base += 2

  // Score clamping
  const feasibilityScore = Math.min(96, Math.max(68, base))
  const marketScore = Math.min(95, Math.max(65, feasibilityScore + Math.floor(Math.random() * 6) - 2))
  const financialScore = Math.min(95, Math.max(65, feasibilityScore - Math.floor(Math.random() * 5) + 1))
  const riskScore = Math.max(18, Math.min(48, 100 - feasibilityScore + 10))

  return { feasibilityScore, marketScore, financialScore, riskScore }
}

export function getAllReports(): BusinessReport[] {
  if (typeof window === 'undefined') return BASELINE_REPORTS

  try {
    const raw = localStorage.getItem('gs_reports')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }

    // Check if legacy single gs_analysis exists
    const legacy = localStorage.getItem('gs_analysis')
    if (legacy) {
      const p = JSON.parse(legacy)
      const userStr = localStorage.getItem('gs_user')
      let entName = 'Rajesh Patel'
      if (userStr) {
        try {
          const u = JSON.parse(userStr)
          if (u.name) entName = u.name
        } catch {}
      }

      const scores = computeDynamicScore({
        category: p.category || 'Food Processing',
        marginCapital: p.marginCapital || 50000,
        projectCost: p.projectCost || 500000,
        experience: p.experience,
        distribution: p.distribution,
      })

      const convertedReport: BusinessReport = {
        id: p.id || `GS-${Date.now().toString(36).toUpperCase()}`,
        title: `${p.category || 'Rural'} Enterprise Feasibility Dossier`,
        category: p.category || 'Food Processing',
        entrepreneur: entName,
        location: `${p.village ? p.village + ', ' : ''}${p.block ? p.block + ', ' : ''}${p.district || 'Vadodara'}, ${p.state || 'Gujarat'}`,
        state: p.state || 'Gujarat',
        district: p.district || 'Vadodara',
        block: p.block || '',
        village: p.village || '',
        experience: p.experience || 'Family / Informal Exposure',
        distribution: p.distribution || 'Local Mandi & Direct Retail',
        applicantCategory: p.applicantCategory || 'general',
        marginCapital: p.marginCapital || 50000,
        marginPercent: p.marginPercent || 0.10,
        fundingPercent: p.fundingPercent || 90,
        projectCost: p.projectCost || 500000,
        loanAmount: p.loanAmount || 450000,
        scheme: p.scheme === 'micro' ? 'Micro Finance Scheme' : 'Term Loan Scheme',
        interestRate: p.interestRate || 8.0,
        tenureYears: p.tenureYears || 7,
        moratoriumMonths: p.moratoriumMonths || 6,
        interestWaivedDuringMoratorium: p.interestWaivedDuringMoratorium || false,
        emiMonthly: p.emiMonthly || 7417,
        feasibilityScore: p.feasibilityScore || scores.feasibilityScore,
        marketScore: scores.marketScore,
        financialScore: scores.financialScore,
        riskScore: scores.riskScore,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        generatedAt: p.generatedAt || new Date().toISOString(),
        status: 'Active Custom',
      }

      const combined = [convertedReport, ...BASELINE_REPORTS]
      localStorage.setItem('gs_reports', JSON.stringify(combined))
      localStorage.setItem('gs_active_report_id', convertedReport.id)
      return combined
    }

    // Default fallback
    localStorage.setItem('gs_reports', JSON.stringify(BASELINE_REPORTS))
    localStorage.setItem('gs_active_report_id', BASELINE_REPORTS[0].id)
    return BASELINE_REPORTS
  } catch (err) {
    console.error('Failed to parse gs_reports:', err)
    return BASELINE_REPORTS
  }
}

export function getReportById(id: string): BusinessReport | null {
  const reports = getAllReports()
  const found = reports.find((r) => r.id === id)
  return found || null
}

export function getActiveReport(): BusinessReport {
  const reports = getAllReports()
  if (reports.length === 0) return BASELINE_REPORTS[0]

  if (typeof window === 'undefined') return reports[0]

  const activeId = localStorage.getItem('gs_active_report_id')
  if (activeId) {
    const matched = reports.find((r) => r.id === activeId)
    if (matched) return matched
  }

  // Fallback to first report
  return reports[0]
}

export function setActiveReport(id: string): BusinessReport | null {
  const reports = getAllReports()
  const matched = reports.find((r) => r.id === id)
  if (!matched) return null

  if (typeof window !== 'undefined') {
    localStorage.setItem('gs_active_report_id', id)
    // Synchronize legacy gs_analysis key for backwards compatibility
    localStorage.setItem('gs_analysis', JSON.stringify(matched))
    // Notify all active listeners across UI
    window.dispatchEvent(new CustomEvent('gs_report_changed', { detail: matched }))
  }

  return matched
}

export function saveNewReport(data: Partial<BusinessReport>): BusinessReport {
  const reports = getAllReports()

  let entName = data.entrepreneur || 'Rajesh Patel'
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('gs_user')
    if (userStr) {
      try {
        const u = JSON.parse(userStr)
        if (u.name) entName = u.name
      } catch {}
    }
  }

  const scores = computeDynamicScore({
    category: data.category || 'Dairy',
    marginCapital: data.marginCapital || 50000,
    projectCost: data.projectCost || 500000,
    experience: data.experience,
    distribution: data.distribution,
  })

  const loc = `${data.village ? data.village + ', ' : ''}${data.block ? data.block + ', ' : ''}${data.district || 'Vadodara'}, ${data.state || 'Gujarat'}`

  const newReport: BusinessReport = {
    id: data.id || `GS-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
    title: data.title || `${data.category || 'Rural'} Enterprise Feasibility Dossier`,
    category: data.category || 'Dairy',
    entrepreneur: entName,
    location: loc,
    state: data.state || 'Gujarat',
    district: data.district || 'Vadodara',
    block: data.block || '',
    village: data.village || '',
    experience: data.experience || 'Family / Informal Exposure',
    distribution: data.distribution || 'Local Mandi & Direct Retail',
    applicantCategory: data.applicantCategory || 'general',
    marginCapital: data.marginCapital || 50000,
    marginPercent: data.marginPercent || 0.10,
    fundingPercent: data.fundingPercent || 90,
    projectCost: data.projectCost || 500000,
    loanAmount: data.loanAmount || 450000,
    scheme: data.scheme === 'micro' || data.scheme === 'Micro Finance Scheme' ? 'Micro Finance Scheme' : 'Term Loan Scheme',
    interestRate: data.interestRate || 8.0,
    tenureYears: data.tenureYears || 7,
    moratoriumMonths: data.moratoriumMonths || 6,
    interestWaivedDuringMoratorium: data.interestWaivedDuringMoratorium || false,
    emiMonthly: data.emiMonthly || 7417,
    feasibilityScore: data.feasibilityScore || scores.feasibilityScore,
    marketScore: scores.marketScore,
    financialScore: scores.financialScore,
    riskScore: scores.riskScore,
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    generatedAt: new Date().toISOString(),
    status: 'Active Custom',
    isDemo: false,
  }

  // Prepend to list
  const updatedList = [newReport, ...reports.filter((r) => r.id !== newReport.id)]

  if (typeof window !== 'undefined') {
    localStorage.setItem('gs_reports', JSON.stringify(updatedList))
    localStorage.setItem('gs_active_report_id', newReport.id)
    localStorage.setItem('gs_analysis', JSON.stringify(newReport))
    window.dispatchEvent(new CustomEvent('gs_report_changed', { detail: newReport }))

    // Async sync to server database
    syncReportWithServer(newReport).catch((e) => console.warn('Server sync error (offline-safe):', e))
  }

  return newReport
}

export function deleteReport(id: string): BusinessReport[] {
  const reports = getAllReports()
  const updated = reports.filter((r) => r.id !== id)

  if (typeof window !== 'undefined') {
    localStorage.setItem('gs_reports', JSON.stringify(updated))
    const currentActiveId = localStorage.getItem('gs_active_report_id')
    if (currentActiveId === id && updated.length > 0) {
      setActiveReport(updated[0].id)
    }
    window.dispatchEvent(new CustomEvent('gs_report_changed', { detail: updated[0] || null }))
  }

  return updated
}

export async function syncReportWithServer(report: BusinessReport): Promise<void> {
  try {
    await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    })
  } catch (err) {
    console.warn('Could not sync report to backend database:', err)
  }
}
