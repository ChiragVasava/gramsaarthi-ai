"use client"

import { useState } from 'react'
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
  HelpCircle
} from 'lucide-react'

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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Namaste Rajeshji! 🙏 I am GramSaarthi AI, your dedicated rural enterprise advisor. I have reviewed your proposed Dairy Enterprise in Savli, Vadodara. You have ₹1,00,000 margin capital, qualifying for a ₹9,00,000 Term Loan at 8% p.a. with 6 months grace period. How can I guide your operations or marketing strategy today?",
      timestamp: '10:00 AM'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [lang, setLang] = useState<'EN' | 'HI' | 'GU'>('EN')

  const prompts = [
    "What is the best pricing for value-added Ghee vs raw milk?",
    "How should I manage fodder costs during hot summer months?",
    "Can you explain how the 6-month moratorium grace period works?",
    "What government subsidies can I combine with this Term Loan?"
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
            category: 'Dairy',
            location: 'Savli, Vadodara, Gujarat',
            marginCapital: 100000,
            scheme: 'term',
            feasibilityScore: 84,
          },
          history: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          language: lang.toLowerCase(),
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
      // Simulate or start Web Speech API
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.lang = lang === 'HI' ? 'hi-IN' : lang === 'GU' ? 'gu-IN' : 'en-IN'
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
                <h1 className="font-extrabold text-gray-900 text-lg">GramSaarthi Multilingual AI Advisor</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Gemini Live
                </span>
              </div>
              <p className="text-xs text-emerald-700 font-semibold">Active Profile: Dairy Enterprise · Vadodara, Gujarat</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Languages className="w-4 h-4 text-gray-400" />
            <div className="flex gap-1 text-xs font-bold bg-gray-100 p-1 rounded-xl">
              {(['EN', 'HI', 'GU'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-lg transition ${
                    lang === l ? 'bg-emerald-700 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {l}
                </button>
              ))}
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
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs text-gray-500 font-medium">
                Synthesizing advice for Vadodara catchment...
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
              lang === 'HI'
                ? "यहाँ अपना प्रश्न लिखें (उदा. डेयरी में चारा लागत कैसे कम करें?)"
                : "Ask GramSaarthi about pricing, scheme rules, or operational risks..."
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
