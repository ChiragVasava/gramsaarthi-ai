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

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return

    const userMsg: Message = {
      id: Math.random().toString(),
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Contextual simulated responses in Hackathon environment
    setTimeout(() => {
      let reply = ""
      const q = query.toLowerCase()

      if (q.includes('price') || q.includes('ghee') || q.includes('milk')) {
        reply = lang === 'HI' 
          ? "डेयरी में वैल्यू-एडिशन सबसे ज्यादा मुनाफा देता है। कच्चा दूध सहकारी मंडली में ₹42-48/लीटर बिकता है। अगर आप अतिरिक्त दूध से शुद्ध घी बनाते हैं, तो वह ₹600-680/किलो बिकता है, जिससे आपका ग्रॉस मार्जिन 3 गुना बढ़ जाता है!"
          : "Value-addition is the secret to high dairy margins. Raw milk yields ₹42–48/litre at the local cooperative society. Converting surplus evening milk into clarified Desi Ghee fetches ₹550–680/kg in nearby Vadodara markets, providing 3x higher gross margins!"
      } else if (q.includes('fodder') || q.includes('summer')) {
        reply = lang === 'HI' 
          ? "गर्मियों में सूखे चारे के दाम 25% तक बढ़ जाते हैं। हमारा सुझाव है कि आप मानसून के बाद साइलेज (हरा चारा संरक्षण) तैयार रखें और कम से कम ₹30,000 का वर्किंग कैपिटल बफर पहले से सुरक्षित रखें।"
          : "Dry fodder rates surge by 20–30% during May-June. We advise preparing silage pits right after the monsoon harvest and keeping a dedicated 3-month working capital reserve (₹35,000–₹45,000) strictly for nutritional feed concentrates."
      } else if (q.includes('moratorium') || q.includes('grace')) {
        reply = "Under the Term Loan Scheme (P11 Guidelines), the first 6 months are an interest grace moratorium. You do not pay principal installments during this startup window. Use this grace period to settle your cattle lactation cycle and build customer routes before the ₹14,025 monthly EMI starts!"
      } else {
        reply = "That is an essential consideration for Savli block. Based on our hyper-local database, establishing direct institutional contracts with nearby boarding schools and dhabas along the Waghodia-Savli highway will provide steady cashflow alongside your daily cooperative collection!"
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
      setLoading(false)
    }, 800)
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
              <h1 className="font-extrabold text-gray-900 text-lg">GramSaarthi Multilingual AI Advisor</h1>
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
                <p className="whitespace-pre-line">{m.content}</p>
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
