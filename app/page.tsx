import Link from 'next/link'
import { 
  ArrowRight, CheckCircle, BarChart3, MapPin, 
  Calculator, Bot, Shield, Zap, Star, TrendingUp,
  Users, FileText, ChevronRight
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GS</span>
              </div>
              <span className="font-bold text-gray-900 text-lg">GramSaarthi AI</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">How it Works</a>
              <a href="#features" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#financial" className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">Financial Planning</a>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/login?demo=true"
                className="text-sm bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
              >
                Try Demo
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-200 mb-6">
                <Star className="w-3.5 h-3.5" />
                MSU Hack-A-Throne 2026 · Problem Statement P11
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Start the Right Business{' '}
                <span className="text-emerald-600">with AI</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
                Understand your local market, structure your funding, and plan your business 
                before you invest. AI-powered advisory for rural and semi-urban entrepreneurs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300"
                >
                  Start Business Analysis
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login?demo=true"
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 px-6 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-50 transition-all border border-gray-200 shadow-sm"
                >
                  Explore Demo
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">70M+</div>
                  <div className="text-xs text-gray-500 mt-0.5">Rural Entrepreneurs</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₹50L</div>
                  <div className="text-xs text-gray-500 mt-0.5">Max Loan Coverage</div>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">2 Min</div>
                  <div className="text-xs text-gray-500 mt-0.5">Full AI Analysis</div>
                </div>
              </div>
            </div>

            {/* HERO DASHBOARD PREVIEW */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-3xl -rotate-2" />
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 space-y-4">
                {/* Score Card */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">AI Business Score</div>
                    <div className="text-3xl font-extrabold text-gray-900 mt-1">82 <span className="text-base text-gray-400 font-normal">/ 100</span></div>
                    <div className="text-xs text-emerald-600 font-medium mt-0.5">High Feasibility ✓</div>
                  </div>
                  <div className="w-20 h-20 relative">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-20 h-20">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f0fdf4" strokeWidth="12"/>
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#059669" strokeWidth="12"
                        strokeDasharray={`${82 * 2.51} ${(100-82) * 2.51}`}
                        strokeLinecap="round"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-emerald-600">82%</div>
                  </div>
                </div>
                
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Project Cost', val: '₹10,00,000', icon: '💼', color: 'blue' },
                    { label: 'Loan Amount', val: '₹9,00,000', icon: '🏦', color: 'emerald' },
                    { label: 'Scheme', val: 'Term Loan', icon: '📋', color: 'purple' },
                    { label: 'Monthly EMI', val: '₹14,025', icon: '📅', color: 'orange' },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-base">{item.icon}</div>
                      <div className="text-sm font-bold text-gray-900 mt-1">{item.val}</div>
                      <div className="text-xs text-gray-500">{item.label}</div>
                    </div>
                  ))}
                </div>

                {/* SWOT mini */}
                <div className="grid grid-cols-4 gap-1.5">
                  {['S', 'W', 'O', 'T'].map((label, i) => (
                    <div key={i} className={`rounded-lg p-2 text-center text-xs font-bold ${
                      label === 'S' ? 'bg-emerald-100 text-emerald-700' :
                      label === 'W' ? 'bg-red-100 text-red-700' :
                      label === 'O' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{label}</div>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-3">
                  <Bot className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <p className="text-xs text-emerald-800">Dairy farming shows strong viability in Vadodara district. Amul cooperative ensures guaranteed offtake.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full bg-red-50 border border-red-200 mb-4">
              ⚠️ The Problem
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Why Rural Entrepreneurs Fail</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Despite government schemes offering up to 90% funding, first-time entrepreneurs struggle without access to market intelligence and financial guidance.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Wrong Business Choice', desc: 'Entrepreneurs pick businesses based on gut feeling, not data-driven local market analysis' },
              { icon: '💰', title: 'Financial Confusion', desc: 'Most don\'t know which scheme they qualify for, how much they can borrow, or what their EMI will be' },
              { icon: '📊', title: 'No Market Intelligence', desc: 'No access to hyper-local competitor mapping, demand analysis, or pricing guidance for their specific village' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-4">
              ✨ The Solution
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">How GramSaarthi Works</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              A guided 4-step AI-powered workflow that takes you from idea to full business plan in minutes
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: <MapPin className="w-5 h-5" />, title: 'Enter Location', desc: 'State, district, block, village — your hyper-local market area' },
              { step: '02', icon: <BarChart3 className="w-5 h-5" />, title: 'Choose Business', desc: 'Select your business category from dairy, retail, textile, and more' },
              { step: '03', icon: <Calculator className="w-5 h-5" />, title: 'Add Capital', desc: 'Enter your available margin capital (your 10% contribution)' },
              { step: '04', icon: <FileText className="w-5 h-5" />, title: 'Get AI Report', desc: 'Receive complete feasibility report with financial plan and loan scheme' },
            ].map((item, i) => (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-emerald-200 to-transparent z-0" />
                )}
                <div className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm text-center z-10">
                  <div className="text-xs font-bold text-emerald-600 mb-3">{item.step}</div>
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-3">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">Two Powerful Modules</h2>
            <p className="text-gray-500 mt-3">Everything you need to make informed business decisions</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Module 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Module 1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hyper-Local Business Feasibility Report</h3>
              <p className="text-sm text-gray-500 mb-5">AI generates a comprehensive localized business analysis for your specific village and business category.</p>
              <ul className="space-y-2.5">
                {[
                  'Market reach within 5-10 km radius',
                  'SWOT analysis (Strengths, Weaknesses, Opportunities, Threats)',
                  'Competitor density mapping',
                  'Unserved market opportunity analysis',
                  'Pricing strategy recommendations',
                  'Local risk identification',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-5">
                <Calculator className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-2">Module 2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Financial Calculator & Scheme Router</h3>
              <p className="text-sm text-gray-500 mb-5">Deterministic financial engine calculates exact loan eligibility, routes to correct scheme, and generates full repayment schedule.</p>
              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between bg-emerald-50 rounded-xl p-3">
                  <div>
                    <div className="text-xs font-semibold text-emerald-800">Micro Finance Scheme</div>
                    <div className="text-xs text-emerald-600">Up to ₹1.40L project · 6.5% p.a. · 3 years</div>
                  </div>
                  <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">Auto-select</div>
                </div>
                <div className="flex items-center justify-between bg-blue-50 rounded-xl p-3">
                  <div>
                    <div className="text-xs font-semibold text-blue-800">Term Loan Scheme</div>
                    <div className="text-xs text-blue-600">₹1.40L–₹50L project · 8% p.a. · 7 years</div>
                  </div>
                  <div className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">Auto-select</div>
                </div>
              </div>
              <ul className="space-y-2.5">
                {[
                  'Automatic scheme selection based on project cost',
                  'Monthly EMI calculation with moratorium',
                  'Full quarterly repayment schedule',
                  'Working capital estimation',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ADDITIONAL FEATURES */}
      <section id="financial" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Bot className="w-5 h-5 text-purple-600" />,
                color: 'purple',
                title: 'AI Business Advisor',
                desc: 'Ask questions in English, Hindi, or Gujarati. Get contextual business guidance based on your specific profile.',
              },
              {
                icon: <MapPin className="w-5 h-5 text-blue-600" />,
                color: 'blue',
                title: 'Hyper-Local Market Map',
                desc: 'Interactive map showing competitors, market reach radius, and potential customer concentration in your area.',
              },
              {
                icon: <FileText className="w-5 h-5 text-emerald-600" />,
                color: 'emerald',
                title: 'PDF Feasibility Report',
                desc: 'Download a professional PDF report with your complete analysis to share with banks and advisors.',
              },
              {
                icon: <Shield className="w-5 h-5 text-gray-600" />,
                color: 'gray',
                title: 'Trustworthy Estimates',
                desc: 'All AI outputs are clearly labeled as indicative estimates. We never claim guaranteed approvals or profits.',
              },
              {
                icon: <Zap className="w-5 h-5 text-yellow-600" />,
                color: 'yellow',
                title: 'Multilingual Support',
                desc: 'Interface and AI responses available in English, Hindi, and Gujarati for wider accessibility.',
              },
              {
                icon: <Users className="w-5 h-5 text-teal-600" />,
                color: 'teal',
                title: 'Built for Bharat',
                desc: 'Designed for rural and semi-urban entrepreneurs with simple language, large buttons, and visual guidance.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-${item.color}-50 border border-${item.color}-100`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-emerald-600 to-emerald-800">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <TrendingUp className="w-12 h-12 text-emerald-300 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Ready to Plan Your Business?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join thousands of rural entrepreneurs making smarter business decisions with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-xl font-bold text-base hover:bg-emerald-50 transition-colors shadow-xl"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?demo=true"
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-emerald-800 transition-colors border border-emerald-500"
            >
              Try Demo Account
            </Link>
          </div>
          <p className="text-emerald-300 text-sm mt-4">Demo credentials: demo@gramsaarthi.ai / demo123</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">GS</span>
              </div>
              <span className="text-white font-semibold">GramSaarthi AI</span>
            </div>
            <div className="text-sm text-center">
              MSU Hack-A-Throne 2026 · Problem Statement P11 · AI Business Advisory for Rural India
            </div>
            <div className="text-xs">
              Built for Bharat 🇮🇳
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 text-xs text-center text-gray-600">
            ⚠️ Disclaimer: All analysis is AI-generated and indicative only. This is a prototype. Always verify with official government sources and financial institutions before making investment decisions.
          </div>
        </div>
      </footer>
    </div>
  )
}
