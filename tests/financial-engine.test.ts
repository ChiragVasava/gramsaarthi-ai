// =====================================================
// FINANCIAL ENGINE UNIT TESTS — GramSaarthi AI
// Verifies:
// 1. EMI calculation with moratorium interest capitalization vs waiver
// 2. Scheme routing threshold boundary at ₹1.4 Lakh
// 3. Dynamic margin % resolution across applicant categories
// 4. Voluntary user margin override handling
// 5. Quarterly amortization schedule balance convergence
// =====================================================

import {
  calculateEMI,
  selectScheme,
  calculateFinancials,
  calculateProjectCost,
  calculateLoanAmount,
  resolveRequiredMarginPercent,
  resolveMarginPercent,
  generateRepaymentSchedule,
  MARGIN_CONFIG,
  SCHEMES,
} from '../lib/financial-engine'

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`FAIL: ${message}`)
  }
  console.log(`  PASS: ${message}`)
}

function runTests() {
  console.log('--- TEST SUITE: Module 2 Concessional Financial Engine ---\n')

  // -------------------------------------------------------------
  // Test Suite 1: Bug 2 — Moratorium Interest Capitalization vs Waiver
  // -------------------------------------------------------------
  console.log('1. Moratorium Interest Handling Test Cases:')

  // Prompt Test Case 1: ₹4,50,000, 8% p.a., 7 yr, 6 mo moratorium, Interest Waived
  // Expected EMI: ≈ ₹7,417–7,419
  const emiWaived = calculateEMI(450000, 8.0, 7, 6, true)
  assert(
    emiWaived >= 7417 && emiWaived <= 7419,
    `Interest Waived: Expected EMI ≈ ₹7,417–7,419, got ₹${emiWaived}`
  )

  // Prompt Test Case 2: ₹4,50,000, 8% p.a., 7 yr, 6 mo moratorium, Interest Capitalized
  // Accrued interest = 450,000 * 0.08 * (6/12) = ₹18,000
  // Adjusted Principal = ₹4,68,000
  // Expected EMI: ≈ ₹7,717 (exact formula yields ₹7,714)
  const emiCapitalized = calculateEMI(450000, 8.0, 7, 6, false)
  assert(
    emiCapitalized >= 7714 && emiCapitalized <= 7718,
    `Interest Capitalized: Expected EMI ≈ ₹7,717, got ₹${emiCapitalized}`
  )

  // Explicit flag configuration check
  assert(
    SCHEMES.term.interestWaivedDuringMoratorium === false,
    'Term Loan scheme defaults to interestWaivedDuringMoratorium: false (capitalized repayment holiday)'
  )

  // -------------------------------------------------------------
  // Test Suite 2: Scheme Routing at ₹1.4 Lakh Boundary
  // -------------------------------------------------------------
  console.log('\n2. Scheme Threshold Routing Boundary (₹1.4L):')

  assert(selectScheme(140000) === 'micro', 'Project Cost ₹1,40,000 routes to Micro Finance')
  assert(selectScheme(140001) === 'term', 'Project Cost ₹1,40,001 routes to Term Loan')
  assert(selectScheme(5000000) === 'term', 'Project Cost ₹50,00,000 routes to Term Loan')
  assert(selectScheme(5000001) === 'out_of_range', 'Project Cost ₹50,00,001 routes to out_of_range')
  assert(selectScheme(0) === 'out_of_range', 'Project Cost 0 routes to out_of_range')

  // Boundary via Margin Capital: General Category (10%)
  const finGeneralBoundary = calculateFinancials(14000, { category: 'general' })
  assert(
    finGeneralBoundary.projectCost === 140000 &&
    finGeneralBoundary.schemeCode === 'micro' &&
    finGeneralBoundary.loanAmount === 126000 &&
    finGeneralBoundary.fundingPercent === 90,
    'General category margin ₹14,000 (10%) -> ₹1,40,000 project cost -> Micro Finance (90% loan = ₹1,26,000)'
  )

  const finGeneralAboveBoundary = calculateFinancials(14001, { category: 'general' })
  assert(
    finGeneralAboveBoundary.projectCost === 140010 &&
    finGeneralAboveBoundary.schemeCode === 'term' &&
    finGeneralAboveBoundary.fundingPercent === 90,
    'General category margin ₹14,001 (10%) -> ₹1,40,010 project cost -> Term Loan'
  )

  // Boundary via Margin Capital: Special Category (5%)
  const finSpecialBoundary = calculateFinancials(7000, { category: 'special' })
  assert(
    finSpecialBoundary.projectCost === 140000 &&
    finSpecialBoundary.schemeCode === 'micro' &&
    finSpecialBoundary.loanAmount === 133000 &&
    finSpecialBoundary.fundingPercent === 95,
    'Special category margin ₹7,000 (5%) -> ₹1,40,000 project cost -> Micro Finance (95% loan = ₹1,33,000)'
  )

  const finSpecialAboveBoundary = calculateFinancials(7001, { category: 'special' })
  assert(
    finSpecialAboveBoundary.projectCost === 140020 &&
    finSpecialAboveBoundary.schemeCode === 'term' &&
    finSpecialAboveBoundary.fundingPercent === 95,
    'Special category margin ₹7,001 (5%) -> ₹1,40,020 project cost -> Term Loan (95% loan)'
  )

  // -------------------------------------------------------------
  // Test Suite 3: Bug 1 — Configurable Margin % by Category
  // -------------------------------------------------------------
  console.log('\n3. Configurable Margin % Resolution:')

  assert(
    resolveRequiredMarginPercent('general') === 0.10,
    'General category resolves to 10% margin floor'
  )
  assert(
    resolveRequiredMarginPercent('special') === 0.05,
    'Special category resolves to 5% margin floor'
  )
  assert(
    resolveRequiredMarginPercent('sc_st') === 0.05,
    'SC/ST category resolves to 5% margin floor'
  )
  assert(
    resolveRequiredMarginPercent('women') === 0.05,
    'Women entrepreneur category resolves to 5% margin floor'
  )
  assert(
    resolveRequiredMarginPercent('obc') === 0.05,
    'OBC category resolves to 5% margin floor'
  )

  // Verify full calculations for ₹10L project cost:
  // General: Margin ₹1,00,000 -> Project ₹10,00,000, Loan ₹9,00,000 (90%)
  const finGeneral10L = calculateFinancials(100000, { category: 'general' })
  assert(
    finGeneral10L.projectCost === 1000000 &&
    finGeneral10L.loanAmount === 900000 &&
    finGeneral10L.fundingPercent === 90 &&
    finGeneral10L.marginPercent === 0.10,
    'General category ₹1,00,000 margin -> ₹10,00,000 project cost, ₹9,00,000 loan (90%)'
  )

  // Special: Margin ₹50,000 -> Project ₹10,00,000, Loan ₹9,50,000 (95%)
  const finSpecial10L = calculateFinancials(50000, { category: 'special' })
  assert(
    finSpecial10L.projectCost === 1000000 &&
    finSpecial10L.loanAmount === 950000 &&
    finSpecial10L.fundingPercent === 95 &&
    finSpecial10L.marginPercent === 0.05,
    'Special category ₹50,000 margin -> ₹10,00,000 project cost, ₹9,50,000 loan (95%)'
  )

  // -------------------------------------------------------------
  // Test Suite 4: Voluntary User Margin Override
  // -------------------------------------------------------------
  console.log('\n4. Voluntary User Margin Override:')

  // User voluntarily offers 15% margin on general (required floor: 10%)
  const finOverride = calculateFinancials(150000, {
    category: 'general',
    userOverridePercent: 0.15,
  })
  assert(
    finOverride.isMarginOverridden === true &&
    finOverride.marginPercent === 0.15 &&
    finOverride.projectCost === 1000000 &&
    finOverride.loanAmount === 850000 &&
    finOverride.fundingPercent === 85,
    'User voluntary override to 15% lowers loan to 85% (₹8,50,000 on ₹10L project)'
  )

  // User attempts to input lower margin (3%) than category floor (10%)
  const finUnderFloor = calculateFinancials(100000, {
    category: 'general',
    userOverridePercent: 0.03,
  })
  assert(
    finUnderFloor.isMarginOverridden === false &&
    finUnderFloor.marginPercent === 0.10,
    'User cannot override below statutory floor (10% enforced when user enters 3%)'
  )

  // -------------------------------------------------------------
  // Test Suite 5: Full Integration — EMI on ₹4,50,000 Term Loan
  // -------------------------------------------------------------
  console.log('\n5. Full Integration — ₹4,50,000 Term Loan EMI & Amortization:')

  // Margin ₹50,000 at 10% yields ₹5,00,000 project cost and ₹4,50,000 loan
  const finTerm450kCap = calculateFinancials(50000, {
    category: 'general',
    interestWaivedOverride: false,
  })
  assert(
    finTerm450kCap.loanAmount === 450000 &&
    finTerm450kCap.interestRate === 8.0 &&
    finTerm450kCap.tenureYears === 7 &&
    finTerm450kCap.moratoriumMonths === 6 &&
    finTerm450kCap.emiMonthly >= 7714 &&
    finTerm450kCap.emiMonthly <= 7718,
    `Full flow (capitalized): ₹4,50,000 loan -> EMI is ₹${finTerm450kCap.emiMonthly} (≈ ₹7,717)`
  )

  const finTerm450kWaived = calculateFinancials(50000, {
    category: 'general',
    interestWaivedOverride: true,
  })
  assert(
    finTerm450kWaived.emiMonthly >= 7417 &&
    finTerm450kWaived.emiMonthly <= 7419,
    `Full flow (waived): ₹4,50,000 loan -> EMI is ₹${finTerm450kWaived.emiMonthly} (≈ ₹7,419)`
  )

  // Amortization Schedule Check:
  const scheduleCap = generateRepaymentSchedule(450000, 8.0, 7, 6, false)
  assert(scheduleCap.length > 0, 'Repayment schedule generated')
  assert(scheduleCap[0].isMoratorium === true, 'First quarter is Moratorium Grace')
  assert(scheduleCap[1].isMoratorium === true, 'Second quarter is Moratorium Grace')
  assert(scheduleCap[0].payment === 0, 'Quarter 1 payment is 0 during grace period')
  assert(scheduleCap[0].interest === 9000, 'Quarter 1 accrued interest is ₹9,000 (450k * 8% * 3/12)')
  assert(scheduleCap[1].interest === 9180, 'Quarter 2 accrued interest on capitalized balance')

  console.log('\n✅ ALL TEST SUITES PASSED SUCCESSFULLY!')
}

// Execute tests
runTests()
