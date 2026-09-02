"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Sparkles, Loader2, UserPlus, LogIn } from 'lucide-react'

function AuthForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemoQuery = searchParams.get('demo') === 'true'

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [fullName, setFullName] = useState('')
  const [stateName, setStateName] = useState('Gujarat')
  const [districtName, setDistrictName] = useState('Vadodara')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (isDemoQuery) {
      setEmail('demo@gramsaarthi.ai')
      setPassword('demo123')
    }
  }, [isDemoQuery])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccessMsg('')

    setTimeout(() => {
      if (mode === 'register') {
        if (!fullName || !email || !password) {
          setError('Please fill in all required fields.')
          setLoading(false)
          return
        }

        const newUser = {
          name: fullName,
          email: email,
          location: `${districtName}, ${stateName}`,
          role: 'Rural Micro-Entrepreneur',
          registeredAt: new Date().toISOString()
        }

        // Store account and session
        localStorage.setItem('gs_user', JSON.stringify(newUser))
        setSuccessMsg('Account registered successfully! Redirecting...')
        setTimeout(() => {
          router.push('/wizard')
        }, 500)
      } else {
        // Login mode
        if (email === 'demo@gramsaarthi.ai' && password === 'demo123') {
          localStorage.setItem('gs_user', JSON.stringify({
            name: 'Rajesh Patel',
            email: 'demo@gramsaarthi.ai',
            location: 'Vadodara, Gujarat',
            role: 'Rural Entrepreneur'
          }))
          router.push('/dashboard')
        } else if (email && password) {
          // Check if previously registered user exists in localStorage
          const existingStr = localStorage.getItem('gs_user')
          let displayName = email.split('@')[0]
          let loc = 'Gujarat, India'
          if (existingStr) {
            try {
              const parsed = JSON.parse(existingStr)
              if (parsed.email === email && parsed.name) {
                displayName = parsed.name
                loc = parsed.location || loc
              }
            } catch (e) {
              console.error(e)
            }
          }

          localStorage.setItem('gs_user', JSON.stringify({
            name: displayName,
            email: email,
            location: loc,
            role: 'Entrepreneur'
          }))
          router.push('/dashboard')
        } else {
          setError('Please enter valid email and password.')
          setLoading(false)
        }
      }
    }, 500)
  }

  const loadDemo = () => {
    setMode('login')
    setEmail('demo@gramsaarthi.ai')
    setPassword('demo123')
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('gs_user', JSON.stringify({
        name: 'Rajesh Patel',
        email: 'demo@gramsaarthi.ai',
        location: 'Vadodara, Gujarat',
        role: 'Rural Entrepreneur'
      }))
      router.push('/dashboard')
    }, 350)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 transition mb-6 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center shadow-md shadow-emerald-200">
            <span className="text-white font-extrabold text-lg">GS</span>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">GramSaarthi AI</h2>
            <p className="text-xs text-emerald-700 font-medium">Your AI Rural Business Advisor</p>
          </div>
        </div>

        {/* MODE TOGGLE PILL */}
        <div className="mt-6 flex bg-gray-100 p-1 rounded-2xl border border-gray-200">
          <button
            type="button"
            id="tab-login-btn"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'login' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </button>
          <button
            type="button"
            id="tab-register-btn"
            onClick={() => { setMode('register'); setError(''); }}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-xl transition ${
              mode === 'register' ? 'bg-white text-emerald-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Register New Account
          </button>
        </div>

        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {mode === 'login' ? 'Sign in to your account' : 'Create rural entrepreneur profile'}
        </h3>
        <p className="mt-1 text-xs text-gray-600">
          {mode === 'login' 
            ? 'Access your hyper-local feasibility dossiers and financial plans.' 
            : 'Register your village venture to evaluate loan scheme feasibility.'}
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 rounded-3xl border border-gray-100 sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xl flex items-center gap-2">
              <span className="text-red-500 font-bold">!</span> {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> {successMsg}
            </div>
          )}

          <form className="space-y-3.5" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Full Name / Enterprise Name
                  </label>
                  <input
                    type="text"
                    required
                    id="reg-fullname"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar Patel"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition text-gray-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      id="reg-state"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      District
                    </label>
                    <input
                      type="text"
                      required
                      id="reg-district"
                      value={districtName}
                      onChange={(e) => setDistrictName(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 text-sm text-gray-900"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                id="auth-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition text-gray-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-sm transition text-gray-900"
              />
            </div>

            <button
              type="submit"
              id="auth-submit-btn"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </>
              ) : mode === 'register' ? (
                <>
                  Complete Registration & Launch Wizard <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <button
                type="button"
                id="demo-login-btn"
                onClick={loadDemo}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-2.5 px-4 rounded-xl text-xs border border-emerald-200 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                One-Click Demo Account Login
              </button>
              <p className="text-center text-[10px] text-gray-400 mt-1 font-mono">
                demo@gramsaarthi.ai · demo123
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-400 justify-center">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hackathon Evaluation Environment · Secure Prototype</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-emerald-700">Loading...</div>}>
      <AuthForm />
    </Suspense>
  )
}
