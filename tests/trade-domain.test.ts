// =====================================================
// TEST SUITE: Trade Domain Intelligence & Report Store
// GramSaarthi AI — Comprehensive Hyper-Local Trade Validation
// =====================================================

import { getTradeProfile, TRADE_PROFILES } from '../lib/trade-data'
import { BASELINE_REPORTS } from '../lib/report-store'

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`)
    process.exit(1)
  }
  console.log(`  PASS: ${message}`)
}

console.log('\n--- TEST SUITE: Hyper-Local Trade Domain Intelligence ---')

// 1. All 8 core trades exist and contain multi-lingual profiles
const EXPECTED_TRADES = [
  'Food Processing',
  'Retail',
  'Textile',
  'Agriculture',
  'Handicrafts',
  'Services',
  'Manufacturing',
  'Dairy',
]

console.log('\n1. Verifying Core Trade Profiles & Multi-lingual Support:')
for (const trade of EXPECTED_TRADES) {
  assert(trade in TRADE_PROFILES, `Trade profile exists: ${trade}`)
  const tradeData = TRADE_PROFILES[trade]
  assert('en' in tradeData && 'hi' in tradeData && 'gu' in tradeData, `${trade} has en, hi, and gu translations`)

  for (const lang of ['en', 'hi', 'gu'] as const) {
    const p = tradeData[lang]
    assert(p.strengths.length >= 3, `${trade} [${lang}] has at least 3 strengths (got ${p.strengths.length})`)
    assert(p.weaknesses.length >= 3, `${trade} [${lang}] has at least 3 weaknesses (got ${p.weaknesses.length})`)
    assert(p.opportunities.length >= 3, `${trade} [${lang}] has at least 3 opportunities (got ${p.opportunities.length})`)
    assert(p.threats.length >= 3, `${trade} [${lang}] has at least 3 threats (got ${p.threats.length})`)
    assert(p.competitorDensityDesc.length > 20, `${trade} [${lang}] has competitor density intelligence`)
    assert(p.pricingBenchmarks.length >= 2, `${trade} [${lang}] has pricing benchmarks (got ${p.pricingBenchmarks.length})`)
    assert(p.valueAdditionAdvice.length > 20, `${trade} [${lang}] has value addition advice`)
    assert(p.subsidyConvergence.length > 20, `${trade} [${lang}] has government subsidy convergence notes`)
  }
}

// 2. Fuzzy category matching verification
console.log('\n2. Fuzzy Category Matching:')
const FUZZY_TESTS: [string, string][] = [
  ['Flour Milling & Spice Grinding', 'Food Processing'],
  ['Local Kirana Store and Provision Shop', 'Retail'],
  ['Handloom Weaving & Rural Tailoring', 'Textile'],
  ['Organic Farm & Seed Distribution', 'Agriculture'],
  ['Clay Pottery & Artisan Handicrafts', 'Handicrafts'],
  ['Solar Appliance Repair and Digital Services', 'Services'],
  ['Metal Welding & Gate Fabrication', 'Manufacturing'],
  ['Cow Dairy & Milk Chilling Unit', 'Dairy'],
  ['Completely Unknown Rural Venture', 'Dairy'], // fallback
]

for (const [input, expectedId] of FUZZY_TESTS) {
  const profile = getTradeProfile(input, 'en')
  assert(profile.id === expectedId, `Category "${input}" correctly routes to "${expectedId}"`)
}

// 3. Script / Character Set Verification for Translations
console.log('\n3. Language Character Set Verification:')
const fpHi = getTradeProfile('Food Processing', 'hi')
const fpGu = getTradeProfile('Food Processing', 'gu')
const fpEn = getTradeProfile('Food Processing', 'en')

// Devanagari Unicode range: \u0900-\u097F
const hasDevanagari = /[\u0900-\u097F]/.test(fpHi.label)
assert(hasDevanagari, 'Hindi trade profile contains Devanagari script')

// Gujarati Unicode range: \u0A80-\u0AFF
const hasGujarati = /[\u0A80-\u0AFF]/.test(fpGu.label)
assert(hasGujarati, 'Gujarati trade profile contains Gujarati script')

assert(/^[A-Za-z\s&]+$/.test(fpEn.id), 'English trade profile ID uses standard Latin characters')

// 4. Baseline Business Reports Integrity
console.log('\n4. Baseline Business Reports Integrity:')
assert(BASELINE_REPORTS.length >= 2, `Baseline contains multiple enterprise reports (got ${BASELINE_REPORTS.length})`)

for (const r of BASELINE_REPORTS) {
  assert(r.id.startsWith('GS-'), `Report ${r.id} follows GS-ID pattern`)
  assert(r.marginCapital > 0, `Report ${r.id} has positive margin capital`)
  assert(r.projectCost > r.marginCapital, `Report ${r.id} project cost > margin capital`)
  assert(r.loanAmount > 0, `Report ${r.id} has valid loan amount`)
  assert(Math.round(r.marginCapital + r.loanAmount) === Math.round(r.projectCost), `Report ${r.id} math balances (Margin + Loan = Project Cost)`)
  assert(r.feasibilityScore >= 60 && r.feasibilityScore <= 100, `Report ${r.id} feasibility score is realistic (${r.feasibilityScore})`)
}

console.log('\n✅ ALL TRADE DOMAIN & REPORT STORE TESTS PASSED SUCCESSFULLY!\n')
