"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'EN' | 'HI' | 'GU'

export const translations: Record<Language, Record<string, string>> = {
  EN: {
    // Nav
    'nav.dashboard': 'Dashboard',
    'nav.wizard': 'Feasibility Wizard',
    'nav.calculator': 'Financial Calculator',
    'nav.map': 'Market & Competitor Map',
    'nav.chat': 'AI Business Advisor',
    'nav.reports': 'Saved Reports',
    'nav.language': 'Language',
    'nav.logout': 'Logout',
    'nav.mainMenu': 'Main Menu',

    // Dashboard
    'dash.badge': 'Active Case Study · Prototype',
    'dash.title': 'Rural Enterprise Advisory Desk',
    'dash.newAnalysis': 'New Analysis',
    'dash.viewReport': 'View Full Report',
    'dash.score': 'Feasibility Score',
    'dash.highFeasibility': 'High Feasibility',
    'dash.capital': 'Total Project Capital',
    'dash.marginReq': 'Margin equity contribution',
    'dash.loan': 'Concessional Loan Sizing',
    'dash.emi': 'Monthly EMI (Post-Grace)',
    'dash.moratorium': 'Moratorium Grace Period',
    'dash.swot': 'Strategic SWOT Synthesis',
    'dash.competitorHeading': 'Hyper-Local Spatial Radius',
    'dash.competitorSub': 'Estimated competitors within 10 km',
    'dash.discussAI': 'Discuss with AI Advisor',
    'dash.enterLocation': 'Location',

    // Map
    'map.module': 'Module 1: Spatial Catchment Intelligence',
    'map.title': 'Hyper-Local Market & Competitor Map',
    'map.all': 'All',
    'map.dairy': 'Dairy',
    'map.offtake': 'Offtake',
    'map.mandi': 'Mandi',
    'map.retail': 'Retail',
    'map.you': 'YOU',
    'map.center': 'Center',
    'map.scale': 'Scale: 10 km Radius',
    'map.coreCatchment': '5 km Inner Core Catchment',
    'map.institutionalCatchment': '10 km Institutional Catchment',
    'map.primary': 'Primary',
    'map.secondary': 'Secondary',
    'map.residents': 'Residents',
    'map.offtakeSecurity': 'Offtake & Market Linkage Security: 95%',
    'map.surroundingTitle': 'Surrounding Enterprise & Ecosystem Inventory',
    'map.targetFocus': 'Target Focus',

    // Chat
    'chat.title': 'GramSaarthi Multilingual AI Advisor',
    'chat.live': 'Gemini Live',
    'chat.typePlaceholder': 'Ask about pricing, government subsidies, loan schemes, or operations...',
    'chat.send': 'Send',
    'chat.listening': 'Listening to voice...',
    'chat.voice': 'Voice Input',
    'chat.sampleQuestions': 'Recommended Discussion Prompts',
    'chat.activeProfile': 'Active Profile',

    // Report
    'report.officialBadge': 'Official Synthesis · Dossier #GS-2026-P11',
    'report.title': 'Hyper-Local Business Feasibility & Financial Report',
    'report.downloadPdf': 'Download Official PDF',
    'report.downloading': 'Generating PDF...',
    'report.discussAI': 'Discuss with AI',
    'report.candidate': 'Candidate / Entrepreneur',
    'report.enterprise': 'Proposed Enterprise',
    'report.cluster': 'Cluster / Catchment',
    'report.date': 'Generated Date',
    'report.feasibilityBreakdown': 'Feasibility & Risk Sizing',
    'report.financialStructuring': 'Statutory Concessional Debt Structuring',
    'report.marketDemand': 'Hyper-Local Market Intelligence & Catchment Analysis',
    'report.statutoryDisclaimer': 'Statutory Disclaimer: AI-generated indicative planning dossier. All loan disbursements, subsidies, and interest concessions are subject to physical verification by respective SCAs and state cooperative banks.',

    // Common
    'common.indicative': 'Indicative Estimates',
  },

  HI: {
    // Nav
    'nav.dashboard': 'डैशबोर्ड',
    'nav.wizard': 'व्यवसाय विज़ार्ड',
    'nav.calculator': 'वित्तीय कैलकुलेटर',
    'nav.map': 'बाजार व प्रतिस्पर्धी मानचित्र',
    'nav.chat': 'एआई व्यापार सलाहकार',
    'nav.reports': 'सहेजी गई रिपोर्टें',
    'nav.language': 'भाषा',
    'nav.logout': 'लॉग आउट',
    'nav.mainMenu': 'मुख्य मेन्यू',

    // Dashboard
    'dash.badge': 'सक्रिय केस स्टडी · प्रोटोटाइप',
    'dash.title': 'ग्रामीण उद्यम सलाहकार डेस्क',
    'dash.newAnalysis': 'नया विश्लेषण',
    'dash.viewReport': 'पूरी रिपोर्ट देखें',
    'dash.score': 'व्यवहार्यता स्कोर',
    'dash.highFeasibility': 'उच्च व्यवहार्यता',
    'dash.capital': 'कुल परियोजना लागत',
    'dash.marginReq': 'मार्जिन पूंजी (उद्यमी अंशदान)',
    'dash.loan': 'रियायती ऋण राशि',
    'dash.emi': 'मासिक ईएमआई (किस्त)',
    'dash.moratorium': 'मोराटोरियम छूट अवधि',
    'dash.swot': 'रणनीतिक SWOT विश्लेषण',
    'dash.competitorHeading': 'स्थानिक बाजार दायरा',
    'dash.competitorSub': '10 किमी के भीतर अनुमानित प्रतिस्पर्धी',
    'dash.discussAI': 'एआई सलाहकार से चर्चा करें',
    'dash.enterLocation': 'स्थान',

    // Map
    'map.module': 'मॉड्यूल 1: स्थानिक बाजार बुद्धिमत्ता',
    'map.title': 'अति-स्थानीय बाजार एवं प्रतिस्पर्धी मानचित्र',
    'map.all': 'सभी',
    'map.dairy': 'डेयरी',
    'map.offtake': 'खरीद केंद्र',
    'map.mandi': 'मंडी / हाट',
    'map.retail': 'दुकानें',
    'map.you': 'आप',
    'map.center': 'केंद्र',
    'map.scale': 'पैमाना: 10 किमी दायरा',
    'map.coreCatchment': '5 किमी प्राथमिक उपभोग क्षेत्र',
    'map.institutionalCatchment': '10 किमी द्वितीयक संस्थागत क्षेत्र',
    'map.primary': 'प्राथमिक',
    'map.secondary': 'द्वितीयक',
    'map.residents': 'निवासी',
    'map.offtakeSecurity': 'बाजार खरीद सुरक्षा: 95%',
    'map.surroundingTitle': 'आस-पास के उद्यम एवं आपूर्ति नेटवर्क',
    'map.targetFocus': 'लक्षित बाजार',

    // Chat
    'chat.title': 'ग्रामसारथी बहुभाषी एआई सलाहकार',
    'chat.live': 'जेमिनी लाइव',
    'chat.typePlaceholder': 'मूल्य निर्धारण, सरकारी सब्सिडी, ऋण योजनाओं या संचालन के बारे में पूछें...',
    'chat.send': 'भेजें',
    'chat.listening': 'आवाज़ सुन रहा है...',
    'chat.voice': 'वॉइस इनपुट',
    'chat.sampleQuestions': 'सुझाए गए मुख्य प्रश्न',
    'chat.activeProfile': 'सक्रिय प्रोफ़ाइल',

    // Report
    'report.officialBadge': 'आधिकारिक रिपोर्ट · डॉसियर #GS-2026-P11',
    'report.title': 'अति-स्थानीय व्यापार व्यवहार्यता एवं वित्तीय रिपोर्ट',
    'report.downloadPdf': 'आधिकारिक पीडीएफ डाउनलोड करें',
    'report.downloading': 'पीडीएफ बन रही है...',
    'report.discussAI': 'एआई के साथ चर्चा करें',
    'report.candidate': 'उद्यमी का नाम',
    'report.enterprise': 'प्रस्तावित व्यवसाय',
    'report.cluster': 'गाँव / क्षेत्र',
    'report.date': 'तारीख',
    'report.feasibilityBreakdown': 'व्यवहार्यता एवं जोखिम मूल्यांकन',
    'report.financialStructuring': 'वैधानिक रियायती ऋण संरचना',
    'report.marketDemand': 'स्थानीय बाजार मांग एवं ग्राहक विश्लेषण',
    'report.statutoryDisclaimer': 'वैधानिक अस्वीकरण: एआई द्वारा तैयार अनुमानित रिपोर्ट। सभी ऋण स्वीकृति और ब्याज छूट संबंधित राज्य एजेंसियों और बैंकों के भौतिक सत्यापन के अधीन हैं।',

    // Common
    'common.indicative': 'अनुमानित आंकड़े',
  },

  GU: {
    // Nav
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.wizard': 'વ્યવસાય વિઝાર્ડ',
    'nav.calculator': 'નાણાકીય કેલ્ક્યુલેટર',
    'nav.map': 'બજાર અને હરીફ નકશો',
    'nav.chat': 'એઆઈ વ્યવસાય સલાહકાર',
    'nav.reports': 'સાચવેલા અહેવાલો',
    'nav.language': 'ભાષા',
    'nav.logout': 'લૉગ આઉટ',
    'nav.mainMenu': 'મુખ્ય મેનુ',

    // Dashboard
    'dash.badge': 'સક્રિય કેસ સ્ટડી · પ્રોટોટાઇપ',
    'dash.title': 'ગ્રામીણ સાહસ સલાહકાર ડેસ્ક',
    'dash.newAnalysis': 'નવું વિશ્લેષણ',
    'dash.viewReport': 'સંપૂર્ણ અહેવાલ જુઓ',
    'dash.score': 'સદ્ધરતા સ્કોર',
    'dash.highFeasibility': 'ઉચ્ચ સદ્ધરતા',
    'dash.capital': 'કુલ પ્રોજેક્ટ મૂડી',
    'dash.marginReq': 'માર્જિન ઇક્વિટી ફાળો',
    'dash.loan': 'ધિરાણ રકમ',
    'dash.emi': 'માસિક હપ્તો (EMI)',
    'dash.moratorium': 'ગ્રેસ પિરિયડ (મોરેટોરિયમ)',
    'dash.swot': 'વ્યૂહાત્મક SWOT વિશ્લેષણ',
    'dash.competitorHeading': 'સ્થાનિક બજાર વિસ્તાર',
    'dash.competitorSub': '10 કિમી વિસ્તારમાં અંદાજિત હરીફો',
    'dash.discussAI': 'એઆઈ સલાહકાર સાથે વાત કરો',
    'dash.enterLocation': 'સ્થળ',

    // Map
    'map.module': 'મોડ્યુલ 1: ભૌગોલિક બજાર બુદ્ધિમત્તા',
    'map.title': 'સ્થાનિક બજાર અને હરીફ નકશો',
    'map.all': 'બધા',
    'map.dairy': 'ડેરી',
    'map.offtake': 'સંગ્રહ કેન્દ્ર',
    'map.mandi': 'માર્કેટ યાર્ડ',
    'map.retail': 'દુકાનો',
    'map.you': 'તમે',
    'map.center': 'કેન્દ્ર',
    'map.scale': 'સ્કેલ: 10 કિમી ત્રિજ્યા',
    'map.coreCatchment': '5 કિમી પ્રાથમિક વપરાશ વિસ્તાર',
    'map.institutionalCatchment': '10 કિમી સંસ્થાકીય ગ્રાહક વિસ્તાર',
    'map.primary': 'પ્રાથમિક',
    'map.secondary': 'દ્વિતીયક',
    'map.residents': 'રહેવાસીઓ',
    'map.offtakeSecurity': 'વેચાણ ખાતરી સુરક્ષા: 95%',
    'map.surroundingTitle': 'આસપાસના ઉદ્યોગો અને સપ્લાય નેટવર્ક',
    'map.targetFocus': 'લક્ષ્ય બજાર',

    // Chat
    'chat.title': 'ગ્રામસારથી બહુભાષી એઆઈ સલાહકાર',
    'chat.live': 'જેમિની લાઈવ',
    'chat.typePlaceholder': 'ભાવ, સરકારી સબસિડી, લોન યોજનાઓ અથવા કામગીરી વિશે પૂછો...',
    'chat.send': 'મોકલો',
    'chat.listening': 'સાંભળી રહ્યા છીએ...',
    'chat.voice': 'વોઈસ ઇનપુટ',
    'chat.sampleQuestions': 'ભલામણ કરેલા મુખ્ય પ્રશ્નો',
    'chat.activeProfile': 'સક્રિય પ્રોફાઇલ',

    // Report
    'report.officialBadge': 'સત્તાવાર સંશ્લેષણ · ડોઝિયર #GS-2026-P11',
    'report.title': 'સ્થાનિક બિઝનેસ સદ્ધરતા અને નાણાકીય અહેવાલ',
    'report.downloadPdf': 'સત્તાવાર પીડીએફ ડાઉનલોડ કરો',
    'report.downloading': 'પીડીએફ બની રહી છે...',
    'report.discussAI': 'એઆઈ સાથે ચર્ચા કરો',
    'report.candidate': 'ઉદ્યોગસાહસિકનું નામ',
    'report.enterprise': 'સૂચિત વ્યવસાય',
    'report.cluster': 'ગામ / જિલ્લો',
    'report.date': 'તારીખ',
    'report.feasibilityBreakdown': 'સદ્ધરતા અને જોખમ વિશ્લેષણ',
    'report.financialStructuring': 'સહાયક ધિરાણ માળખું',
    'report.marketDemand': 'સ્થાનિક બજાર માંગ અને ગ્રાહક વિશ્લેષણ',
    'report.statutoryDisclaimer': 'વૈધાનિક અસ્વીકરણ: એઆઈ જનરેટેડ માર્ગદર્શિકા. તમામ લોન મંજૂરીઓ અને વ્યાજ રાહતો સંબંધિત રાજ્ય એજન્સીઓ અને બેંકોની ચકાસણીને આધીન છે.',

    // Common
    'common.indicative': 'અંદાજિત ગણતરી',
  }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLangState] = useState<Language>('EN')

  useEffect(() => {
    const saved = localStorage.getItem('gs_language') as Language
    if (saved && (saved === 'EN' || saved === 'HI' || saved === 'GU')) {
      setLangState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLangState(lang)
    localStorage.setItem('gs_language', lang)
  }

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.EN[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
