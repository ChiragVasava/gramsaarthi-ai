"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AppShell from '@/components/layout/AppShell'
import { 
  MapPin, 
  Briefcase, 
  Coins, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Loader2,
  Info
} from 'lucide-react'
import { calculateFinancials } from '@/lib/financial-engine'
import { saveNewReport } from '@/lib/report-store'

export default function WizardPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    state: 'Gujarat',
    district: 'Vadodara',
    block: 'Savli',
    village: 'Tarsali',
    category: 'Dairy',
    applicantCategory: 'general',
    marginCapital: 100000,
    experience: 'some',
    targetAudience: 'Local co-ops & retail consumer direct',
    hasPremises: true,
  })

  const categories = [
    { id: 'Dairy', label: 'Dairy & Livestock', desc: 'Milk, ghee, paneer, cattle management', icon: '🐄' },
    { id: 'Retail', label: 'Village Retail / Kirana', desc: 'FMCG, daily provisions, commodities', icon: '🏪' },
    { id: 'Food Processing', label: 'Food Processing & Flour', desc: 'Spices, pickles, flour milling, snacks', icon: '🌾' },
    { id: 'Textile', label: 'Textiles & Handloom', desc: 'Weaving, tailoring, embroidery, apparel', icon: '🧵' },
    { id: 'Agriculture', label: 'Agri-Inputs & Services', desc: 'Organic fertilizer, seed depot, tools', icon: '🌱' },
    { id: 'Handicrafts', label: 'Artisanal Handicrafts', desc: 'Pottery, woodcraft, regional artifacts', icon: '🏺' },
    { id: 'Services', label: 'Rural Digital & Repair', desc: 'Solar maintenance, mobile tech, logistics', icon: '⚙️' },
    { id: 'Manufacturing', label: 'Small Scale Fabrication', desc: 'Brick kiln, carpentry, metal grills', icon: '🔨' },
  ]

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleGenerate = async () => {
    setLoading(true)

    // Run deterministic financial engine with applicant category
    const fin = calculateFinancials(formData.marginCapital, { category: formData.applicantCategory })

    // Save report into persistent multi-business report store & database
    const savedReport = saveNewReport({
      category: formData.category,
      state: formData.state,
      district: formData.district,
      block: formData.block,
      village: formData.village,
      experience: formData.experience,
      distribution: formData.targetAudience,
      applicantCategory: formData.applicantCategory,
      marginCapital: formData.marginCapital,
      projectCost: fin.projectCost,
      loanAmount: fin.loanAmount,
      marginPercent: fin.marginPercent,
      fundingPercent: fin.fundingPercent,
      scheme: fin.schemeCode === 'micro' ? 'Micro Finance Scheme' : 'Term Loan Scheme',
      interestRate: fin.interestRate,
      tenureYears: fin.tenureYears,
      moratoriumMonths: fin.moratoriumMonths,
      interestWaivedDuringMoratorium: fin.interestWaivedDuringMoratorium,
      emiMonthly: fin.emiMonthly,
    })

    setTimeout(() => {
      setLoading(false)
      router.push(`/report?id=${savedReport.id}`)
    }, 1000)
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* TITLE BANNER */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Step {step} of 4 · Feasibility Wizard
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-2">
              Business Feasibility & Financial Structuring Wizard
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Enter your geographic coordinates, business category, and equity capital.
            </p>
          </div>

          {/* STEP PROGRESS CHIPS */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs transition ${
                  step === i
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                    : step > i
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {step > i ? <Check className="w-4 h-4" /> : i}
              </div>
            ))}
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm min-h-[420px] flex flex-col justify-between">
          {/* STEP 1: LOCATION */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Geographic Catchment Coordinates</h2>
                  <p className="text-xs text-gray-500">Determine local consumption density within a 5–10 km radius.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm font-medium text-gray-900 bg-white"
                  >
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Vadodara, Anand, Kheda"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Tehsil / Taluka / Block
                  </label>
                  <input
                    type="text"
                    value={formData.block}
                    onChange={(e) => setFormData({ ...formData, block: e.target.value })}
                    placeholder="e.g. Savli, Padra, Waghodia"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Village / Town Locality
                  </label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder="e.g. Tarsali, Manjusar"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/60 flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Catchment intelligence automatically pulls cooperative procurement hubs, local weekly haats (mandis), and competitor clusters around this geographic zone.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: BUSINESS CATEGORY */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Proposed Business Classification</h2>
                  <p className="text-xs text-gray-500">Select the domain of your micro-enterprise to evaluate market value.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const selected = formData.category === cat.id
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setFormData({ ...formData, category: cat.id })}
                      className={`text-left p-4 rounded-2xl border transition flex flex-col justify-between ${
                        selected
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-md shadow-emerald-100 ring-2 ring-emerald-500/20'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                      }`}
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div className="mt-3">
                        <div className="font-bold text-sm text-gray-900">{cat.label}</div>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">{cat.desc}</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 3: MARGIN CAPITAL & ELIGIBILITY */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Available Margin Capital (Equity Contribution)</h2>
                  <p className="text-xs text-gray-500">Government schemes mandate a minimum 10% entrepreneur margin.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  {/* APPLICANT CATEGORY SELECTOR */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Applicant Social Category</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Floor: {formData.applicantCategory === 'general' ? '10%' : '5%'} Margin
                      </span>
                    </label>
                    <select
                      value={formData.applicantCategory}
                      onChange={(e) => setFormData({ ...formData, applicantCategory: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 bg-white"
                    >
                      <option value="general">General Category (10% Equity Floor)</option>
                      <option value="special">Special Category (5% Equity Floor)</option>
                      <option value="sc_st">SC / ST Beneficiary (5% Equity Floor)</option>
                      <option value="women">Women Entrepreneur (5% Equity Floor)</option>
                      <option value="obc">OBC Beneficiary (5% Equity Floor)</option>
                      <option value="minority">Minority Community (5% Equity Floor)</option>
                      <option value="differently_abled">Differently-Abled (PwD) (5% Equity Floor)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Own Savings / Family Contribution (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 font-bold text-gray-500">₹</span>
                      <input
                        type="number"
                        min="5000"
                        max="1000000"
                        step="5000"
                        value={formData.marginCapital}
                        onChange={(e) => setFormData({ ...formData, marginCapital: Number(e.target.value) })}
                        className="w-full pl-9 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-lg font-bold text-gray-900"
                      />
                    </div>
                  </div>

                  {/* QUICK PRESETS */}
                  <div className="flex flex-wrap gap-2">
                    {[7000, 14000, 50000, 100000, 250000, 500000].map((amt) => (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => setFormData({ ...formData, marginCapital: amt })}
                        className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition ${
                          formData.marginCapital === amt
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        ₹{amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}k`}
                      </button>
                    ))}
                  </div>

                  {(() => {
                    const finPreview = calculateFinancials(formData.marginCapital, { category: formData.applicantCategory })
                    return (
                      <p className="text-xs text-gray-500 leading-relaxed">
                        This amount represents your {Math.round(finPreview.marginPercent * 100)}% equity commitment under concessional credit guidelines.
                      </p>
                    )
                  })()}
                </div>

                {/* DYNAMIC FINANCIAL ENGINE SUMMARY CARD */}
                {(() => {
                  const fin = calculateFinancials(formData.marginCapital, { category: formData.applicantCategory })
                  return (
                    <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white p-6 rounded-3xl space-y-4 shadow-lg">
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-widest bg-emerald-800/60 px-2.5 py-1 rounded-full">
                        Instant Scheme Qualification
                      </span>
                      
                      <div>
                        <div className="text-xs text-emerald-200">Feasible Total Project Cost</div>
                        <div className="text-2xl sm:text-3xl font-extrabold">₹{fin.projectCost.toLocaleString('en-IN')}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-800/80 text-xs">
                        <div>
                          <span className="text-emerald-300">Loan ({fin.fundingPercent}%):</span>
                          <p className="font-bold text-sm">₹{fin.loanAmount.toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                          <span className="text-emerald-300">Scheme:</span>
                          <p className="font-bold text-sm">{fin.schemeCode === 'micro' ? 'Micro Finance' : 'Term Loan'}</p>
                        </div>
                        <div>
                          <span className="text-emerald-300">Interest:</span>
                          <p className="font-bold text-sm">{fin.interestRate}% p.a.</p>
                        </div>
                        <div>
                          <span className="text-emerald-300">Tenure:</span>
                          <p className="font-bold text-sm">{fin.tenureYears} Years</p>
                        </div>
                      </div>

                      <div className="text-[11px] text-emerald-200 bg-emerald-800/40 p-2.5 rounded-xl border border-emerald-700/50">
                        Moratorium period: <strong>{fin.moratoriumMonths} months {fin.interestWaivedDuringMoratorium ? 'interest grace (waived)' : 'principal grace (interest capitalized)'}</strong> included.
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

          {/* STEP 4: ENTREPRENEUR EXPERIENCE & PROFILE */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="p-2.5 bg-emerald-50 rounded-2xl text-emerald-700">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Entrepreneur Capability Profile</h2>
                  <p className="text-xs text-gray-500">Fine-tune AI feasibility weighting based on previous domain exposure.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                    Prior Domain Experience
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'new', label: 'First-time Founder', desc: 'No prior background in this trade' },
                      { id: 'some', label: 'Family / Informal Exposure', desc: 'Assisted in household or kin operations' },
                      { id: 'experienced', label: 'Experienced Practitioner', desc: 'Operated similar trade 2+ years' },
                    ].map((exp) => (
                      <button
                        type="button"
                        key={exp.id}
                        onClick={() => setFormData({ ...formData, experience: exp.id })}
                        className={`p-4 rounded-2xl border text-left transition ${
                          formData.experience === exp.id
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className="text-sm font-bold">{exp.label}</div>
                        <p className="text-xs text-gray-500 mt-1">{exp.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Anticipated Distribution Target
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900"
                    placeholder="e.g. Cooperative collection, wholesale Mandi, retail customers"
                  />
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                  <Sparkles className="w-4 h-4 text-emerald-700" /> Ready to synthesize hyper-local business dossier
                </div>
                <span className="text-[11px] text-emerald-700 font-mono">Ready to compile</span>
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex items-center justify-between pt-6 border-t mt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2.5 rounded-xl border border-gray-200 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={loading}
                onClick={handleGenerate}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-300 transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Synthesizing AI Feasibility Dossier...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Generate Complete AI Report
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
