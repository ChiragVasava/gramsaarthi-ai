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
    'report.subTitle': 'National Micro-Enterprise Evaluation Engine · Concessional Credit Appraisal Framework',
    'report.execBadge': 'Executive Appraisal',
    'report.viableHeading': 'Viable Enterprise Opportunity',
    'report.inRegion': 'in Rural Belt',
    'report.execSummary': 'The candidate business displays resilient underlying fundamentals. Favorable local cooperative integration, coupled with rapid demand expansion across the rural catchment corridor, supports an investment rating above baseline. The proposed 10% equity commitment qualifies under the statutory concessional credit framework.',
    'report.custBase': 'Estimated Customer Base: 8,000–12,000',
    'report.radius': 'Catchment Radius: 10 km',
    'report.scoreBadge': 'Feasibility Score',
    'report.highViability': 'High Viability ✓',
    'report.financialHeading': 'Statutory Financial Structuring (Module 2)',
    'report.ownMargin': 'Own Margin (10%)',
    'report.statutoryCommitment': 'Statutory commitment',
    'report.feasibleProject': 'Feasible Project Cost',
    'report.marginMultiplier': 'Margin ÷ 10%',
    'report.loanPrincipal': 'Loan Principal (90%)',
    'report.monthlyEmi': 'Monthly Repayment',
    'report.moratoriumProvision': 'Moratorium Provision: Months Interest Grace Period prior to principal repayment.',
    'report.concessionalVerified': 'Concessional Credit Verified',
    'report.swotHeading': 'Hyper-Local SWOT Matrix (Module 1)',
    'report.strengths': 'Strengths (Local Catalysts)',
    'report.weaknesses': 'Weaknesses (Internal Constraints)',
    'report.opportunities': 'Opportunities (Market Upside)',
    'report.threats': 'Threats (Environmental & Supply Risks)',
    'report.competitorDensity': 'Competitor Mapping Density',
    'report.pricingStrategy': 'Target Pricing Strategy',
    'report.statutoryDisclaimer': 'Statutory Disclaimer: This Feasibility Dossier is synthesized by GramSaarthi AI for the MSU Hack-A-Throne 2026 evaluation process. All market size figures, demographic estimations, and competitor mappings represent model-driven indicative approximations. Official credit sanctioning remains strictly subject to physical scrutiny by designated State Channelizing Agencies (SCA) and participating financial institutions.',

    // Calculator
    'calc.module': 'Module 2: Concessional Financial Engine',
    'calc.title': 'Smart Financial Structuring & Scheme Router',
    'calc.subtitle': 'Deterministic, non-LLM statutory calculations complying with National Concessional Credit Guidelines.',
    'calc.equityHeading': 'Equity / Margin Capital',
    'calc.availableContrib': 'Your Available Contribution (₹)',
    'calc.domainLabel': 'Enterprise Domain for Working Capital',
    'calc.thresholdAlert': 'Threshold Routing Boundary: Projects ≤ ₹1.40L route to Micro Finance (6.5%). Projects between ₹1.40L and ₹50L route to Term Loan (8.0%).',
    'calc.schemeQualification': 'Automated Scheme Qualification',
    'calc.feasibleProject': 'Feasible Project',
    'calc.loanAmount': 'Loan Amount (90%)',
    'calc.interestRate': 'Interest Rate',
    'calc.monthlyEmi': 'Monthly EMI',
    'calc.tenure': 'Tenure',
    'calc.years': 'Years',
    'calc.moratoriumGrace': 'Moratorium Grace',
    'calc.months': 'Months',
    'calc.compileReport': 'Compile in Feasibility Report →',
    'calc.workingCapitalHeading': 'Working Capital & Operational Buffer Guidance',
    'calc.workingCapitalSub': 'Preventing cashflow strangulation during lactation/production startup',
    'calc.estReserve': 'Est. Reserve',
    'calc.amortizationHeading': 'Indicative Quarterly Amortization Schedule',
    'calc.amortizationSub': 'Reflecting statutory grace moratorium prior to principal and interest amortization.',
    'calc.quartersModeled': 'Quarters Modeled',
    'calc.quarter': 'Quarter',
    'calc.type': 'Type',
    'calc.quarterlyPayment': 'Quarterly Payment',
    'calc.principalAmortized': 'Principal Amortized',
    'calc.interestOutflow': 'Interest Outflow',
    'calc.closingBalance': 'Closing Balance',
    'calc.moratoriumGraceTag': 'Moratorium Grace',
    'calc.activeAmortizationTag': 'Active Amortization',

    // Reports Index
    'reports.title': 'Saved Feasibility Dossiers',
    'reports.subtitle': 'Access or export pre-compiled candidate appraisals for presentation',
    'reports.runNew': 'Run New Appraisal',
    'reports.activeCustom': 'Active Custom',
    'reports.viewDossier': 'View Dossier',

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
    'report.subTitle': 'राष्ट्रीय सूक्ष्म-उद्यम मूल्यांकन प्रणाली · रियायती ऋण मूल्यांकन ढांचा',
    'report.execBadge': 'कार्यकारी सारांश',
    'report.viableHeading': 'व्यवहार्य उद्यम अवसर',
    'report.inRegion': 'ग्रामीण क्षेत्र में',
    'report.execSummary': 'प्रस्तावित व्यवसाय मजबूत स्थानीय संभावनाओं को दर्शाता है। स्थानीय सहकारी समितियों का समर्थन और ग्रामीण बाजार गलियारे में बढ़ती मांग इस व्यवसाय को लाभदायक बनाती है। उद्यमी का 10% अंशदान सरकारी रियायती ऋण योजना के अंतर्गत पूरी तरह पात्र है।',
    'report.custBase': 'अनुमानित ग्राहक आधार: 8,000–12,000',
    'report.radius': 'बाजार दायरा: 10 किमी',
    'report.scoreBadge': 'व्यवहार्यता स्कोर',
    'report.highViability': 'सफल संभावना ✓',
    'report.financialHeading': 'वैधानिक वित्तीय संरचना (मॉड्यूल 2)',
    'report.ownMargin': 'स्वयं का अंशदान (10%)',
    'report.statutoryCommitment': 'नियम अनुसार अंशदान',
    'report.feasibleProject': 'संभावित परियोजना लागत',
    'report.marginMultiplier': 'अंशदान ÷ 10%',
    'report.loanPrincipal': 'ऋण मूलधन (90%)',
    'report.monthlyEmi': 'मासिक किस्त (ईएमआई)',
    'report.moratoriumProvision': 'छूट अवधि: मूलधन चुकाने से पहले ब्याज की छूट अवधि उपलब्ध है।',
    'report.concessionalVerified': 'रियायती ऋण सत्यापित',
    'report.swotHeading': 'अति-स्थानीय SWOT विश्लेषण (मॉड्यूल 1)',
    'report.strengths': 'ताकतें (स्थानीय लाभ)',
    'report.weaknesses': 'कमजोरियां (आंतरिक सीमाएं)',
    'report.opportunities': 'अवसर (बाजार विस्तार)',
    'report.threats': 'जोखिम (पर्यावरण व आपूर्ति खतरे)',
    'report.competitorDensity': 'प्रतिस्पर्धी घनत्व मानचित्रण',
    'report.pricingStrategy': 'लक्षित मूल्य निर्धारण रणनीति',
    'report.statutoryDisclaimer': 'वैधानिक अस्वीकरण: यह रिपोर्ट एमएसयू हैकाथ्रोन 2026 मूल्यांकन हेतु ग्रामसारथी एआई द्वारा तैयार की गई है। सभी बाजार आंकड़े और प्रतिस्पर्धी जानकारी मॉडल आधारित अनुमान हैं। वास्तविक ऋण स्वीकृति संबंधित राज्य एजेंसियों और बैंकों के भौतिक सत्यापन के अधीन है।',

    // Calculator
    'calc.module': 'मॉड्यूल 2: रियायती वित्तीय कैलकुलेटर',
    'calc.title': 'स्मार्ट वित्तीय संरचना एवं योजना चयन',
    'calc.subtitle': 'राष्ट्रीय रियायती ऋण दिशानिर्देशों के अनुरूप सटीक और नियम-सम्मत वित्तीय गणना।',
    'calc.equityHeading': 'इक्विटी / मार्जिन पूंजी',
    'calc.availableContrib': 'आपकी उपलब्ध पूंजी (₹)',
    'calc.domainLabel': 'कार्यशील पूंजी हेतु उद्यम क्षेत्र',
    'calc.thresholdAlert': 'योजना चयन सीमा: ₹1.40 लाख तक की परियोजनाएं सूक्ष्म वित्त (6.5%) में जाती हैं। ₹1.40 लाख से ₹50 लाख तक मियादी ऋण (8.0%) में आती हैं।',
    'calc.schemeQualification': 'स्वचालित योजना पात्रता',
    'calc.feasibleProject': 'संभावित परियोजना',
    'calc.loanAmount': 'ऋण राशि (90%)',
    'calc.interestRate': 'ब्याज दर',
    'calc.monthlyEmi': 'मासिक ईएमआई',
    'calc.tenure': 'अवधि',
    'calc.years': 'वर्ष',
    'calc.moratoriumGrace': 'मोराटोरियम छूट',
    'calc.months': 'महीने',
    'calc.compileReport': 'व्यवहार्यता रिपोर्ट में जोड़ें →',
    'calc.workingCapitalHeading': 'कार्यशील पूंजी एवं आपातकालीन रिजर्व मार्गदर्शन',
    'calc.workingCapitalSub': 'प्रारंभिक महीनों में नकदी की कमी रोकने हेतु आरक्षित निधि',
    'calc.estReserve': 'अनुमानित रिजर्व',
    'calc.amortizationHeading': 'तिमाही पुनर्भुगतान अनुसूची',
    'calc.amortizationSub': 'मूलधन और ब्याज भुगतान शुरू होने से पहले की छूट अवधि सहित।',
    'calc.quartersModeled': 'तिमाहियां शामिल',
    'calc.quarter': 'तिमाही',
    'calc.type': 'प्रकार',
    'calc.quarterlyPayment': 'तिमाही भुगतान',
    'calc.principalAmortized': 'मूलधन भुगतान',
    'calc.interestOutflow': 'ब्याज भुगतान',
    'calc.closingBalance': 'शेष राशि',
    'calc.moratoriumGraceTag': 'छूट अवधि',
    'calc.activeAmortizationTag': 'सक्रिय भुगतान',

    // Reports Index
    'reports.title': 'सहेजी गई व्यवहार्यता रिपोर्टें',
    'reports.subtitle': 'प्रस्तुति हेतु पूर्व-तैयार उम्मीदवार रिपोर्टें देखें या डाउनलोड करें',
    'reports.runNew': 'नया विश्लेषण शुरू करें',
    'reports.activeCustom': 'सक्रिय कस्टम',
    'reports.viewDossier': 'रिपोर्ट देखें',

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
    'report.subTitle': 'રાષ્ટ્રીય માઇક્રો-એન્ટરપ્રાઇઝ મૂલ્યાંકન એન્જિન · રાહતદરે ધિરાણ માળખું',
    'report.execBadge': 'સંચાલકીય સારાંશ',
    'report.viableHeading': 'સદ્ધર વ્યવસાયિક તક',
    'report.inRegion': 'ગ્રામીણ વિસ્તારમાં',
    'report.execSummary': 'આ સૂચિત વ્યવસાય સક્ષમ સ્થાનિક પરિસ્થિતિઓ ધરાવે છે. સ્થાનિક સહકારી મંડળીઓનું જોડાણ અને ગ્રામીણ ગ્રાહક વિસ્તારમાં વધતી માંગ આ વ્યવસાયને નફાકારક બનાવે છે. ઉમેદવારનો 10% ફાળો સરકારી રાહતદરે ધિરાણ યોજના હેઠળ મંજૂરી માટે સંપૂર્ણ પાત્ર છે.',
    'report.custBase': 'અંદાજિત ગ્રાહક આધાર: 8,000–12,000',
    'report.radius': 'બજાર વિસ્તાર: 10 કિમી',
    'report.scoreBadge': 'સદ્ધરતા સ્કોર',
    'report.highViability': 'ઉચ્ચ સદ્ધરતા ✓',
    'report.financialHeading': 'વૈધાનિક નાણાકીય માળખું (મોડ્યુલ 2)',
    'report.ownMargin': 'પોતાનો ફાળો (10%)',
    'report.statutoryCommitment': 'નિયમાનુસાર ફાળો',
    'report.feasibleProject': 'સંભવિત પ્રોજેક્ટ ખર્ચ',
    'report.marginMultiplier': 'ફાળો ÷ 10%',
    'report.loanPrincipal': 'લોનની રકમ (90%)',
    'report.monthlyEmi': 'માસિક હપ્તો (EMI)',
    'report.moratoriumProvision': 'ગ્રેસ પિરિયડ: મુદલની ચૂકવણી શરૂ થતાં પહેલાં વ્યાજની રાહત અવધિ ઉપલબ્ધ છે.',
    'report.concessionalVerified': 'રાહત ધિરાણ ચકાસાયેલ',
    'report.swotHeading': 'સ્થાનિક SWOT વિશ્લેષણ (મોડ્યુલ 1)',
    'report.strengths': 'શક્તિઓ (સ્થાનિક લાભો)',
    'report.weaknesses': 'નબળાઈઓ (આંતરિક મર્યાદાઓ)',
    'report.opportunities': 'તકો (બજાર વિસ્તરણ)',
    'report.threats': 'જોખમો (પર્યાવરણ અને સપ્લાય જોખમો)',
    'report.competitorDensity': 'હરીફોનું વિશ્લેષણ',
    'report.pricingStrategy': 'લક્ષિત ભાવ નિર્ધારણ વ્યૂહરચના',
    'report.statutoryDisclaimer': 'વૈધાનિક અસ્વીકરણ: આ અહેવાલ એમએસયુ હેકાથ્રોન 2026 મૂલ્યાંકન માટે ગ્રામસારથી એઆઈ દ્વારા તૈયાર કરવામાં આવ્યો છે. તમામ બજારના આંકડા અને હરીફોની માહિતી અંદાજિત મોડલ આધારિત છે. સત્તાવાર લોન મંજૂરી સંબંધિત સરકારી એજન્સીઓ અને બેંકોની રૂબરૂ ચકાસણીને આધીન છે.',

    // Calculator
    'calc.module': 'મોડ્યુલ 2: રાહતદરે નાણાકીય કેલ્ક્યુલેટર',
    'calc.title': 'સ્માર્ટ નાણાકીય માળખું અને યોજના પસંદગી',
    'calc.subtitle': 'રાષ્ટ્રીય રાહત ધિરાણ માર્ગદર્શિકા મુજબ સંપૂર્ણ સચોટ અને નિયમબદ્ધ ગણતરી.',
    'calc.equityHeading': 'ઇક્વિટી / માર્જિન મૂડી',
    'calc.availableContrib': 'તમારી ઉપલબ્ધ મૂડી (₹)',
    'calc.domainLabel': 'કાર્યકારી મૂડી માટે વ્યવસાય ક્ષેત્ર',
    'calc.thresholdAlert': 'યોજના સીમારેખા: ₹1.40 લાખ સુધીના પ્રોજેક્ટ માઇક્રો ફાઇનાન્સ (6.5%) હેઠળ આવે છે. ₹1.40 લાખથી ₹50 લાખ સુધી ટર્મ લોન (8.0%) હેઠળ આવે છે.',
    'calc.schemeQualification': 'સ્વચાલિત યોજના પાત્રતા',
    'calc.feasibleProject': 'સંભવિત પ્રોજેક્ટ',
    'calc.loanAmount': 'લોનની રકમ (90%)',
    'calc.interestRate': 'વ્યાજ દર',
    'calc.monthlyEmi': 'માસિક EMI',
    'calc.tenure': 'મુદત',
    'calc.years': 'વર્ષ',
    'calc.moratoriumGrace': 'ગ્રેસ પિરિયડ',
    'calc.months': 'મહિના',
    'calc.compileReport': 'સદ્ધરતા અહેવાલમાં ઉમેરો →',
    'calc.workingCapitalHeading': 'કાર્યકારી મૂડી અને અનામત ભંડોળ માર્ગદર્શન',
    'calc.workingCapitalSub': 'શરૂઆતના મહિનાઓમાં નાણાકીય તંગી અટકાવવા માટે અનામત રકમ',
    'calc.estReserve': 'અંદાજિત અનામત',
    'calc.amortizationHeading': 'ત્રિમાસિક ચૂકવણી પત્રક',
    'calc.amortizationSub': 'મુદલ અને વ્યાજની ચૂકવણી પહેલાં મળતી છૂટછાટ સહિત.',
    'calc.quartersModeled': 'ત્રિમાસિક ગણતરી',
    'calc.quarter': 'ક્વાર્ટર (ત્રિમાસિક)',
    'calc.type': 'પ્રકાર',
    'calc.quarterlyPayment': 'ત્રિમાસિક હપ્તો',
    'calc.principalAmortized': 'મુદલ ચૂકવણી',
    'calc.interestOutflow': 'વ્યાજ ચૂકવણી',
    'calc.closingBalance': 'બાકી રકમ',
    'calc.moratoriumGraceTag': 'ગ્રેસ સમય',
    'calc.activeAmortizationTag': 'સક્રિય ચૂકવણી',

    // Reports Index
    'reports.title': 'સાચવેલા સદ્ધરતા અહેવાલો',
    'reports.subtitle': 'પ્રસ્તુતિ માટે પૂર્વ-તૈયાર ઉમેદવાર અહેવાલો જુઓ અથવા ડાઉનલોડ કરો',
    'reports.runNew': 'નવું મૂલ્યાંકન શરૂ કરો',
    'reports.activeCustom': 'સક્રિય કસ્ટમ',
    'reports.viewDossier': 'અહેવાલ જુઓ',

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
