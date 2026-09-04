"use client"

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Bot, 
  FileText, 
  LogOut, 
  HelpCircle,
  TrendingUp,
  Languages
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage, Language } from '@/lib/language-context'

interface ShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: ShellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState('Rajesh Patel')
  const [userLocation, setUserLocation] = useState('Vadodara, GJ')
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const userStr = localStorage.getItem('gs_user')
    if (userStr) {
      try {
        const u = JSON.parse(userStr)
        if (u.name) setUserName(u.name)
        if (u.location) setUserLocation(u.location)
      } catch (e) {
        console.error(e)
      }
    }

    const analysisStr = localStorage.getItem('gs_analysis')
    if (analysisStr) {
      try {
        const a = JSON.parse(analysisStr)
        const locParts = [a.village, a.block, a.district].filter(Boolean)
        if (locParts.length > 0) {
          setUserLocation(locParts.join(', '))
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const navItems = [
    { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
    { name: t('nav.wizard'), href: '/wizard', icon: Sparkles },
    { name: t('nav.calculator'), href: '/calculator', icon: Calculator },
    { name: t('nav.map'), href: '/map', icon: MapPin },
    { name: t('nav.chat'), href: '/chat', icon: Bot },
    { name: t('nav.reports'), href: '/reports', icon: FileText },
  ]

  const handleLogout = () => {
    localStorage.removeItem('gs_user')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR DESKTOP */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between fixed inset-y-0 z-30">
        <div>
          {/* LOGO */}
          <div className="h-16 flex items-center px-6 border-b border-gray-100 gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl flex items-center justify-center text-white font-extrabold shadow-sm shadow-emerald-200">
              GS
            </div>
            <div>
              <span className="font-bold text-gray-900 leading-none block">GramSaarthi</span>
              <span className="text-[10px] text-emerald-700 font-semibold tracking-wider uppercase">AI Rural Advisor</span>
            </div>
          </div>

          {/* NAV LINKS */}
          <nav className="p-4 space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">{t('nav.mainMenu')}</div>
            {navItems.map((item) => {
              const active = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* BOTTOM USER & CONTROLS */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* LANGUAGE PICKER */}
          <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <Languages className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t('nav.language')}</span>
            </div>
            <div className="flex gap-1 text-[11px] font-bold">
              {(['EN', 'HI', 'GU'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  className={`px-1.5 py-0.5 rounded transition ${
                    language === l ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="leading-tight overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 truncate w-24">{userName}</p>
                <p className="text-[10px] text-gray-500 truncate w-24" title={userLocation}>{userLocation}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title={t('nav.logout')}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            GS
          </div>
          <span className="font-bold text-sm text-gray-900">GramSaarthi AI</span>
        </div>
        <div className="flex gap-2">
          <Link href="/wizard" className="bg-emerald-600 text-white text-xs px-2.5 py-1.5 rounded-lg font-medium">
            + Wizard
          </Link>
          <button onClick={handleLogout} className="text-gray-500 text-xs p-1">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 h-16 bg-white border-t border-gray-200 z-40 flex items-center justify-around px-2">
        {navItems.slice(0, 5).map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-lg text-[10px] ${
                active ? 'text-emerald-700 font-bold' : 'text-gray-500'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name.split(' ')[0]}</span>
            </Link>
          )
        })}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 md:ml-64 pt-14 md:pt-0 pb-20 md:pb-8 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
