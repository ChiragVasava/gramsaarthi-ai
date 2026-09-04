// =====================================================
// FINANCIAL ENGINE — GramSaarthi AI
// Deterministic calculations — NO AI delegation
// Statutory National Concessional Credit Guidelines
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
  interestWaivedDuringMoratorium: boolean // Explicit flag: true = waived, false = capitalized into principal
}

export interface FinancialCalculation {
  marginCapital: number
  marginPercent: number       // Resolved margin fraction (e.g. 0.10 for 10%)
  requiredFloorMarginPercent: number // Statutory minimum floor for this category/scheme
  isMarginOverridden: boolean // True if user voluntarily contributed above required floor
  projectCost: number
  loanAmount: number
  fundingPercent: number      // Effective loan fraction as % (e.g. 90 or 95)
  scheme: LoanScheme | null
  schemeCode: SchemeCode
  interestRate: number
  tenureYears: number
  moratoriumMonths: number
  interestWaivedDuringMoratorium: boolean
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

// -----------------------------------------------------
// CONFIGURABLE MARGIN SPECIFICATION (Bug 1 Fix)
// -----------------------------------------------------
export type ApplicantCategory =
  | 'general'
  | 'special'
  | 'sc_st'
  | 'obc'
  | 'women'
  | 'minority'
  | 'differently_abled'
  | string

export interface MarginSlab {
  upToCost?: number
  minMarginPercent: number // e.g. 0.05 for 5%
}

export interface CategoryMarginConfig {
  defaultMarginPercent: number
  byScheme?: Partial<Record<SchemeCode, number>>
  slabs?: MarginSlab[]
}

export interface MarginConfig {
  defaultMarginPercent: number
  categories: Record<string, CategoryMarginConfig>
}

/**
 * Centrally configured, easily editable margin lookup table.
 * Sensible placeholder defaults: General = 10%, Special categories = 5%.
 */
export const MARGIN_CONFIG: MarginConfig = {
  defaultMarginPercent: 0.10, // 10% default
  categories: {
    general: {
      defaultMarginPercent: 0.10,
      byScheme: {
        micro: 0.10,
        term: 0.10,
      },
    },
    special: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
    sc_st: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
    obc: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
    women: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
    minority: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
    differently_abled: {
      defaultMarginPercent: 0.05,
      byScheme: {
        micro: 0.05,
        term: 0.05,
      },
    },
  },
}

// -----------------------------------------------------
// STATUTORY SCHEME DEFINITIONS (Bug 2 Fix)
// -----------------------------------------------------
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
    interestWaivedDuringMoratorium: false, // Standard practice: repayment holiday with capitalized interest
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
    interestWaivedDuringMoratorium: false, // Standard practice: repayment holiday with capitalized interest
  },
}

// -----------------------------------------------------
// MARGIN RESOLUTION LOGIC
// -----------------------------------------------------
export interface MarginResolutionParams {
  category?: string
  scheme?: SchemeCode
  projectCost?: number
  userOverridePercent?: number // Voluntary higher contribution
}

/**
 * Resolve required statutory minimum margin floor for an applicant category, scheme, and project cost slab
 */
export function resolveRequiredMarginPercent(
  category?: string,
  scheme?: SchemeCode,
  projectCost?: number,
  config: MarginConfig = MARGIN_CONFIG
): number {
  const normCategory = (category || 'general').toLowerCase().trim()
  const catConfig = config.categories[normCategory] || config.categories['general']

  // 1. Check slabs if defined and projectCost provided
  if (projectCost !== undefined && catConfig.slabs && catConfig.slabs.length > 0) {
    for (const slab of catConfig.slabs) {
      if (slab.upToCost === undefined || projectCost <= slab.upToCost) {
        return slab.minMarginPercent
      }
    }
  }

  // 2. Check scheme-specific margin
  if (scheme && catConfig.byScheme && catConfig.byScheme[scheme] !== undefined) {
    return catConfig.byScheme[scheme]!
  }

  // 3. Category default
  if (catConfig.defaultMarginPercent !== undefined) {
    return catConfig.defaultMarginPercent
  }

  return config.defaultMarginPercent
}

/**
 * Resolve effective margin % considering category floor and voluntary user override
 */
export function resolveMarginPercent(
  params: MarginResolutionParams,
  config: MarginConfig = MARGIN_CONFIG
): { requiredFloor: number; effectiveMarginPercent: number; isOverride: boolean } {
  const requiredFloor = resolveRequiredMarginPercent(
    params.category,
    params.scheme,
    params.projectCost,
    config
  )

  let effectiveMarginPercent = requiredFloor
  let isOverride = false

  if (params.userOverridePercent !== undefined && params.userOverridePercent > 0) {
    // Normalize percentage (e.g. if passed 15 instead of 0.15)
    const override = params.userOverridePercent > 1
      ? params.userOverridePercent / 100
      : params.userOverridePercent

    if (override >= requiredFloor) {
      effectiveMarginPercent = override
      isOverride = effectiveMarginPercent > requiredFloor
    }
  }

  return {
    requiredFloor,
    effectiveMarginPercent,
    isOverride,
  }
}

/**
 * Calculate project cost from margin capital and dynamic margin percentage
 * P = Margin ÷ marginPercent
 */
export function calculateProjectCost(marginCapital: number, marginPercent: number = 0.10): number {
  if (marginCapital <= 0 || marginPercent <= 0) return 0
  return Math.round(marginCapital / marginPercent)
}

/**
 * Calculate loan amount from project cost and dynamic margin percentage
 * L = P × (1 - marginPercent)
 */
export function calculateLoanAmount(projectCost: number, marginPercent: number = 0.10): number {
  if (projectCost <= 0) return 0
  return Math.round(projectCost * (1 - marginPercent))
}

/**
 * Select appropriate scheme based strictly on project cost
 * Boundary: <= ₹1,40,000 -> Micro Finance | ₹1,40,000 - ₹50,00,000 -> Term Loan
 */
export function selectScheme(projectCost: number): SchemeCode {
  if (projectCost <= 0) return 'out_of_range'
  if (projectCost <= 140000) return 'micro'
  if (projectCost <= 5000000) return 'term'
  return 'out_of_range'
}

/**
 * Calculate monthly EMI with proper moratorium interest capitalization (Bug 2 Fix)
 * 
 * When interest is NOT waived during moratorium (repayment holiday):
 *   accruedInterest = principal × annualRate × (moratoriumMonths / 12)
 *   adjustedPrincipal = principal + accruedInterest
 *   EMI = adjustedPrincipal × r × (1+r)^n / ((1+r)^n - 1)
 *   where r = annualRate / 12, n = tenureMonths - moratoriumMonths
 * 
 * When interest IS waived during moratorium (interest waiver):
 *   adjustedPrincipal = principal
 *   EMI = principal × r × (1+r)^n / ((1+r)^n - 1)
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureYears: number,
  moratoriumMonths: number,
  interestWaivedDuringMoratorium: boolean = false
): number {
  if (principal <= 0) return 0
  const totalMonths = tenureYears * 12
  const emiMonths = totalMonths - moratoriumMonths
  if (emiMonths <= 0) return 0

  const monthlyRate = annualRate / 100 / 12
  if (monthlyRate === 0) return Math.round(principal / emiMonths)

  let adjustedPrincipal = principal
  if (!interestWaivedDuringMoratorium && moratoriumMonths > 0) {
    const accruedInterest = principal * (annualRate / 100) * (moratoriumMonths / 12)
    adjustedPrincipal = principal + accruedInterest
  }

  const emi = (adjustedPrincipal * monthlyRate * Math.pow(1 + monthlyRate, emiMonths)) /
    (Math.pow(1 + monthlyRate, emiMonths) - 1)

  return Math.round(emi)
}

export interface FinancialOptions {
  category?: string
  userOverridePercent?: number
  interestWaivedOverride?: boolean
  marginConfig?: MarginConfig
}

/**
 * Main calculation function — computes project cost, loan amount, scheme routing,
 * and monthly EMI with dynamic margin % and moratorium handling.
 */
export function calculateFinancials(
  marginCapital: number,
  options?: FinancialOptions | string
): FinancialCalculation {
  const opts: FinancialOptions = typeof options === 'string'
    ? { category: options }
    : (options || {})

  const category = opts.category || 'general'
  const config = opts.marginConfig || MARGIN_CONFIG

  // Validate input
  if (!marginCapital || marginCapital <= 0) {
    return {
      marginCapital: 0,
      marginPercent: 0.10,
      requiredFloorMarginPercent: 0.10,
      isMarginOverridden: false,
      projectCost: 0,
      loanAmount: 0,
      fundingPercent: 90,
      scheme: null,
      schemeCode: 'out_of_range',
      interestRate: 0,
      tenureYears: 0,
      moratoriumMonths: 0,
      interestWaivedDuringMoratorium: false,
      emiMonthly: 0,
      totalRepayable: 0,
      totalInterest: 0,
      tenureMonths: 0,
      isValid: false,
      errorMessage: 'Please enter a valid margin capital amount.',
    }
  }

  // 1. Resolve margin % independently from scheme routing
  // Test micro scheme qualification first
  const microMarginRes = resolveMarginPercent(
    { category, scheme: 'micro', userOverridePercent: opts.userOverridePercent },
    config
  )
  const estCostMicro = calculateProjectCost(marginCapital, microMarginRes.effectiveMarginPercent)

  let candidateScheme: SchemeCode
  let effectiveMargin = microMarginRes.effectiveMarginPercent
  let isOverride = microMarginRes.isOverride
  let requiredFloor = microMarginRes.requiredFloor

  if (estCostMicro <= 140000) {
    candidateScheme = 'micro'
  } else {
    candidateScheme = 'term'
    const termMarginRes = resolveMarginPercent(
      { category, scheme: 'term', userOverridePercent: opts.userOverridePercent },
      config
    )
    effectiveMargin = termMarginRes.effectiveMarginPercent
    isOverride = termMarginRes.isOverride
    requiredFloor = termMarginRes.requiredFloor
  }

  // 2. Compute project cost and loan amount
  const projectCost = calculateProjectCost(marginCapital, effectiveMargin)
  const schemeCode = selectScheme(projectCost)

  // Re-verify margin in case slab rules exist for final project cost
  const finalMarginRes = resolveMarginPercent(
    { category, scheme: schemeCode, projectCost, userOverridePercent: opts.userOverridePercent },
    config
  )
  const finalMarginPercent = finalMarginRes.effectiveMarginPercent
  const finalProjectCost = calculateProjectCost(marginCapital, finalMarginPercent)
  const finalLoanAmount = calculateLoanAmount(finalProjectCost, finalMarginPercent)
  const fundingPercent = Math.round((1 - finalMarginPercent) * 100)

  if (schemeCode === 'out_of_range') {
    return {
      marginCapital,
      marginPercent: finalMarginPercent,
      requiredFloorMarginPercent: finalMarginRes.requiredFloor,
      isMarginOverridden: finalMarginRes.isOverride,
      projectCost: finalProjectCost,
      loanAmount: finalLoanAmount,
      fundingPercent,
      scheme: null,
      schemeCode,
      interestRate: 0,
      tenureYears: 0,
      moratoriumMonths: 0,
      interestWaivedDuringMoratorium: false,
      emiMonthly: 0,
      totalRepayable: 0,
      totalInterest: 0,
      tenureMonths: 0,
      isValid: false,
      errorMessage: `Project cost of ₹${finalProjectCost.toLocaleString('en-IN')} exceeds the supported maximum of ₹50 lakh. Please contact a specialized financial institution.`,
    }
  }

  const scheme = SCHEMES[schemeCode]
  const interestWaived = opts.interestWaivedOverride !== undefined
    ? opts.interestWaivedOverride
    : scheme.interestWaivedDuringMoratorium

  const emiMonthly = calculateEMI(
    finalLoanAmount,
    scheme.interestRate,
    scheme.tenureYears,
    scheme.moratoriumMonths,
    interestWaived
  )

  const tenureMonths = scheme.tenureYears * 12 - scheme.moratoriumMonths
  const totalRepayable = emiMonthly * tenureMonths
  const totalInterest = totalRepayable - finalLoanAmount

  return {
    marginCapital,
    marginPercent: finalMarginPercent,
    requiredFloorMarginPercent: finalMarginRes.requiredFloor,
    isMarginOverridden: finalMarginRes.isOverride,
    projectCost: finalProjectCost,
    loanAmount: finalLoanAmount,
    fundingPercent,
    scheme,
    schemeCode,
    interestRate: scheme.interestRate,
    tenureYears: scheme.tenureYears,
    moratoriumMonths: scheme.moratoriumMonths,
    interestWaivedDuringMoratorium: interestWaived,
    emiMonthly,
    totalRepayable: Math.round(totalRepayable),
    totalInterest: Math.round(totalInterest),
    tenureMonths,
    isValid: true,
  }
}

/**
 * Generate quarterly repayment schedule with correct moratorium interest modeling
 */
export function generateRepaymentSchedule(
  loanAmount: number,
  annualRate: number,
  tenureYears: number,
  moratoriumMonths: number,
  interestWaivedDuringMoratorium: boolean = false
): RepaymentScheduleRow[] {
  const schedule: RepaymentScheduleRow[] = []
  const emiMonthly = calculateEMI(
    loanAmount,
    annualRate,
    tenureYears,
    moratoriumMonths,
    interestWaivedDuringMoratorium
  )
  const monthlyRate = annualRate / 100 / 12
  let balance = loanAmount
  const totalMonths = tenureYears * 12

  // Add moratorium quarters
  const moratoriumQuarters = Math.ceil(moratoriumMonths / 3)
  for (let q = 1; q <= moratoriumQuarters; q++) {
    if (interestWaivedDuringMoratorium) {
      // Interest waived: balance remains unchanged, no interest accumulated to principal
      schedule.push({
        period: q,
        payment: 0,
        principal: 0,
        interest: 0,
        balance: Math.round(balance),
        isMoratorium: true,
      })
    } else {
      // Interest capitalized: interest accrues during repayment holiday and is added to balance
      const qInterest = balance * monthlyRate * 3
      balance += qInterest
      schedule.push({
        period: q,
        payment: 0,
        principal: 0,
        interest: Math.round(qInterest),
        balance: Math.round(balance),
        isMoratorium: true,
      })
    }
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
