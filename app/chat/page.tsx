"use client"

import { useState, useEffect, useRef } from 'react'
import AppShell from '@/components/layout/AppShell'
import { 
  Bot, 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  Languages, 
  User, 
  CheckCircle,
  HelpCircle,
  Briefcase
} from 'lucide-react'
import { useLanguage, Language } from '@/lib/language-context'
import { getAllReports, getActiveReport, setActiveReport, BusinessReport } from '@/lib/report-store'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

function FormattedMessage({ content, isUser }: { content: string; isUser: boolean }) {
  const lines = content.split('\n')

  const formatText = (text: string) => {
    // Regex for bold **...** and italic *...*
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={i} className={`font-bold ${isUser ? 'text-white' : 'text-gray-900'}`}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={i} className={`italic ${isUser ? 'text-emerald-100' : 'text-gray-600'}`}>
            {part.slice(1, -1)}
          </em>
        )
      }
      return part
    })
  }

  return (
    <div className="space-y-1.5">
      {lines.map((line, idx) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={idx} className="h-1.5" />
        }

        // Bullet point: •, - , * 
        if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const body = trimmed.replace(/^[•\-\*]\s*/, '')
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className={`font-bold ${isUser ? 'text-emerald-200' : 'text-emerald-600'}`}>•</span>
              <div className="flex-1">{formatText(body)}</div>
            </div>
          )
        }

        // Numbered list: 1. 2. etc.
        const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/)
        if (numMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className={`font-bold text-xs mt-0.5 ${isUser ? 'text-emerald-200' : 'text-emerald-700'}`}>
                {numMatch[1]}
              </span>
              <div className="flex-1">{formatText(numMatch[2])}</div>
            </div>
          )
        }

        // Headings: ### or ##
        if (trimmed.startsWith('#')) {
          const headingText = trimmed.replace(/^#+\s*/, '')
          return (
            <div key={idx} className={`font-extrabold text-sm mt-2 mb-1 ${isUser ? 'text-white' : 'text-gray-900'}`}>
              {formatText(headingText)}
            </div>
          )
        }

        return (
          <p key={idx} className="leading-relaxed">
            {formatText(line)}
          </p>
        )
      })}
    </div>
  )
}

export default function ChatPage() {
  const { language, setLanguage, t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [reportsList, setReportsList] = useState<BusinessReport[]>([])
  const [selectedReportId, setSelectedReportId] = useState<string>('')
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Patel',
    category: 'Dairy',
    location: 'Savli, Vadodara, Gujarat',
    marginCapital: 100000,
    scheme: 'Term Loan Scheme',
    loanAmount: 900000,
    score: 84
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const syncChatContext = (overrideId?: string) => {
    const list = getAllReports()
    setReportsList(list)

    let active = overrideId ? list.find(r => r.id === overrideId) : getActiveReport()
    if (!active && list.length > 0) active = list[0]

    let name = 'Rajesh Patel'
    const userStr = localStorage.getItem('gs_user')
    if (userStr) {
      try {
        const u = JSON.parse(userStr)
        if (u.name) name = u.name
      } catch (e) {
        console.error(e)
      }
    }

    if (active) {
      setSelectedReportId(active.id)
      setUserProfile({
        name,
        category: active.category,
        location: active.location,
        marginCapital: active.marginCapital,
        scheme: active.scheme,
        loanAmount: active.loanAmount,
        score: active.feasibilityScore
      })

      const greetingText = language === 'HI'
        ? `नमस्ते ${name} जी! 🙏 मैं ग्रामसारथी एआई हूँ, आपका समर्पित ग्रामीण व्यापार सलाहकार। मैंने ${active.location} में आपके प्रस्तावित ${active.category} उद्यम का विवरण देखा है। आपकी ₹${active.marginCapital.toLocaleString('en-IN')} की मार्जिन पूंजी के साथ, आप ₹${active.loanAmount.toLocaleString('en-IN')} के ${active.scheme} के पात्र हैं। आज मैं आपके व्यापार नियोजन या विपणन रणनीति में क्या सहायता कर सकता हूँ?`
        : language === 'GU'
          ? `નમસ્તે ${name} ભાઈ/બહેન! 🙏 હું ગ્રામસારથી એઆઈ છું, તમારો ગ્રામીણ બિઝનેસ સલાહકાર. મેં ${active.location} માં તમારા સૂચિત ${active.category} વ્યવસાયની વિગતો ચકાસી છે. તમારી ₹${active.marginCapital.toLocaleString('en-IN')} ની માર્જિન મૂડી સાથે, તમે ₹${active.loanAmount.toLocaleString('en-IN')} ની ${active.scheme} માટે પાત્ર છો. આજે હું તમારા વ્યવસાય આયોજન કે વેચાણ વ્યૂહરચનામાં કેવી રીતે મદદ કરી શકું?`
          : `Namaste ${name}! 🙏 I am GramSaarthi AI, your dedicated rural enterprise advisor. I have reviewed your proposed ${active.category} Enterprise in ${active.location}. With your ₹${active.marginCapital.toLocaleString('en-IN')} margin capital, you qualify for a ₹${active.loanAmount.toLocaleString('en-IN')} ${active.scheme}. How can I guide your operations, pricing, or government scheme strategy today?`

      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: greetingText,
          timestamp: '10:00 AM'
        }
      ])
    }
  }

  useEffect(() => {
    syncChatContext()

    const handleReportChange = () => {
      syncChatContext()
    }

    window.addEventListener('gs_report_changed', handleReportChange)
    return () => window.removeEventListener('gs_report_changed', handleReportChange)
  }, [language])

  const handleSwitchBusiness = (id: string) => {
    setActiveReport(id)
    syncChatContext(id)
  }

  const prompts = [
    "What is the best pricing strategy vs local competitors?",
    "How should I manage operational costs in the first 6 months?",
    "Can you explain how the statutory moratorium grace period works?",
    "What government subsidies can I combine with this loan scheme?"
  ]

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: {
            userName: userProfile.name,
            category: userProfile.category,
            location: userProfile.location,
            marginCapital: userProfile.marginCapital,
            scheme: userProfile.scheme,
            feasibilityScore: userProfile.score,
          },
          history: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          language: language.toLowerCase(),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            role: 'assistant',
            content: data.reply || "No response received.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ])
      } else {
        throw new Error('API request failed')
      }
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: "Sorry, I couldn't reach the AI service right now. Please check your network or try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Voice speech recognition is not supported in this browser engine. Please type your query.")
      return
    }

    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = language === 'HI' ? 'hi-IN' : language === 'GU' ? 'gu-IN' : 'en-IN'
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }
      recognition.onerror = () => setIsListening(false)
      recognition.start()
    }
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-4">
        {/* HEADER */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-gray-900 text-lg">{t('chat.title')}</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t('chat.live')}
                </span>
              </div>
              <p className="text-xs text-emerald-700 font-semibold">
                {t('chat.activeProfile')}: {userProfile.name} · {userProfile.category} ({userProfile.location})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {reportsList.length > 1 && (
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1.5 rounded-xl text-xs">
                <Briefcase className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold text-gray-500 hidden sm:inline">Active Business:</span>
                <select
                  value={selectedReportId}
                  onChange={(e) => handleSwitchBusiness(e.target.value)}
                  className="bg-transparent font-bold text-gray-900 outline-none cursor-pointer text-xs"
                >
                  {reportsList.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.category} ({r.district || 'Vadodara'})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Languages className="w-4 h-4 text-gray-400 mr-1" />
              <div className="flex gap-1 text-xs font-bold bg-gray-100 p-1 rounded-xl">
                {(['EN', 'HI', 'GU'] as Language[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLanguage(l)}
                    className={`px-2 py-1 rounded-lg transition ${
                      language === l ? 'bg-emerald-700 text-white' : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CHAT MESSAGES WINDOW */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm min-h-[460px] max-h-[550px] overflow-y-auto space-y-4 flex flex-col">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 max-w-[80%] ${
                m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  m.role === 'user'
                    ? 'bg-emerald-700 text-white'
                    : 'bg-gray-100 text-emerald-800 border'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-700" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  m.role === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-none'
                    : 'bg-gray-50 border border-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <FormattedMessage content={m.content} isUser={m.role === 'user'} />
                <span
                  className={`block text-[10px] mt-1.5 ${
                    m.role === 'user' ? 'text-emerald-200 text-right' : 'text-gray-400'
                  }`}
                >
                  {m.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 max-w-[80%] mr-auto items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-emerald-800 border flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-700 animate-spin" />
              </div>
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-600 font-medium">
                {language === 'HI' 
                  ? `${userProfile.location} के लिए सलाह तैयार की जा रही है...` 
                  : language === 'GU' 
                    ? `${userProfile.location} માટે વિશ્લેષણ તૈયાર થઈ રહ્યું છે...`
                    : `Synthesizing advice for ${userProfile.location}...`}
              </div>
            </div>
          )}
        </div>

        {/* QUICK SUGGESTION PILLS */}
        <div className="flex flex-wrap gap-2">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 font-medium px-3 py-1.5 rounded-xl border border-gray-200 transition text-left"
            >
              {p}
            </button>
          ))}
        </div>

        {/* INPUT FORM */}
        <div className="bg-white p-3 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVoice}
            title={isListening ? 'Stop Listening' : 'Voice Input'}
            className={`p-3 rounded-2xl transition ${
              isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'HI'
                ? "यहाँ अपना प्रश्न लिखें (उदा. मूल्य निर्धारण या सरकारी सब्सिडी के बारे में पूछें...)"
                : language === 'GU'
                  ? "અહીં તમારો પ્રશ્ન લખો (દા.ત. ભાવ નિર્ધારણ કે સરકારી યોજનાઓ વિશે પૂછો...)"
                  : "Ask about pricing, government subsidies, loan schemes, or operations..."
            }
            className="flex-1 px-4 py-2 text-sm text-gray-900 outline-none"
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white p-3 rounded-2xl transition shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppShell>
  )
}
