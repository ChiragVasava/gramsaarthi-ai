"use client"

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Shield, CheckCircle, Sparkles, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isDemoQuery = searchParams.get('demo') === 'true'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

    // Client-side authentication simulation for bulletproof hackathon prototype
    setTimeout(() => {
      if (email === 'demo@gramsaarthi.ai' && password === 'demo123') {
        localStorage.setItem('gs_user', JSON.stringify({
          name: 'Rajesh Patel',
          email: 'demo@gramsaarthi.ai',
          location: 'Vadodara, Gujarat',
          role: 'Rural Entrepreneur'
        }))
        router.push('/dashboard')
      } else if (email && password) {
        localStorage.setItem('gs_user', JSON.stringify({
          name: email.split('@')[0],
          email: email,
          location: 'Gujarat, India',
          role: 'Entrepreneur'
        }))
        router.push('/dashboard')
      } else {
        setError('Please enter valid credentials')
        setLoading(false)
      }
    }, 600)
  }

  const loadDemo = () => {
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
    }, 400)
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
        <h3 className="mt-6 text-xl font-bold text-gray-900">Sign in to your account</h3>
        <p className="mt-1 text-sm text-gray-600">Access hyper-local feasibility reports and financial structuring tools.</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl shadow-gray-100 rounded-2xl border border-gray-100 sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl flex items-center gap-2">
              <span className="text-red-500 font-bold">!</span> {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition text-gray-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-sm transition text-gray-900"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition shadow-lg shadow-emerald-200 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500 font-medium">Quick Demo Access</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={loadDemo}
                className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold py-3 px-4 rounded-xl text-sm border border-emerald-200 transition"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Auto-fill & Login as Demo User
              </button>
              <p className="text-center text-xs text-gray-500 mt-2 font-mono">
                demo@gramsaarthi.ai · demo123
              </p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 justify-center">
            <Shield className="w-4 h-4 text-emerald-600" />
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
      <LoginForm />
    </Suspense>
  )
}
