// =====================================================
// FINANCIAL ENGINE — GramSaarthi AI
// Deterministic calculations — NO AI delegation
// =====================================================

export type SchemeCode = 'micro' | 'term' | 'out_of_range'

export interface LoanScheme {
  code: SchemeCode
  name: string
  interestRate: number    // annual %
  tenureYears: number
  moratoriumMonths: number
  maxProjectCost: number
  maxLoanAmount: number
  fundingPercent: number
}

export interface FinancialCalculation {
  marginCapital: number
  projectCost: number
  loanAmount: number
  scheme: LoanScheme | null
  schemeCode: SchemeCode
  interestRate: number
  tenureYears: number
  moratoriumMonths: number
  emiMonthly: number
  totalRepayable: number
  totalInterest: number
  tenureMonths: number       // actual EMI-paying months
  isValid: boolean
  errorMessage?: string
}

export interface RepaymentScheduleRow {
  period: number             // quarter number
  payment: number
  principal: number
  interest: number
  balance: number
  isMoratorium: boolean
}

export const SCHEMES: Record<string, LoanScheme> = {
  micro: {
    code: 'micro',
    name: 'Micro Finance Scheme',
    interestRate: 6.5,
    tenureYears: 3,
    moratoriumMonths: 3,
    maxProjectCost: 140000,
    maxLoanAmount: 125000,
    fundingPercent: 90,
  },
  term: {
    code: 'term',
    name: 'Term Loan Scheme',
    interestRate: 8.0,
    tenureYears: 7,
    moratoriumMonths: 6,
    maxProjectCost: 5000000,
    maxLoanAmount: 4500000,
    fundingPercent: 90,
  },
}

/**
 * Calculate project cost from margin capital (10% contribution)
 */
export function calculateProjectCost(marginCapital: number): number {
  if (marginCapital <= 0) return 0
  return marginCapital / 0.10
}

/**
 * Calculate loan amount (90% of project cost)
 */
export function calculateLoanAmount(projectCost: number): number {
  return projectCost * 0.90
}

/**
 * Select appropriate scheme based on project cost
 */
export function selectScheme(projectCost: number): SchemeCode {
  if (projectCost <= 0) return 'out_of_range'
  if (projectCost <= 140000) return 'micro'
  if (projectCost <= 5000000) return 'term'
  return 'out_of_range'
}

/**
 * Calculate monthly EMI using standard formula
 * EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number,
  moratoriumMonths: number
): number {
  if (principal <= 0) return 0
  const totalMonths = tenureYears * 12
  const emiMonths = totalMonths - moratoriumMonths
  if (emiMonths <= 0) return 0

  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return principal / emiMonths

  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, emiMonths)) /
    (Math.pow(1 + monthlyRate, emiMonths) - 1)

  return Math.round(emi)
}

/**
 * Main calculation function — runs everything
 */
export function calculateFinancials(marginCapital: number): FinancialCalculation {
  // Validate input
  if (!marginCapital || marginCapital <= 0) {
    return {
      marginCapital: 0, projectCost: 0, loanAmount: 0,
      scheme: null, schemeCode: 'out_of_range',
      interestRate: 0, tenureYears: 0, moratoriumMonths: 0,
      emiMonthly: 0, totalRepayable: 0, totalInterest: 0, tenureMonths: 0,
      isValid: false, errorMessage: 'Please enter a valid margin capital amount.',
    }
  }

  const projectCost = calculateProjectCost(marginCapital)
  const loanAmount = calculateLoanAmount(projectCost)
  const schemeCode = selectScheme(projectCost)

  if (schemeCode === 'out_of_range') {
    return {
      marginCapital, projectCost, loanAmount,
      scheme: null, schemeCode,
      interestRate: 0, tenureYears: 0, moratoriumMonths: 0,
      emiMonthly: 0, totalRepayable: 0, totalInterest: 0, tenureMonths: 0,
      isValid: false,
      errorMessage: `Project cost of ₹${projectCost.toLocaleString('en-IN')} exceeds the supported maximum of ₹50 lakh. Please contact a specialized financial institution.`,
    }
  }

  const scheme = SCHEMES[schemeCode]
  const emiMonthly = calculateEMI(loanAmount, scheme.interestRate, scheme.tenureYears, scheme.moratoriumMonths)
  const tenureMonths = scheme.tenureYears * 12 - scheme.moratoriumMonths
  const totalRepayable = emiMonthly * tenureMonths
  const totalInterest = totalRepayable - loanAmount

  return {
    marginCapital, projectCost, loanAmount,
    scheme, schemeCode,
    interestRate: scheme.interestRate,
    tenureYears: scheme.tenureYears,
    moratoriumMonths: scheme.moratoriumMonths,
    emiMonthly, totalRepayable: Math.round(totalRepayable),
    totalInterest: Math.round(totalInterest),
    tenureMonths,
    isValid: true,
  }
}

/**
 * Generate quarterly repayment schedule
 */
export function generateRepaymentSchedule(
  loanAmount: number,
  annualRate: number,
  tenureYears: number,
  moratoriumMonths: number
): RepaymentScheduleRow[] {
  const schedule: RepaymentScheduleRow[] = []
  const emiMonthly = calculateEMI(loanAmount, annualRate, tenureYears, moratoriumMonths)
  const monthlyRate = annualRate / 100 / 12
  let balance = loanAmount
  const totalMonths = tenureYears * 12

  // Add moratorium quarters
  const moratoriumQuarters = Math.ceil(moratoriumMonths / 3)
  for (let q = 1; q <= moratoriumQuarters; q++) {
    const qInterest = balance * monthlyRate * 3
    schedule.push({
      period: q,
      payment: 0,
      principal: 0,
      interest: Math.round(qInterest),
      balance: Math.round(balance + qInterest),
      isMoratorium: true,
    })
    balance += qInterest
  }

  // EMI-paying quarters
  const emiMonths = totalMonths - moratoriumMonths
  const emiQuarters = Math.floor(emiMonths / 3)

  for (let q = 1; q <= Math.min(emiQuarters, 20); q++) {
    const qInterest = balance * monthlyRate * 3
    const qPayment = emiMonthly * 3
    const qPrincipal = qPayment - qInterest
    balance = Math.max(0, balance - qPrincipal)

    schedule.push({
      period: moratoriumQuarters + q,
      payment: Math.round(qPayment),
      principal: Math.round(qPrincipal),
      interest: Math.round(qInterest),
      balance: Math.round(balance),
      isMoratorium: false,
    })
  }

  return schedule
}

/**
 * Calculate working capital recommendation
 */
export function calculateWorkingCapital(
  projectCost: number,
  category: string
): { monthly: number; buffer: number; total: number; breakdown: Record<string, number> } {
  const workingCapitalRatios: Record<string, number> = {
    'Dairy': 0.08,
    'Retail': 0.12,
    'Textile': 0.10,
    'Agriculture': 0.07,
    'Food Processing': 0.09,
    'Handicrafts': 0.06,
    'Beauty': 0.08,
    'Manufacturing': 0.11,
    'Services': 0.07,
    'Other': 0.09,
  }

  const ratio = workingCapitalRatios[category] || 0.09
  const monthly = Math.round(projectCost * ratio)
  const buffer = Math.round(monthly * 3)

  const breakdown: Record<string, number> = {
    'Raw Material / Inventory': Math.round(monthly * 0.45),
    'Labour / Wages': Math.round(monthly * 0.25),
    'Utilities & Overhead': Math.round(monthly * 0.15),
    'Transport & Marketing': Math.round(monthly * 0.10),
    'Contingency': Math.round(monthly * 0.05),
  }

  return { monthly, buffer, total: monthly + buffer, breakdown }
}
