// =====================================================
// TRADE DATA & DOMAIN INTELLIGENCE — GramSaarthi AI
// Comprehensive Hyper-Local SWOT, Competitor Density,
// Pricing Benchmarks, and Sector Profiles for 8 Trades
// =====================================================

export interface PricingBenchmark {
  label: string
  range: string
}

export interface TradeProfile {
  id: string
  label: string
  strengths: string[]
  weaknesses: string[]
  opportunities: string[]
  threats: string[]
  competitorDensityDesc: string
  pricingBenchmarks: PricingBenchmark[]
  valueAdditionAdvice: string
  operationalCostAdvice: string
  subsidyConvergence: string
}

export const TRADE_PROFILES: Record<string, Record<'en' | 'hi' | 'gu', TradeProfile>> = {
  'Food Processing': {
    en: {
      id: 'Food Processing',
      label: 'Food Processing & Flour Milling',
      strengths: [
        'Direct procurement of local agricultural grains (wheat, maize, millets) at farm-gate rates.',
        'High, non-cyclical local dietary demand for freshly milled flour and ground spices.',
        'Low operating overheads compared to urban industrial processing facilities.',
        'Opportunity for PMFME (PM Formalisation of Micro food processing Enterprises) 35% capital subsidy.',
      ],
      weaknesses: [
        'FSSAI registration and hygiene standards require strict protocol compliance.',
        'Storage vulnerability to moisture, humidity, and grain weevils during monsoon season.',
        'Initial working capital lock-in for buffer grain stocks during post-harvest price dips.',
        'Dependence on stable 3-phase electricity supply for heavy pulverizers and hammer mills.',
      ],
      opportunities: [
        'Branded retail packaging of regional stone-ground flours (Chakki Atta, Multigrain) yielding 25–40% gross margins.',
        'Supplying processed grains and custom spice blends to local hostels, canteens, and mid-day meal programs.',
        'Value-added packaging into 1 kg / 5 kg branded airtight pouches for local grocery networks.',
        'Expansion into cold-pressed mustard, sesame, or groundnut oil extraction as allied revenue.',
      ],
      threats: [
        'Price surges in wholesale APMC grain mandis during off-season drought cycles.',
        'Competition from multi-national packaged FMCG flour and spice brands on supermarket shelves.',
        'Power outages leading to machine idle time and delivery bottlenecks during festival seasons.',
        'Adulteration suspicion by consumers unless packaging transparently showcases quality certificates.',
      ],
      competitorDensityDesc:
        'Within a 5 km catchment, 2–4 traditional unorganized custom flour mills (chakki) operate. Very few offer vacuum-sealed branded pouches or hygienic spice processing, creating a high-margin niche for quality packaging.',
      pricingBenchmarks: [
        { label: 'Custom Flour Milling Service', range: '₹4.50 – ₹7.00 / kg' },
        { label: 'Branded Chakki Atta (Pouch)', range: '₹38 – ₹46 / kg' },
        { label: 'Pure Ground Spices (Chilli/Turmeric)', range: '₹260 – ₹380 / kg' },
        { label: 'Institutional Grain Bulk', range: '₹2,800 – ₹3,400 / quintal' },
      ],
      valueAdditionAdvice:
        'Transition from charging mere ₹5/kg toll milling service to selling branded 5kg / 10kg Atta pouches, roasted gram flour (Sattu), and regional spice blends (garam masala, turmeric powder). This elevates your gross margins from 8% to over 32%.',
      operationalCostAdvice:
        'For the first 6 months: 1) Allocate 35% of loan disbursement as working capital reserve for harvest-time bulk grain purchase. 2) Secure 3-phase commercial tariff with power factor capacitors to reduce electricity bills by 12-15%. 3) Implement strict credit limits (max 7-day credit for kirana stores) to avoid cash flow chokes.',
      subsidyConvergence:
        'Eligible for PMFME (Pradhan Mantri Formalisation of Micro food processing Enterprises) with 35% credit-linked capital subsidy up to ₹10 Lakhs, stackable with State SC/ST/OBC SCA concessional Term Loan (8% p.a.).',
    },
    hi: {
      id: 'Food Processing',
      label: 'खाद्य प्रसंस्करण एवं आटा/मसाला उद्योग',
      strengths: [
        'स्थानीय किसानों से सीधे थोक भाव पर अनाज एवं दलहन की खरीद।',
        'ताजे पिसे आटे और शुद्ध मसालों की पूरे वर्ष निरंतर मांग।',
        'शहरी मिलों की तुलना में कम परिचालन व मजदूरी लागत।',
        'PMFME योजना के तहत 35% पूंजीगत सब्सिडी की पूर्ण पात्रता।',
      ],
      weaknesses: [
        'FSSAI खाद्य सुरक्षा लाइसेंस एवं स्वच्छता नियमों का कड़ा पालन जरूरी।',
        'बरसात के मौसम में अनाज में सीलन और कीटों का खतरा।',
        'फसल कटाई के समय अनाज भंडारण के लिए आरंभिक कार्यशील पूंजी की आवश्यकता।',
        'हैमर मिल और पल्वराइजर के लिए नियमित 3-फेज बिजली आपूर्ति पर निर्भरता।',
      ],
      opportunities: [
        'ब्रांडेड 5 किग्रा/10 किग्रा पैकेट में शुद्ध चक्की आटा बेचकर 25-40% मुनाफा कमाना।',
        'स्थानीय छात्रावासों, कैंटीन और स्कूलों में थोक आपूर्ति के अनुबंध।',
        'पारंपरिक शुद्ध हल्दी, मिर्च, धनिया और गरम मसाला मिश्रण की प्रीमियम बिक्री।',
        'भविष्य में कच्ची घानी तेल निष्कर्षण यूनिट जोड़कर आय में वृद्धि।',
      ],
      threats: [
        'ऑफ-सीजन में अनाज मंडी (APMC) के दामों में अप्रत्याशित उतार-चढ़ाव।',
        'बड़ी कंपनियों के पैकेज्ड ब्रांड्स से प्रतिस्पर्धा।',
        'त्योहारी सीजन में बिजली कटौती से उत्पादन में रुकावट का जोखिम।',
        'स्थानीय ग्राहकों का पैकेजिंग गुणवत्ता पर संदेह जब तक प्रमाणन स्पष्ट न हो।',
      ],
      competitorDensityDesc:
        '5 किमी के दायरे में 2 से 4 असंगठित पारंपरिक चक्कियाँ हैं, परंतु हाइजीनिक सील-पैक आटा और शुद्ध पिसे मसाले उपलब्ध कराने वाली आधुनिक इकाई का अभाव है, जिससे स्पष्ट अवसर मिलता है।',
      pricingBenchmarks: [
        { label: 'चक्की पिसाई सेवा शुल्क', range: '₹4.50 – ₹7.00 / किग्रा' },
        { label: 'ब्रांडेड चक्की आटा (पैकेट)', range: '₹38 – ₹46 / किग्रा' },
        { label: 'शुद्ध पिसे मसाले (हल्दी/मिर्च)', range: '₹260 – ₹380 / किग्रा' },
        { label: 'थोक अनाज आपूर्ति', range: '₹2,800 – ₹3,400 / क्विंटल' },
      ],
      valueAdditionAdvice:
        'केवल ₹5/किग्रा पिसाई शुल्क लेने के बजाय स्वयं के ब्रांड नाम से 5 किग्रा और 10 किग्रा सील पैक आटा और मसाले बेचना शुरू करें। इससे आपका ग्रॉस मार्जिन 8% से बढ़कर 32% से अधिक हो जाएगा।',
      operationalCostAdvice:
        'पहले 6 महीनों के लिए: 1) कुल लोन का 35% कार्यशील पूंजी के रूप में अनाज खरीद के लिए आरक्षित रखें। 2) बिजली बिल कम करने के लिए कैपेसिटर पैनल लगाएं। 3) किराना दुकानों को अधिकतम 7 दिन की उधारी सीमा तय करें।',
      subsidyConvergence:
        'PMFME योजना के तहत 35% क्रेडिट-लिंक्ड सब्सिडी (अधिकतम ₹10 लाख) उपलब्ध है, जिसे राज्य SCA 8% टर्म लोन के साथ संयोजित किया जा सकता है।',
    },
    gu: {
      id: 'Food Processing',
      label: 'ફૂડ પ્રોસેસિંગ અને લોટ/મસાલા મિલ',
      strengths: [
        'સ્થાનિક ખેડૂતો પાસેથી સીધા જ વાજબી ભાવે અનાજ અને મસાલાની ખરીદી.',
        'શુદ્ધ ઘંટીનો લોટ અને મસાલા માટે બારેમાસ અવિરત સ્થાનિક માંગ.',
        'શહેરી એકમોની સરખામણીએ જમીન અને મજૂરી ખર્ચમાં મોટો ઘટાડો.',
        'PMFME યોજના હેઠળ 35% ક્રેડિટ-લિંક્ડ કેપિટલ સબસિડીની સુવિધા.',
      ],
      weaknesses: [
        'FSSAI લાયસન્સ અને ગુણવત્તાના નિયમોનું કડક પાલન અનિવાર્ય.',
        'ચોમાસામાં અનાજમાં ભેજ અને જીવાત લાગવાનું જોખમ.',
        'સિઝનમાં બલ્ક અનાજ ખરીદવા માટે કાર્યકારી મૂડીનું રોકાણ.',
        'હેવી મશીનરી ચલાવવા માટે નિયમિત 3-ફેઝ વીજળી પર નિર્ભરતા.',
      ],
      opportunities: [
        'બ્રાન્ડેડ પેકિંગમાં શુદ્ધ ઘંટી આટો અને મલ્ટીગ્રેન લોટ વેચી 25-40% નફો મેળવવો.',
        'સ્થાનિક હોસ્ટેલ, કેન્ટીન અને ભોજનાલયોમાં નિયમિત જથ્થાબંધ સપ્લાય કોન્ટ્રાક્ટ.',
        'સૂકા મસાલા (હળદર, મરચું, ધાણાજીરું) ના 200g/500g ના આકર્ષક પેકેટોનું વેચાણ.',
        'ભવિષ્યમાં ઘાણી તેલ (સીંગતેલ, તલનું તેલ) નું ઉત્પાદન ઉમેરવાની તક.',
      ],
      threats: [
        'બિન-સિઝનમાં APMC માર્કેટ યાર્ડમાં અનાજના ભાવમાં વધારો.',
        'મોટી બ્રાન્ડેડ કંપનીઓના પેકેજ્ડ ફૂડ સામે સ્પર્ધા.',
        'પીક સિઝનમાં અણધારી પાવર કટને કારણે ઉત્પાદનમાં વિક્ષેપ.',
        'સ્થાનિક બજારમાં લાંબી ઉધારી ફસાઈ જવાનું જોખમ.',
      ],
      competitorDensityDesc:
        '૫ કિમીની ત્રિજ્યામાં ૨-૪ પરંપરાગત ફ્લોર મિલ કાર્યરત છે, પરંતુ હાઈજેનિક બ્રાન્ડેડ પેકિંગ અને શુદ્ધ મસાલા ઉપલબ્ધ કરાવતી આધુનિક મિલનો અભાવ છે.',
      pricingBenchmarks: [
        { label: 'ઘંટી દળામણ સર્વિસ દર', range: '₹4.50 – ₹7.00 / કિગ્રા' },
        { label: 'બ્રાન્ડેડ ઘંટી આટો (પાઉચ)', range: '₹38 – ₹46 / કિગ્રા' },
        { label: 'શુદ્ધ પીસેલા મસાલા (મરચું/હળદર)', range: '₹260 – ₹380 / કિગ્રા' },
        { label: 'હોલસેલ અનાજ સપ્લાય', range: '₹2,800 – ₹3,400 / ક્વિન્ટલ' },
      ],
      valueAdditionAdvice:
        'માત્ર ₹5/કિલો દળામણ કરવાને બદલે પોતાના બ્રાન્ડ નેમ સાથે 5kg/10kg પેકિંગ લોટ અને ગરમ મસાલા પેકેટ વેચો, જેનાથી ગ્રોસ માર્જિન 8% થી વધીને 30% થી વધુ થશે.',
      operationalCostAdvice:
        'પ્રથમ 6 મહિનામાં: 1) વર્કિંગ કેપિટલ અનાજ ખરીદી માટે અનામત રાખો. 2) વીજળી બિલ ઘટાડવા કેપેસિટર પેનલ લગાવો. 3) સ્થાનિક દુકાનદારોને 7 દિવસથી વધુની ઉધારી ન આપો.',
      subsidyConvergence:
        'PMFME યોજના હેઠળ 35% કેપિટલ સબસિડી અને રાજ્ય SCA 8% ટર્મ લોન યોજના સાથે જોડાણ કરી શકાય છે.',
    },
  },

  Dairy: {
    en: {
      id: 'Dairy',
      label: 'Dairy & Livestock Enterprise',
      strengths: [
        'Assured morning and evening daily cash liquidity from raw milk collection.',
        'Guaranteed institutional offtake via Gujarat cooperative network (Amul/DCS route).',
        'State animal husbandry healthcare infrastructure and breed improvement support.',
        'Organic cattle dung and slurry monetization as bio-fertilizer for local farms.',
      ],
      weaknesses: [
        'Intensive labor demanding continuous 365-day attention for milking and feed cycles.',
        'High perishability requiring immediate chilling or rapid distribution within 3 hours.',
        'Capital locked in livestock with susceptibility to bovine ailments (Mastitis, FMD).',
        'Seasonal fodder cost inflation eating into gross margins during summer months.',
      ],
      opportunities: [
        'Value-addition into Ghee (₹580–₹720/kg) and fresh Paneer (₹320–₹360/kg) tripling margins.',
        'Direct door-to-door delivery of fresh A2 cow milk to nearby urban apartments.',
        'Kamdhenu and National Livestock Mission (NLM) cattle purchase and shed subsidies.',
        'Bulk contracts with local sweet shops (halwais) and community marriage banquets.',
      ],
      threats: [
        'Fodder shortage and 20–35% green grass price surges during hot pre-monsoon months.',
        'Disease epidemics requiring continuous vaccination compliance and veterinary proximity.',
        'Milk price deductions if fat/SNF levels fluctuate due to improper nutritional feed.',
        'Local unorganized dairy competitors undercutting prices through milk dilution.',
      ],
      competitorDensityDesc:
        'Within 5 km, 6–10 smallholder farmers supply milk to the cooperative village society. Almost none convert milk into branded retail paneer or pure bilona ghee, which represents the real wealth-builder.',
      pricingBenchmarks: [
        { label: 'Raw Buffalo/Cow Milk (Cooperative)', range: '₹44 – ₹52 / litre' },
        { label: 'Pure Desi Ghee (Bilona Grade)', range: '₹580 – ₹720 / kg' },
        { label: 'Fresh Vacuum Packed Paneer', range: '₹320 – ₹360 / kg' },
        { label: 'Standard Fermented Curd / Chaas', range: '₹35 – ₹45 / litre' },
      ],
      valueAdditionAdvice:
        'Separate 20% of your daily milk yield for in-house conversion into fresh Paneer and Curd. Paneer fetches ₹320/kg compared to raw milk equivalent of ₹180, boosting your bottom line by over 40%.',
      operationalCostAdvice:
        'Cultivate high-yield perennial green fodder (Napier grass / Lucerne) on 0.5 acre to reduce dry cattle-feed expenses by 45%. Build a 3-month cattle medicine and silage emergency fund.',
      subsidyConvergence:
        'Combine State SCA Term Loan (8% p.a.) with National Livestock Mission (NLM) 50% capital subsidy and Gujarat Kamdhenu scheme for cattle shed construction.',
    },
    hi: {
      id: 'Dairy',
      label: 'डेयरी एवं पशुपालन उद्यम',
      strengths: [
        'दूध संकलन से सुबह और शाम निरंतर दैनिक नकद आय।',
        'अमूल / सहकारी दुग्ध मंडली द्वारा 100% सुनिश्चित खरीद की गारंटी।',
        'गोबर और स्लरी से जैविक खाद बनाकर अतिरिक्त आमदनी का साधन।',
        'पशुपालन योजनाओं के अंतर्गत टीकाकरण और नस्ल सुधार का सरकारी सहयोग।',
      ],
      weaknesses: [
        'साल के 365 दिन सुबह-शाम लगातार श्रम और देखभाल की अनिवार्यता।',
        'दूध जल्द खराब होने वाला उत्पाद है, जिसे 3 घंटे में चिलिंग सेंटर पहुंचाना जरूरी है।',
        'पशुओं में मौसमी बीमारियों (थनिला, एफएमडी) का वित्तीय जोखिम।',
        'गर्मियों में हरे चारे की कमी और सूखे चारे की कीमतों में 30% तक उछाल।',
      ],
      opportunities: [
        'घी (₹580-₹720/किग्रा) और पनीर (₹320/किग्रा) बनाकर 3 गुना तक मुनाफा बढ़ाना।',
        'नजदीकी कस्बों या आवासीय सोसायटियों में सीधे शुद्ध A2 दूध की होम डिलीवरी।',
        'कामधेनु योजना और राष्ट्रीय पशुधन मिशन से शेड व पशु खरीद पर सब्सिडी।',
        'स्थानीय हलवाईयों और वैवाहिक आयोजनों में मावा व पनीर की सीधी आपूर्ति।',
      ],
      threats: [
        'गर्मियों में चारे और दाने के दामों में अत्यधिक वृद्धि।',
        'रोग फैलने पर दुग्ध उत्पादन में अचानक गिरावट।',
        'फैट और एसएनएफ (SNF) कम होने पर सहकारी समिति द्वारा मूल्य कटौती।',
        'असंगठित दूधियों द्वारा मिलावटी दूध बेचकर मूल्य प्रतिस्पर्धा।',
      ],
      competitorDensityDesc:
        '5 किमी क्षेत्र में 6 से 10 छोटे पशुपालक सहकारी मंडली में दूध देते हैं। परंतु कोई भी पैकेज्ड पनीर या शुद्ध देसी घी का स्थानीय ब्रांड नहीं चला रहा है।',
      pricingBenchmarks: [
        { label: 'कच्चा दूध (सहकारी दर)', range: '₹44 – ₹52 / लीटर' },
        { label: 'शुद्ध देसी घी (बिलोना)', range: '₹580 – ₹720 / किग्रा' },
        { label: 'ताजा पनीर (वैक्यूम पैक)', range: '₹320 – ₹360 / किग्रा' },
        { label: 'दही एवं ताजी छाछ', range: '₹35 – ₹45 / लीटर' },
      ],
      valueAdditionAdvice:
        'दैनिक दूध के 20% हिस्से से पनीर और छाछ तैयार करें। इससे कच्चे दूध की तुलना में 40% अधिक शुद्ध लाभ मिलता है।',
      operationalCostAdvice:
        'नेपियर घास या बरसीम की बुवाई कर हरे चारे की लागत 45% घटाएं। पशु चिकित्सा व आकस्मिक व्यय के लिए 3 माह का आपातकालीन फंड रखें।',
      subsidyConvergence:
        'राज्य SCA 8% टर्म लोन को राष्ट्रीय पशुधन मिशन (NLM) 50% सब्सिडी एवं कामधेनु योजना के साथ संयोजित करें।',
    },
    gu: {
      id: 'Dairy',
      label: 'ડેરી અને પશુપાલન વ્યવસાય',
      strengths: [
        'રોજ સવાર-સાંજ દૂધ વેચાણથી તાત્કાલિક રોકડ પ્રવાહ.',
        'અમૂલ/સહકારી મંડળી દ્વારા 100% ખરીદીની ખાતરી.',
        'ગાય-ભેંસના છાણ અને સ્લરીમાંથી જૈવિક ખાતરની વધારાની આવક.',
        'પશુપાલન વિભાગ તરફથી સબસીડી અને રસીકરણ સહાય.',
      ],
      weaknesses: [
        'વર્ષના 365 દિવસ નિયમિત સવાર-સાંજ મહેનતની જરૂર.',
        'દૂધ બગડી જવાની ઝડપી શક્યતા, કોલ્ડ સ્ટોરેજની જરૂરિયાત.',
        'પશુ બીમારી (મસ્ટાઇટિસ, ખરવા-મોવાસા) સામે જોખમ.',
        'ઉનાળામાં લીલા ઘાસચારાની અછત અને સૂકા ઘાસના ઊંચા ભાવ.',
      ],
      opportunities: [
        'શુદ્ધ ઘી (₹580-₹720/કિગ્રા) અને પનીર (₹320/કિગ્રા) બનાવી 3 ગણો નફો મેળવવો.',
        'નજીકના શહેરી વિસ્તારોમાં શુદ્ધ A2 ગાયના દૂધની સીધી હોમ ડિલિવરી.',
        'કામધેનુ યોજના અને નેશનલ લાઇવસ્ટોક મિશન (NLM) હેઠળ 50% સુધી સબસિડી.',
        'મીઠાઈની દુકાનો અને કેટરર્સ સાથે માવા-પનીરના નિયમિત ઓર્ડર.',
      ],
      threats: [
        'ઉનાળામાં દાણ અને ઘાસચારાના ભાવમાં 30% સુધી ઉછાળો.',
        'ફેટ/SNF ઘટવાથી દૂધના ભાવમાં કપાતનું જોખમ.',
        'સ્થાનિક બિનઅધિકૃત દૂધ વિક્રેતાઓ દ્વારા ભાવ ઘટાડાની હરીફાઈ.',
        'વેટરનરી ડોક્ટરની તાત્કાલિક ઉપલબ્ધતામાં વિલંબ.',
      ],
      competitorDensityDesc:
        '૫ કિમી વિસ્તારમાં ૬-૧૦ નાના પશુપાલકો દૂધ મંડળીમાં ભરાવે છે. પરંતુ બ્રાન્ડેડ પનીર કે બિલોણા ઘીનું સીધું વેચાણ કોઈ કરતું નથી.',
      pricingBenchmarks: [
        { label: 'કાચું દૂધ (મંડળી ભાવ)', range: '₹44 – ₹52 / લિટર' },
        { label: 'શુદ્ધ દેશી ઘી (બિલોણા)', range: '₹580 – ₹720 / કિગ્રા' },
        { label: 'તાજુ પનીર (પેકિંગ)', range: '₹320 – ₹360 / કિગ્રા' },
        { label: 'દહીં અને મસાલા છાશ', range: '₹35 – ₹45 / લિટર' },
      ],
      valueAdditionAdvice:
        'દૈનિક દૂધના 20% માંથી પનીર અને છાશ બનાવી વેચો. કાચા દૂધ કરતા પનીરમાં 40% વધુ નફો મળે છે.',
      operationalCostAdvice:
        'નેપિયર ઘાસનું વાવેતર કરી ઘાસચારાનો ખર્ચ 40% ઘટાડો. પશુ સારવાર માટે 3 મહિનાનું રિઝર્વ ફંડ જાળવો.',
      subsidyConvergence:
        'SCA 8% ટર્મ લોન અને પશુપાલન વિભાગની કામધેનુ સહાય યોજના સાથે જોડાણ કરો.',
    },
  },

  Retail: {
    en: {
      id: 'Retail',
      label: 'Village Retail & Kirana Store',
      strengths: [
        'Steady, recession-proof daily demand for food staples, soap, oils, and FMCG essentials.',
        'Immediate cash liquidity from retail walk-ins and UPI digital payments.',
        'Access to 7-15 day credit lines from regional wholesale distributors once established.',
        'Strong neighborhood familiarity and community customer retention.',
      ],
      weaknesses: [
        'Working capital lock-in across hundreds of varied Stock Keeping Units (SKUs).',
        'Risk of bad debts and trapped receivables from local customer credit purchases (khata).',
        'Low margins on branded FMCG goods (typically 6–12%) demanding rapid turnover.',
        'Storage space constraints and risk of product expiry or rodent damage.',
      ],
      opportunities: [
        'Integrating digital value-added services (Aadhaar AEPS micro-ATM, mobile recharge, bill pay).',
        'Bulk sourcing directly from regional APMC wholesale yards to capture 18–25% margins on loose staples.',
        'Doorstep delivery for senior citizens and institutional orders for local schools/panchayat.',
        'ONDC and rural e-commerce pickup point integration generating ancillary footfall.',
      ],
      threats: [
        'Expansion of quick-commerce and large supermarket chains into semi-urban taluka hubs.',
        'Unregulated new kirana shops opening in adjoining alleys sparking margin price wars.',
        'Inflation spikes reducing customer basket size and purchasing power.',
        'Default on unpaid customer credit balances accumulating in neighborhood ledgers.',
      ],
      competitorDensityDesc:
        'Within 2 km, 3–6 small neighbourhood shops exist. Most lack digital UPI soundboxes, diverse grocery varieties, or micro-banking services, providing an edge for a modernized one-stop kirana store.',
      pricingBenchmarks: [
        { label: 'Packaged Branded FMCG Margin', range: '7% – 12% Gross' },
        { label: 'Loose Pulses, Grains & Spices', range: '16% – 24% Gross' },
        { label: 'Seasonal Commodities & Oils', range: '8% – 14% Gross' },
        { label: 'Digital Services / Micro-ATM Fee', range: '₹10 – ₹25 / transaction' },
      ],
      valueAdditionAdvice:
        'Do not depend solely on branded FMCG goods (which yield only 8%). Repackage quality loose pulses, sugar, and grains into clean 1kg/2kg bags under your store label to earn 20%+ margins, and add a Micro-ATM AEPS counter.',
      operationalCostAdvice:
        'For the first 6 months: Strictly cap customer credit (khata) to trusted individuals with an absolute ceiling of ₹1,500. Maintain an inventory turnover ratio of under 18 days for fast-moving items.',
      subsidyConvergence:
        'Eligible for PM MUDRA (Shishu / Kishore) or State SCA Micro Finance Scheme (6.5% p.a., 3-year tenure) with zero collateral requirement.',
    },
    hi: {
      id: 'Retail',
      label: 'ग्रामीण किराना एवं जनरल स्टोर',
      strengths: [
        'दैनिक उपभोग की वस्तुओं (अनाज, तेल, साबुन) की निरंतर और मंदी-मुक्त मांग।',
        'दैनिक नकद बिक्री और यूपीआई (UPI) से तुरंत भुगतान प्राप्ति।',
        'कस्बाई थोक व्यापारियों से समय पर माल और साख (क्रेडिट) की सुविधा।',
        'गाँव व मोहल्ले में आपसी विश्वास और स्थायी ग्राहक आधार।',
      ],
      weaknesses: [
        'सैकड़ों प्रकार के सामान (SKUs) में पूंजी का फंसना।',
        'गाँव में खाता/उधारी पर सामान देने से पैसे फंसने का जोखिम।',
        'ब्रांडेड FMCG उत्पादों पर कम मार्जिन (6-12%), जिससे ज्यादा बिक्री की जरूरत होती है।',
        'सीमित दुकान स्थान तथा सामान की एक्सपायरी या चूहे लगने का नुकसान।',
      ],
      opportunities: [
        'दुकान पर आधार मिनी-एटीएम (AEPS), मोबाइल रिचार्ज और बिजली बिल भुगतान सेवा शुरू करना।',
        'थोक मंडी से खुला अनाज लाकर खुद की पैकिंग में 20% मार्जिन पर बेचना।',
        'गाँव के स्कूलों, हॉस्टल और कार्यक्रमों में थोक राशन की आपूर्ति।',
        'ई-कॉमर्स और पार्सल पिकअप पॉइंट बनकर अतिरिक्त कमाई करना।',
      ],
      threats: [
        'नजदीकी कस्बों में सुपरमार्केट और थोक मार्ट का विस्तार।',
        'आस-पास नई दुकानें खुलने से मूल्य प्रतिस्पर्धा और मार्जिन में कमी।',
        'महंगाई बढ़ने से ग्रामीणों की क्रय शक्ति पर प्रभाव।',
        'उधारी न चुकाने वाले ग्राहकों के कारण कार्यशील पूंजी का संकट।',
      ],
      competitorDensityDesc:
        '2 किमी के क्षेत्र में 3 से 6 छोटी किराना दुकानें हैं। अधिकांश दुकानों में डिजिटल पेमेंट साउंडबॉक्स, व्यवस्थित रैक और मिनी-एटीएम सेवाएं नहीं हैं, जो आपको बढ़त दिला सकती हैं।',
      pricingBenchmarks: [
        { label: 'ब्रांडेड FMCG उत्पाद मार्जिन', range: '7% – 12% ग्रॉस' },
        { label: 'खुली दालें, अनाज एवं मसाले', range: '16% – 24% ग्रॉस' },
        { label: 'खाद्य तेल एवं चीनी', range: '8% – 14% ग्रॉस' },
        { label: 'मिनी एटीएम / बिल भुगतान शुल्क', range: '₹10 – ₹25 / लेनदेन' },
      ],
      valueAdditionAdvice:
        'केवल पैकेट बंद सामान पर निर्भर न रहें। थोक मंडी से दालें और मसाले लाकर 1-2 किग्रा की साफ थैलियों में पैक कर बेचें (22% मुनाफा) और मिनी-एटीएम काउंटर लगाएं।',
      operationalCostAdvice:
        'पहले 6 माह में: उधारी (खाता) किसी भी ग्राहक को ₹1,500 से ज्यादा न दें। तेज बिकने वाले सामान को 15 दिन में रोटेट करें।',
      subsidyConvergence:
        'SCA माइक्रो फाइनेंस योजना (6.5% p.a.) अथवा पीएम मुद्रा योजना (किशोर लोन) के तहत संपार्श्विक-मुक्त (कोलैटरल फ्री) ऋण लें।',
    },
    gu: {
      id: 'Retail',
      label: 'ગામ્ય કિરાણા અને જનરલ સ્ટોર',
      strengths: [
        'અનાજ, તેલ, સાબુ જેવી દૈનિક જરૂરિયાતની ચીજોની સતત બારેમાસ માંગ.',
        'કાઉન્ટર પર રોકડ અને UPI થી ત્વરિત નાણાંની આવક.',
        'નજીકના જથ્થાબંધ વેપારીઓ પાસેથી ૭-૧૫ દિવસની શાખ (ક્રેડિટ).',
        'ગામમાં અંગત સંબંધો અને કાયમી ગ્રાહક વર્ગ.',
      ],
      weaknesses: [
        'વિવિધ પ્રકારની વસ્તુઓમાં મૂડી રોકાઈ જવી.',
        'ગામડામાં ખાતા/ઉધારીને કારણે નાણાં ફસાઈ જવાનું જોખમ.',
        'બ્રાન્ડેડ પ્રોડક્ટ્સ પર ઓછું માર્જિન (૭-૧૨%).',
        'જગ્યાની મર્યાદા અને સામાનની એક્સપાયરી તારીખનું જોખમ.',
      ],
      opportunities: [
        'માઇક્રો-ATM (AEPS), મોબાઇલ રિચાર્જ અને લાઈટબિલ ભરવાની સેવા શરૂ કરવી.',
        'માર્કેટ યાર્ડમાંથી ખુલ્લી કઠોળ-અનાજ લાવી પોતાના પેકિંગમાં ૨૦%+ નફો મેળવવો.',
        'હોસ્ટેલ અને સ્થાનિક પ્રસંગોમાં કરિયાણાનો મોટો સપ્લાય.',
        'ઓનલાઇન કુરિયર ડિલિવરી પોઇન્ટ બની વધારાની આવક મેળવવી.',
      ],
      threats: [
        'તાલુકા મથકે મોટા મોલ અને સુપરમાર્કેટની હરીફાઈ.',
        'ગામમાં નવી દુકાનો ખુલવાથી ભાવની સ્પર્ધા.',
        'મોંઘવારીને કારણે ગ્રાહકોની ખરીદશક્તિ પર અસર.',
        'લાંબી ઉધારી પાછી ન આવતા રોકડની તંગી.',
      ],
      competitorDensityDesc:
        '૨ કિમી ત્રિજ્યામાં ૩-૬ નાની દુકાનો છે. મોટાભાગની દુકાનોમાં કમ્પ્યુટર બિલિંગ, વ્યવસ્થિત ડિસ્પ્લે કે મિની-ATM નથી, જે આધુનિક સ્ટોર માટે ઉત્તમ તક છે.',
      pricingBenchmarks: [
        { label: 'બ્રાન્ડેડ FMCG વસ્તુઓ માર્જિન', range: '૭% – ૧૨% ગ્રોસ' },
        { label: 'કઠોળ, અનાજ અને મસાલા', range: '૧૬% – ૨૪% ગ્રોસ' },
        { label: 'તેલ અને ખાંડ જથ્થાબંધ', range: '૮% – ૧૪% ગ્રોસ' },
        { label: 'મિની ATM કમિશન', range: '₹૧૦ – ₹૨૫ / ટ્રાન્ઝેક્શન' },
      ],
      valueAdditionAdvice:
        'માત્ર બ્રાન્ડેડ વસ્તુઓ વેચવાને બદલે ખુલ્લી દાળ-અનાજ લાવી ચોખ્ખા પેકેટ બનાવી વેચો અને આધાર ATM સુવિધા શરૂ કરો.',
      operationalCostAdvice:
        'પ્રથમ ૬ મહિનામાં: ઉધારી મર્યાદા કડક રાખો (મહત્તમ ₹૧,૫૦૦). ઝડપથી વેચાતી વસ્તુઓ દર ૧૫ દિવસે મંગાવો.',
      subsidyConvergence:
        'SCA માઇક્રો ફાયનાન્સ યોજના (૬.૫% p.a.) અથવા પ્રધાનમંત્રી મુદ્રા યોજના હેઠળ લાભ મેળવો.',
    },
  },

  Textile: {
    en: {
      id: 'Textile',
      label: 'Textiles & Handloom Enterprise',
      strengths: [
        'Rich regional craft tradition (Patola, Bandhani, embroidery) with high cultural value.',
        'Extremely low recurring electricity cost for manual handlooms and pedal sewing machines.',
        'Surging national demand for authentic artisanal ethnic apparel and sustainable cotton fabrics.',
        'Export and boutique buyer premium for authenticated GI-tagged handloom textiles.',
      ],
      weaknesses: [
        'High artisanal skill learning curve requiring experienced weavers and craftspeople.',
        'Working capital locked in specialized cotton/silk yarn inventory during weaving cycles.',
        'Slower production turnover compared to automated high-speed powerloom mills.',
        'Vulnerability to middlemen and master weavers taking the lion’s share of profit.',
      ],
      opportunities: [
        'Direct-to-consumer online selling through government e-commerce (GeM, Amazon Karigar, ONDC).',
        'Direct supply to urban designer boutiques and ethnic lifestyle brands in Vadodara/Ahmedabad.',
        'School and local institutional uniform tailoring contracts providing bulk steady cash flow.',
        'Participation in National Handloom expos (Surajkund, Dilli Haat) with travel subsidies.',
      ],
      threats: [
        'Cheap synthetic mill-made imitation fabrics sold at one-third the price in local markets.',
        'Yarn price volatility driven by raw cotton export tariffs and spinning mill cartels.',
        'Younger generation migration away from traditional weaving into industrial wage labor.',
        'Seasonal concentration of revenue during wedding and festival months (Diwali/Navratri).',
      ],
      competitorDensityDesc:
        'Within 10 km, 8–15 traditional home weavers operate in an unorganized cottage setup. Few have direct branding or direct retail boutique channels, leaving room for a consolidated value-added apparel unit.',
      pricingBenchmarks: [
        { label: 'Standard Handloom Fabric', range: '₹140 – ₹280 / metre' },
        { label: 'Artisanal Saree / Dupatta', range: '₹850 – ₹3,800 / piece' },
        { label: 'Custom Tailored Ethnic Garment', range: '₹350 – ₹900 / piece' },
        { label: 'Institutional School Uniform Set', range: '₹450 – ₹650 / set' },
      ],
      valueAdditionAdvice:
        'Do not sell unstitched raw fabric to middlemen at ₹120/metre. Convert it into ready-to-wear kurtis, dupattas, and embroidered tote bags. Finished apparel multiplies your margin per meter by 2.8x.',
      operationalCostAdvice:
        'Form a cooperative cluster of 3–5 local tailors/weavers to purchase yarn in 100 kg wholesale bundles, cutting raw material costs by 18%. Use off-season months to build festival inventory.',
      subsidyConvergence:
        'Eligible for Weaver Mudra Scheme (concessional interest rate at 6%), Handloom Weavers Comprehensive Welfare Scheme, and State SCA Term Loan (8% p.a.).',
    },
    hi: {
      id: 'Textile',
      label: 'वस्त्र उद्योग एवं हथकरघा',
      strengths: [
        'क्षेत्रीय पारंपरिक कला (बांधनी, पटोला, कशीदाकारी) का ऐतिहासिक महत्व।',
        'हथकरघा और सिलाई मशीनों में नाममात्र की बिजली खपत।',
        'प्राकृतिक सूती व पारंपरिक परिधानों की राष्ट्रीय व अंतरराष्ट्रीय बाजार में भारी मांग।',
        'GI टैग वाले उत्पादों पर उच्च प्रीमियम और सरकारी प्रदर्शनियों में स्थान।',
      ],
      weaknesses: [
        'कुशल कारीगरों की जरूरत और उत्पादन की धीमी गति।',
        'धागे (सूत) और कच्चे माल में कार्यशील पूंजी का फंसना।',
        'पावरलूम की तुलना में कम उत्पादन क्षमता।',
        'बिचौलियों और बड़े व्यापारियों द्वारा कारीगरों का शोषण।',
      ],
      opportunities: [
        'GeM पोर्टल, ONDC और सरकारी ई-कॉमर्स प्लेटफॉर्म पर सीधे बिक्री।',
        'वडोदरा/अहमदाबाद के बुटीक और परिधान ब्रांड्स को सीधे आपूर्ति।',
        'स्थानीय स्कूलों और संस्थानों के लिए यूनिफॉर्म सिलाई के थोक अनुबंध।',
        'शिल्प मेलों और दिल्ली हाट जैसी प्रदर्शनियों में सब्सिडी के साथ भागीदारी।',
      ],
      threats: [
        'सस्ते सिंथेटिक और मिल-निर्मित कपड़ों की बाजार में भरमार।',
        'सूत (यार्न) के दामों में अप्रत्याशित उछाल।',
        'नई पीढ़ी का इस पारंपरिक कला से विमुख होना।',
        'शादी-विवाह और त्योहारों पर ही मुख्य रूप से बिक्री निर्भर रहना।',
      ],
      competitorDensityDesc:
        '10 किमी क्षेत्र में 8 से 15 पारंपरिक बुनकर परिवार हैं जो बिचौलियों के लिए काम करते हैं। सीधे ग्राहकों तक पहुंचने वाले आधुनिक परिधान ब्रांड की बहुत कमी है।',
      pricingBenchmarks: [
        { label: 'हथकरघा सूती कपड़ा', range: '₹140 – ₹280 / मीटर' },
        { label: 'पारंपरिक साड़ी / दुपट्टा', range: '₹850 – ₹3,800 / पीस' },
        { label: 'रेडीमेड एथनिक कुर्ता/ड्रेस', range: '₹350 – ₹900 / पीस' },
        { label: 'स्कूल यूनिफॉर्म सेट', range: '₹450 – ₹650 / सेट' },
      ],
      valueAdditionAdvice:
        'कच्चा कपड़ा बेचने के बजाय सिले-सिलाए कुर्ते, दुपट्टे और बैग तैयार करें। तैयार कपड़ों में 2.8 गुना अधिक लाभ मिलता है।',
      operationalCostAdvice:
        '3-4 बुनकरों के साथ मिलकर थोक में सूत खरीदें (18% बचत)। ऑफ-सीजन में त्योहारी सीजन के लिए स्टॉक तैयार करें।',
      subsidyConvergence:
        'बुनकर मुद्रा योजना (6% रियायती ब्याज दर) और राज्य SCA 8% टर्म लोन योजना का दोहरा लाभ उठाएं।',
    },
    gu: {
      id: 'Textile',
      label: 'ટેક્ષટાઈલ અને હાથવણાટ ઉદ્યોગ',
      strengths: [
        'બાંધણી, પટોળા અને ભરતકામ જેવા સમૃદ્ધ પરંપરાગત વારસાનું મૂલ્ય.',
        'હેન્ડલૂમ અને સિલાઈ મશીનમાં નહિવત વીજળીનો વપરાશ.',
        'શુદ્ધ સુતરાઉ અને હેન્ડીક્રાફ્ટ વસ્ત્રોની શહેરોમાં વધતી માંગ.',
        'GI ટેગ આધારે પ્રીમિયમ કિંમતે વેચાણની સુવિધા.',
      ],
      weaknesses: [
        'કુશળ કારીગરોની જરૂરિયાત અને લાંબો ઉત્પાદન સમય.',
        'યાર્ન (કાંતેલા દોરા) માં મૂડી રોકાઈ જવી.',
        'પાવરલૂમ મિલોની સરખામણીએ ધીમું ઉત્પાદન.',
        'વચેટિયા વેપારીઓ દ્વારા ઓછા ભાવ આપવાનું જોખમ.',
      ],
      opportunities: [
        'GeM પોર્ટલ અને ONDC મારફતે ઓનલાઇન દેશભરમાં સીધું વેચાણ.',
        'વડોદરા, સુરત અને અમદાવાદના બુટીક સાથે સીધું જોડાણ.',
        'સ્થાનિક શાળાઓ અને કોલેજોના ગણવેશ (યુનિફોર્મ) ના જથ્થાબંધ ઓર્ડર.',
        'રાજ્ય અને કેન્દ્ર સરકારના હસ્તકલા મેળાઓમાં સ્ટોલ.',
      ],
      threats: [
        'સસ્તા સિન્થેટીક અને મિલના કપડાંની હરીફાઈ.',
        'દોરાના ભાવમાં અસ્થિરતા.',
        'નવી પેઢીનું વણાટકામ છોડી અન્ય નોકરીઓમાં જવું.',
        'મુખ્યત્વે તહેવારો અને લગ્નની સિઝન પર નિર્ભરતા.',
      ],
      competitorDensityDesc:
        '૧૦ કિમીમાં ૮-૧૫ પરંપરાગત વણકરો કાર્યરત છે, પરંતુ ડાયરેક્ટ બ્રાન્ડિંગ અને તૈયાર વસ્ત્રો વેચતા એકમોની અછત છે.',
      pricingBenchmarks: [
        { label: 'હેન્ડલૂમ કાપડ', range: '₹૧૪૦ – ₹૨૮૦ / મીટર' },
        { label: 'પરંપરાગત સાડી / દુપટ્ટો', range: '₹૮૫૦ – ₹૩,૮૦૦ / નંગ' },
        { label: 'રેડીમેડ કુર્તી / ડ્રેસ', range: '₹૩૫૦ – ₹૯૦૦ / નંગ' },
        { label: 'સ્કૂલ યુનિફોર્મ જોડી', range: '₹૪૫૦ – ₹૬૫૦ / જોડી' },
      ],
      valueAdditionAdvice:
        'માત્ર કાપડ વેચવાને બદલે સિલાઈ કરી કુર્તી અને દુપટ્ટા બનાવી વેચો. તૈયાર કપડામાં ૨.૮ ગણો નફો મળે છે.',
      operationalCostAdvice:
        'જૂથ બનાવી જથ્થાબંધ દોરાની ખરીદી કરો (૧૮% બચત). સિઝન સિવાયના મહિનામાં સ્ટોક તૈયાર કરો.',
      subsidyConvergence:
        'વીવર્સ મુદ્રા લોન અને SCA ૮% ટર્મ લોન યોજના સાથે સહાય મેળવો.',
    },
  },

  Agriculture: {
    en: {
      id: 'Agriculture',
      label: 'Agri-Inputs & Services Depot',
      strengths: [
        'Massive recurring agrarian customer base across surrounding farming villages.',
        'High seasonal purchase volume for certified hybrid seeds, fertilizers, and bio-pesticides.',
        'Distributor trade incentives and credit margins from primary agrochemical companies.',
        'Direct alignment with Government agricultural schemes (PM-KISAN, Soil Health Card).',
      ],
      weaknesses: [
        'Statutory licensing requirements (Insecticide License, Fertilizer Retailer Certificate).',
        'Seasonal demand spikes concentrated in Kharif (June–July) and Rabi (October–November) sowing.',
        'High working capital requirements during pre-monsoon inventory stocking.',
        'Risk of delayed payments when farm harvest yields are impacted by weather vagaries.',
      ],
      opportunities: [
        'Expanding into organic bio-fertilizers, vermicompost, and bio-stimulants commanding 30%+ margins.',
        'Custom farm machinery hire services (rotavator, drone spraying, power weeder rentals).',
        'Soil testing diagnostic counter providing scientific NPK recommendations to farmers.',
        'Drip irrigation equipment and solar water pump component distribution.',
      ],
      threats: [
        'Monsoon failure, drought, or unseasonal heavy rains crippling agricultural output.',
        'Direct subsidy transfers or state cooperative PACs distributing subsidized fertilizer at fixed low margins.',
        'Stringent regulatory inspections regarding seed germination rates and expired chemicals.',
        'Farmer indebtedness leading to extended credit cycles and collection delays.',
      ],
      competitorDensityDesc:
        'Within 5 km, 2–3 traditional fertilizer dealers operate. Most do not offer organic inputs, spray equipment rentals, or technical soil advisory, which gives a modern agri-depot a decisive competitive moat.',
      pricingBenchmarks: [
        { label: 'Certified Hybrid Seeds', range: '10% – 18% Trade Margin' },
        { label: 'Bio-Fertilizers & Organic Manure', range: '22% – 35% Trade Margin' },
        { label: 'Crop Protection & Micro-nutrients', range: '14% – 22% Trade Margin' },
        { label: 'Sprayer / Implement Rental', range: '₹350 – ₹600 / day' },
      ],
      valueAdditionAdvice:
        'Do not depend only on urea and DAP (where government margins are fixed at barely 3–5%). Pair every sale with organic bio-stimulants, zinc/boron micronutrients, and water-soluble fertilizers that yield 25%+ margins.',
      operationalCostAdvice:
        'Stock seasonal seeds and chemical inventory exactly 3 weeks before monsoon onset to minimize bank interest holding costs. Partner with an FPO (Farmer Producer Org) for pre-booked bulk orders.',
      subsidyConvergence:
        'Eligible for Agriculture Infrastructure Fund (AIF) 3% interest subvention and State SCA concessional credit (8% p.a.).',
    },
    hi: {
      id: 'Agriculture',
      label: 'कृषि सेवा एवं आदान (एग्री-इनपुट) केंद्र',
      strengths: [
        'आसपास के सभी गाँवों के किसानों का स्थायी और बड़ा ग्राहक आधार।',
        'बुवाई के समय प्रमाणित बीज, खाद और कीटनाशकों की भारी बिक्री।',
        'एग्रोकेमिकल कंपनियों से डिस्ट्रीब्यूटर इंसेंटिव और क्रेडिट सपोर्ट।',
        'पीएम-किसान और मृदा स्वास्थ्य कार्ड से जुड़ा सीधा व्यवसाय।',
      ],
      weaknesses: [
        'कीटनाशक और खाद बिक्री के लिए सरकारी लाइसेंस और औपचारिकताएं।',
        'खरीफ और रबी सीजन में ही 70% व्यापार सीमित होना।',
        'सीजन से पहले स्टॉक भरने के लिए बड़ी पूंजी की आवश्यकता।',
        'फसल खराब होने पर किसानों से भुगतान में देरी का जोखिम।',
      ],
      opportunities: [
        'जैविक खाद, केंचुआ खाद और बायो-पेस्टीसाइड बेचकर 30%+ मार्जिन कमाना।',
        'ड्रोन छिड़काव, पावर वीडर और स्प्रेयर किराए पर देने की सेवा।',
        'दुकान पर मिट्टी जांच (सॉइल टेस्टिंग) सेवा शुरू करना।',
        'ड्रिप इरिगेशन और सोलर पंप उपकरणों की डीलरशिप।',
      ],
      threats: [
        'सूखा या बेमौसम बारिश से खेती का नुकसान होना।',
        'सहकारी समितियों (पैक्स) से यूरिया-डीएपी की सरकारी प्रतिस्पर्धा।',
        'गुणवत्ता नियंत्रण और एक्सपायरी दवाओं की सघन चेकिंग।',
        'उधारी पर दिए सामान की वसूली में किसानों की परेशानी।',
      ],
      competitorDensityDesc:
        '5 किमी में 2-3 खाद-बीज की दुकानें हैं, परंतु कोई भी आधुनिक जैविक उत्पाद, मिट्टी परीक्षण या कृषि यंत्र किराए पर नहीं दे रहा है।',
      pricingBenchmarks: [
        { label: 'प्रमाणित हाइब्रिड बीज मार्जिन', range: '10% – 18% ट्रेड मार्जिन' },
        { label: 'जैविक खाद एवं बायो-स्टिमुलेंट', range: '22% – 35% ट्रेड मार्जिन' },
        { label: 'सूक्ष्म पोषक तत्व एवं कीटनाशक', range: '14% – 22% ट्रेड मार्जिन' },
        { label: 'स्प्रेयर / कृषि यंत्र किराया', range: '₹350 – ₹600 / दिन' },
      ],
      valueAdditionAdvice:
        'सिर्फ यूरिया/डीएपी पर निर्भर न रहें (3-5% मार्जिन)। साथ में जिंक, सल्फर और बायो-फर्टिलाइजर बेचें जहाँ 25% से अधिक मार्जिन मिलता है।',
      operationalCostAdvice:
        'मानसून शुरू होने के 3 हफ्ते पहले ही इन्वेंट्री मंगाएं ताकि ब्याज का खर्च बचे। स्थानीय FPO के साथ अग्रिम बुकिंग करें।',
      subsidyConvergence:
        'एग्रीकल्चर इन्फ्रास्ट्रक्चर फंड (AIF) 3% ब्याज छूट और राज्य SCA 8% टर्म लोन का लाभ लें।',
    },
    gu: {
      id: 'Agriculture',
      label: 'કૃષિ સેવા અને બિયારણ-ખાતર કેન્દ્ર',
      strengths: [
        'આજુબાજુના ખેડૂતોનો વિશાળ કાયમી ગ્રાહક વર્ગ.',
        'વાવણી સમયે હાઇબ્રિડ બિયારણ અને ખાતરની પુષ્કળ માંગ.',
        'કંપનીઓ તરફથી મળતા ડિસ્ટ્રિબ્યુટર ઇન્સેન્ટિવ્સ.',
        'ખેતીવાડી યોજનાઓ અને સોઇલ હેલ્થ કાર્ડ સાથે સુસંગત.',
      ],
      weaknesses: [
        'જંતુનાશક અને ખાતર માટે સરકારી લાયસન્સની કડક શરતો.',
        'ખરીફ અને રવિ સીઝનમાં જ મુખ્ય વેચાણ.',
        'વાવણી પહેલા માલ ભરવા માટે મોટી કાર્યકારી મૂડી.',
        'દુકાળ કે કમોસમી વરસાદ વખતે ઉધારી ફસાઈ જવી.',
      ],
      opportunities: [
        'જૈવિક ખાતર, અળસિયા ખાતર અને ઓર્ગેનિક દવાઓમાં ૩૦%+ નફો.',
        'ડ્રોન સ્પ્રે અને પાવર વીડર ભાડે આપવાની સેવા.',
        'જમીન ચકાસણી (સોઇલ ટેસ્ટિંગ) ની સુવિધા.',
        'ટપક સિંચાઈ અને સોલાર પંપના સ્પેરપાર્ટ્સનું વેચાણ.',
      ],
      threats: [
        'કમોસમી વરસાદ કે દુષ્કાળનું જોખમ.',
        'મંડળીઓ દ્વારા સરકારી ખાતરનું વિતરણ.',
        'એક્સપાયરી દવાઓ અને ચકાસણીના કાયદાકીય નિયમો.',
        'ખેડૂતોની નબળી આર્થિક સ્થિતિ વખતે વસૂલાતમાં વિલંબ.',
      ],
      competitorDensityDesc:
        '૫ કિમીમાં ૨-૩ ખાતરની દુકાનો છે. કોઈ પણ ઓર્ગેનિક દવાઓ કે કૃષિ યંત્રો ભાડે આપતું નથી.',
      pricingBenchmarks: [
        { label: 'પ્રમાણિત બિયારણ માર્જિન', range: '૧૦% – ૧૮% ટ્રેડ માર્જિન' },
        { label: 'ઓર્ગેનિક ખાતર અને દવાઓ', range: '૨૨% – ૩૫% ટ્રેડ માર્જિન' },
        { label: 'સૂક્ષ્મ પોષક તત્વો', range: '૧૪% – ૨૨% ટ્રેડ માર્જિન' },
        { label: 'સ્પ્રેયર ભાડું', range: '₹૩૫૦ – ₹૬૦૦ / દિવસ' },
      ],
      valueAdditionAdvice:
        'માત્ર રાસાયણિક ખાતર પર નિર્ભર ન રહેતા જૈવિક કલ્ચર અને સૂક્ષ્મ પોષક તત્વો વેચો, જેમાં ૨૫%+ માર્જિન મળે છે.',
      operationalCostAdvice:
        'વાવણીના ૩ અઠવાડિયા અગાઉ જ સ્ટોક લાવો જેથી વ્યાજ ખર્ચ ઘટે. FPO સાથે આગોતરા કરાર કરો.',
      subsidyConvergence:
        'એગ્રીકલ્ચર ઇન્ફ્રાસ્ટ્રક્ચર ફંડ (AIF) અને SCA ૮% ટર્મ લોન યોજના સાથે જોડાણ કરો.',
    },
  },

  Handicrafts: {
    en: {
      id: 'Handicrafts',
      label: 'Artisanal Handicrafts & Regional Artifacts',
      strengths: [
        'Abundant local indigenous raw materials (clay, bamboo, reclaimed wood, natural fibers).',
        'Distinctive cultural identity and regional tribal heritage appealing to domestic tourists.',
        'High value-to-weight ratio making postal e-commerce shipping economically feasible.',
        'Strong government sponsorship for master artisans via DC (Handicrafts).',
      ],
      weaknesses: [
        'Individual handmade production limits rapid scalability during sudden bulk demand.',
        'Fragmented marketing and absence of direct cataloging for modern urban consumers.',
        'Dependence on festive exhibitions and tourist tourist seasons for peak revenue.',
        'Artisan working capital depletion between lengthy production and payment cycles.',
      ],
      opportunities: [
        'Listing verified artisanal creations on ONDC, Amazon Karigar, and Tribes India.',
        'Corporate gifting packages for festive corporate Diwali / New Year celebrations.',
        'Eco-friendly biodegradable packaging solutions replacing plastic gift wrap.',
        'Conducting weekend pottery and tribal art workshops for visiting eco-tourists.',
      ],
      threats: [
        'Cheap plastic and resin mass-manufactured Chinese souvenir replicas.',
        'Exploitative urban craft middlemen purchasing at low wholesale prices for 400% markups.',
        'Scarcity of seasoned raw bamboo or clay due to environmental extraction permits.',
        'Youth migration away from family artisanal lineages.',
      ],
      competitorDensityDesc:
        'Within 10 km, several individual artisan households work independently. There is no unified collective showroom or e-commerce fulfillment studio, presenting an outstanding aggregation opportunity.',
      pricingBenchmarks: [
        { label: 'Terracotta & Clay Artifacts', range: '₹120 – ₹450 / piece' },
        { label: 'Bamboo & Wood Functional Decor', range: '₹280 – ₹1,200 / piece' },
        { label: 'Artisanal Home Furnishing Decor', range: '₹450 – ₹2,200 / piece' },
        { label: 'Corporate Curated Gift Hampers', range: '₹750 – ₹3,500 / hamper' },
      ],
      valueAdditionAdvice:
        'Package small terracotta or bamboo items into curated corporate and festive gift boxes with an authentic artisan story card. This immediately doubles the perceived price.',
      operationalCostAdvice:
        'Source natural clay and bamboo in off-peak dry seasons. Maintain a high-resolution smartphone photo catalog to secure 50% advance payments on custom bulk orders.',
      subsidyConvergence:
        'Eligible for Ambedkar Hastshilp Vikas Yojana (AHVY), Mudra Shishu loan, and State SCA concessional Term Loan (8% p.a.).',
    },
    hi: {
      id: 'Handicrafts',
      label: 'हस्तशिल्प एवं क्षेत्रीय कलाकृतियाँ',
      strengths: [
        'स्थानीय प्राकृतिक कच्चे माल (मिट्टी, बांस, लकड़ी) की सुलभ उपलब्धता।',
        'विशिष्ट जनजातीय और क्षेत्रीय सांस्कृतिक पहचान, जिसकी शहरों में मांग है।',
        'हल्के वजन के उत्पाद, जिन्हें डाक या कूरियर से आसानी से भेजा जा सकता है।',
        'विकास आयुक्त (हस्तशिल्प) द्वारा कारीगर पहचान पत्र और योजनाओं का लाभ।',
      ],
      weaknesses: [
        'हाथ से बनाने के कारण अचानक बड़े ऑर्डरों को पूरा करने में समय लगना।',
        'सीधे आधुनिक बाजार और ई-कॉमर्स की समझ का अभाव।',
        'त्योहारों और मेलों के समय ही मुख्य बिक्री होना।',
        'उत्पादन से भुगतान मिलने के बीच पूंजी का अटक जाना।',
      ],
      opportunities: [
        'ONDC, अमेजन कारीगर और ट्राइब्स इंडिया पर ऑनलाइन बिक्री।',
        'कंपनियों और बैंकों के लिए कॉर्पोरेट दिवाली गिफ्ट हैंपर्स तैयार करना।',
        'प्लास्टिक की जगह बांस और जूट के पर्यावरण-अनुकूल उत्पादों का प्रचार।',
        'पर्यटकों के लिए पॉटरी और हस्तशिल्प कार्यशालाएं आयोजित करना।',
      ],
      threats: [
        'फैक्ट्रियों में बने सस्ते प्लास्टिक और रेजिन के नकली उत्पादों की बाढ़।',
        'शहरी बिचौलियों द्वारा कारीगरों को बहुत कम दाम देकर खुद भारी मुनाफा कमाना।',
        'कच्चे माल (बांस/लकड़ी) के दामों में वृद्धि।',
        'कारीगरों की अगली पीढ़ी का इस काम से दूर होना।',
      ],
      competitorDensityDesc:
        '10 किमी क्षेत्र में कई कारीगर परिवार स्वतंत्र रूप से काम करते हैं, परंतु कोई संगठित स्टोर या ऑनलाइन ब्रांड नहीं है। यह एकत्रीकरण का बड़ा अवसर है।',
      pricingBenchmarks: [
        { label: 'टेराकोटा एवं मिट्टी की कलाकृतियाँ', range: '₹120 – ₹450 / पीस' },
        { label: 'बांस एवं लकड़ी के सजावटी उत्पाद', range: '₹280 – ₹1,200 / पीस' },
        { label: 'हस्तशिल्प होम डेकोर वस्तुएं', range: '₹450 – ₹2,200 / पीस' },
        { label: 'कॉर्पोरेट गिफ्ट हैंपर', range: '₹750 – ₹3,500 / हैंपर' },
      ],
      valueAdditionAdvice:
        'उत्पादों को सुंदर पैकेजिंग में artisan कहानी कार्ड के साथ रखें। कॉर्पोरेट गिफ्ट के रूप में बेचने पर 2 गुना अधिक दाम मिलता है।',
      operationalCostAdvice:
        'कच्चा माल सूखी ऋतु में थोक में खरीदें। बड़े आर्डरों पर हमेशा 50% अग्रिम (advance) राशि प्राप्त करें।',
      subsidyConvergence:
        'अंबेडकर हस्तशिल्प विकास योजना (AHVY) एवं SCA 8% टर्म लोन से सहायता प्राप्त करें।',
    },
    gu: {
      id: 'Handicrafts',
      label: 'હસ્તકલા અને પરંપરાગત કલાકૃતિઓ',
      strengths: [
        'સ્થાનિક માટી, વાંસ અને લાકડાની સરળ ઉપલબ્ધતા.',
        'આદિવાસી અને પરંપરાગત કળાનું વિશેષ આકર્ષણ.',
        'ઓછા વજનના કારણે કુરિયર દ્વારા સહેલાઈથી મોકલી શકાય.',
        'હસ્તકલા વિકાસ નિગમ તરફથી સત્તાવાર સપોર્ટ.',
      ],
      weaknesses: [
        'હાથથી બનાવતા હોવાથી ઝડપી ઉત્પાદનમાં મર્યાદા.',
        'શહેરી ગ્રાહકો સુધી સીધા પહોંચવાનો અભાવ.',
        'મુખ્યત્વે મેળાઓ અને તહેવારો પર નિર્ભરતા.',
        'માલ વેચાયા પછી પૈસા છૂટા થવામાં સમય લાગવો.',
      ],
      opportunities: [
        'ONDC, Amazon Karigar અને ટ્રાઇબ્સ ઇન્ડિયા પર ઓનલાઇન વેચાણ.',
        'કોર્પોરેટ દિવાળી ગિફ્ટ પેકિંગનું સપ્લાય.',
        'ઇકો-ફ્રેન્ડલી વાંસ અને માટીના વાસણોનું વેચાણ.',
        'પ્રવાસીઓ માટે વર્કશોપનું આયોજન.',
      ],
      threats: [
        'પ્લાસ્ટિક અને મશીનથી બનેલા સસ્તા ચાઇનીઝ શો-પીસની હરીફાઈ.',
        'વચેટિયા વેપારીઓ દ્વારા ઓછા ભાવ આપવાનું જોખમ.',
        'કાચા માલની અછત.',
        'યુવા પેઢીનું આ પરંપરાગત વ્યવસાયથી વિમુખ થવું.',
      ],
      competitorDensityDesc:
        '૧૦ કિમીમાં ઘણા કલાકારો છૂટાછવાયા કામ કરે છે. કોઈ સંગઠિત શોરૂમ કે ઓનલાઇન સપ્લાય સેન્ટર નથી.',
      pricingBenchmarks: [
        { label: 'માટીકામ અને ટેરાકોટા', range: '₹૧૨૦ – ₹૪૫૦ / નંગ' },
        { label: 'વાંસ અને લાકડાની કલાકૃતિઓ', range: '₹૨૮૦ – ₹૧,૨૦૦ / નંગ' },
        { label: 'ડેકોરેટિવ હોમ આઇટમ્સ', range: '₹૪૫૦ – ₹૨,૨૦૦ / નંગ' },
        { label: 'કોર્પોરેટ ગિફ્ટ બોક્સ', range: '₹૭૫૦ – ₹૩,૫૦૦ / બોક્સ' },
      ],
      valueAdditionAdvice:
        'વસ્તુઓનું આકર્ષક બોક્સ પેકિંગ કરી આર્ટિઝન સ્ટોરી કાર્ડ મૂકો. ગિફ્ટિંગ માર્કેટમાં ડબલ ભાવ મળે છે.',
      operationalCostAdvice:
        'કાચો માલ અગાઉથી ખરીદો. મોટા ઓર્ડરમાં ૫૦% એડવાન્સ રકમ અવશ્ય લો.',
      subsidyConvergence:
        'હસ્તશિલ્પ વિકાસ યોજના અને SCA ૮% ટર્મ લોન સાથે વ્યવસાય શરૂ કરો.',
    },
  },

  Services: {
    en: {
      id: 'Services',
      label: 'Rural Digital & Repair Services',
      strengths: [
        'Minimal physical raw material inventory requirement leading to high net service margins.',
        'Booming local penetration of two-wheelers, solar home systems, smartphones, and submersible pumps.',
        'Immediate cash-on-delivery payments upon job completion.',
        'Essential, non-deferrable utility services ensuring regular neighborhood footfall.',
      ],
      weaknesses: [
        'Revenue strictly constrained by billable technician hours and skilled manual throughput.',
        'High dependency on sourcing quality electronic spares and replacement hardware from distant cities.',
        'Upfront investment in specialized diagnostic testing instruments and tooling rigs.',
        'Seasonal slowdown during intense monsoon farm work periods.',
      ],
      opportunities: [
        'Solar rooftop and agricultural solar pump servicing, maintenance, and inverter repairs.',
        'Digital Seva Kendra (CSC) integration for pan-card, Aadhaar e-KYC, and land record printouts.',
        'Annual Maintenance Contracts (AMC) with local schools, clinics, and poultry farms for power backup.',
        'Two-wheeler EV battery swapping and repair hub on connecting taluka highway junctions.',
      ],
      threats: [
        'Rapid obsolescence of repair equipment as consumer electronics and vehicle designs modernize.',
        'Local informal mechanics charging rock-bottom prices with substandard salvage spares.',
        'High-voltage surges causing damage to workshop test benches during summer thunderstorms.',
        'Customer reluctance to pay fair professional diagnostic inspection charges.',
      ],
      competitorDensityDesc:
        'Within 5 km, 2 roadside puncture/grease mechanics operate. None offer specialized solar inverter diagnostics, multi-brand digital scanning, or certified CSC e-governance services.',
      pricingBenchmarks: [
        { label: 'Basic Two-Wheeler General Service', range: '₹250 – ₹450 / job' },
        { label: 'Solar Inverter / Pump PCB Repair', range: '₹450 – ₹1,200 / job' },
        { label: 'Smartphone Screen / Battery Repair', range: '₹350 – ₹850 + parts' },
        { label: 'Digital Seva / E-KYC Document Service', range: '₹25 – ₹100 / service' },
      ],
      valueAdditionAdvice:
        'Offer an annual farm equipment preventive maintenance pass (₹1,500/yr for 3 checks) to lock in advance recurring revenue, and pair hardware repairs with CSC digital printout counters.',
      operationalCostAdvice:
        'Establish direct wholesale courier accounts with electronic spare distributors in Ahmedabad/Vadodara to eliminate intermediary taluka markups on replacement boards and batteries.',
      subsidyConvergence:
        'Eligible for PM-Surya Ghar vendor empannelment, PM MUDRA Kishore loan, and State SCA Term Loan (8% p.a.).',
    },
    hi: {
      id: 'Services',
      label: 'ग्रामीण डिजिटल एवं तकनीकी मरम्मत सेवा',
      strengths: [
        'सामग्री इन्वेंट्री में बहुत कम पूंजी फंसती है, शुद्ध सेवा मार्जिन 60%+ होता है।',
        'गाँव-गाँव में बाइक, स्मार्टफोन, सोलर लाइट और सबमर्सिबल पंप की बढ़ती संख्या।',
        'काम पूरा होते ही तुरंत नकद भुगतान।',
        'स्थानीय स्तर पर आवश्यक दैनिक तकनीकी सेवा, जिससे नियमित ग्राहक आते हैं।',
      ],
      weaknesses: [
        'दैनिक आमदनी व्यक्तिगत कार्य घंटों और मैकेनिक की कुशलता पर निर्भर।',
        'इलेक्ट्रॉनिक स्पेयर पार्ट्स के लिए नजदीकी शहर के थोक बाजार पर निर्भरता।',
        'परीक्षण उपकरण और आधुनिक टूल्स खरीदने में आरंभिक पूंजी लगना।',
        'बरसात के समय खेतों में व्यस्तता के कारण कभी-कभार काम में मंदी।',
      ],
      opportunities: [
        'सोलर वाटर पंप और रूफटॉप सोलर सिस्टम की मरम्मत एवं वार्षिक देखरेख (AMC)।',
        'कॉमन सर्विस सेंटर (CSC) खोलकर आधार, पैन कार्ड, खतौनी और ऑनलाइन फॉर्म सेवा।',
        'गाँव के स्कूलों, पोल्ट्री फार्म और अस्पतालों के साथ इनवर्टर मेंटेनेंस अनुबंध।',
        'इलेक्ट्रिक टू-व्हीलर (EV) मरम्मत एवं बैटरी चार्जिंग हब स्थापित करना।',
      ],
      threats: [
        'तकनीक बदलने से पुराने टूल्स और ज्ञान का पुराना पड़ जाना।',
        'अकुशल मैकेनिकों द्वारा नकली पार्ट्स लगाकर सस्ते में काम करने की होड़।',
        'बिजली के तेज झटकों से वर्कशॉप के उपकरणों के जलने का खतरा।',
        'ग्राहकों द्वारा जांच शुल्क (विजिट चार्ज) देने में आनाकानी।',
      ],
      competitorDensityDesc:
        '5 किमी क्षेत्र में 2 सामान्य गैरेज हैं, परंतु कोई भी सोलर इनवर्टर रिपेयरिंग, डिजिटल मोबाइल रिपेयरिंग या सीएससी ऑनलाइन सेवाएं एक छत के नीचे नहीं देता।',
      pricingBenchmarks: [
        { label: 'दोपहिया वाहन सामान्य सर्विस', range: '₹250 – ₹450 / वाहन' },
        { label: 'सोलर इनवर्टर / सबमर्सिबल रिपेयर', range: '₹450 – ₹1,200 / काम' },
        { label: 'स्मार्टफोन स्क्रीन / बोर्ड रिपेयर', range: '₹350 – ₹850 + पार्ट्स' },
        { label: 'सीएससी ऑनलाइन दस्तावेज सेवा', range: '₹25 – ₹100 / फॉर्म' },
      ],
      valueAdditionAdvice:
        'सिर्फ मरम्मत पर निर्भर न रहें। किसानों के लिए ₹1,500/वर्ष का सबमर्सिबल और इनवर्टर मेंटेनेंस कार्ड बनाएं जिससे अग्रिम सालाना आय निश्चित हो सके।',
      operationalCostAdvice:
        'स्पेयर पार्ट्स सीधे शहर के थोक डीलर से मंगाएं ताकि 30% लागत बचे। वर्कशॉप में अर्थिंग और सर्ज प्रोटेक्टर लगाएं।',
      subsidyConvergence:
        'पीएम सूर्य घर योजना, सीएससी कियोस्क ग्रांट और राज्य SCA 8% टर्म लोन से सहायता प्राप्त करें।',
    },
    gu: {
      id: 'Services',
      label: 'ગ્રામ્ય ડિજિટલ અને રિપેરિંગ સેવાઓ',
      strengths: [
        'કાચા માલનો સંગ્રહ ન હોવાથી સર્વિસમાં ૬૦%+ ચોખ્ખો નફો.',
        'ગામડાઓમાં બાઇક, સ્માર્ટફોન, સોલાર પેનલ અને મોટર પંપની સંખ્યામાં વધારો.',
        'કામ પૂરું થતાં જ રોકડ આવક.',
        'ગામના લોકો માટે અનિવાર્ય સેવા હોવાથી સતત કામ.',
      ],
      weaknesses: [
        'આવક કારીગરની પોતાની મહેનત અને સમય પર મર્યાદિત.',
        'સ્પેરપાર્ટ્સ માટે તાલુકા કે જિલ્લા મથક પર નિર્ભરતા.',
        'આધુનિક સાધનો અને ટૂલકિટ વસાવવા માટે ખર્ચ.',
        'ચોમાસામાં ખેતીકામ દરમિયાન ગ્રાહકોની અવરજવરમાં ઘટાડો.',
      ],
      opportunities: [
        'સોલાર પંપ અને ઇન્વર્ટરનું વાર્ષિક મેન્ટેનન્સ (AMC).',
        'ડિજિટલ સેવા કેન્દ્ર (CSC) શરૂ કરી સરકારી યોજનાઓના ફોર્મ ભરવા.',
        'ઇલેક્ટ્રિક વાહનો (EV) ના રિપેરિંગ અને બેટરી ચાર્જિંગ હબ.',
        'સ્થાનિક ડેરી અને હોસ્પિટલોના જનરેટર/ઇન્વર્ટર કોન્ટ્રાક્ટ.',
      ],
      threats: [
        'નવી ટેક્નોલોજીના કારણે ટૂલ્સ બદલવાની જરૂરિયાત.',
        'બિનઅનુભવી કારીગરો દ્વારા ડુપ્લીકેટ પાર્ટ્સ નાખી સસ્તી હરીફાઈ.',
        'વીજળીના વોલ્ટેજ વધઘટથી વર્કશોપ મશીનરી બળી જવાનું જોખમ.',
        'સર્વિસ ચાર્જ ચૂકવવામાં ગ્રાહકોની આનાકાની.',
      ],
      competitorDensityDesc:
        '૫ કિમીમાં ૨ સામાન્ય પંચરવાળા કે ગેરેજ છે, પરંતુ સોલાર રિપેરિંગ અને ડિજિટલ સેવાઓ આપતું એકપણ સેન્ટર નથી.',
      pricingBenchmarks: [
        { label: 'બાઇક સામાન્ય સર્વિસ', range: '₹૨૫૦ – ₹૪૫૦ / સર્વિસ' },
        { label: 'સોલાર ઇન્વર્ટર / મોટર રિપેર', range: '₹૪૫૦ – ₹૧,૨૦૦ / જોબ' },
        { label: 'મોબાઇલ ડિસ્પ્લે / પાર્ટ્સ રિપેર', range: '₹૩૫૦ – ₹૮૫૦ + પાર્ટ્સ' },
        { label: 'ઓનલાઇન અરજી / પ્રિન્ટ આઉટ', range: '₹૨૫ – ₹૧૦૦ / સેવા' },
      ],
      valueAdditionAdvice:
        'ખેડૂતો માટે વાર્ષિક મોટર-ઇન્વર્ટર ચેકઅપ કાર્ડ આપો જેથી એડવાન્સ આવક નક્કી થાય, સાથે CSC સેન્ટર ચલાવો.',
      operationalCostAdvice:
        'અમદાવાદ/વડોદરાથી સીધા જથ્થાબંધ સ્પેરપાર્ટ્સ લાવો જેથી ૩૦% બચત થાય. શોપમાં અર્થિંગ વ્યવસ્થિત કરો.',
      subsidyConvergence:
        'પીએમ સૂર્ય ઘર ટેકનિશિયન સહાય અને SCA ૮% ટર્મ લોન સાથે લાભ લો.',
    },
  },

  Manufacturing: {
    en: {
      id: 'Manufacturing',
      label: 'Small Scale Fabrication & Carpentry',
      strengths: [
        'Continuous construction demand for iron window grills, farm boundary gates, and steel sheds.',
        'High per-project revenue ticket sizes (ranging from ₹8,000 to ₹65,000 per installation).',
        'Material costs covered directly via customer advance deposits (50% upfront).',
        'Multi-sector rural demand spanning agriculture, home construction, and poultry shelters.',
      ],
      weaknesses: [
        'Dependence on heavy 3-phase commercial electrical supply and welding safety measures.',
        'Workplace hazards requiring protective gear, eye shields, and cutting tools maintenance.',
        'Raw metal (MS pipes, angle iron, roofing sheets) wholesale price fluctuations.',
        'Physical fatigue limiting output capacity unless skilled welders are hired.',
      ],
      opportunities: [
        'Fabricating custom agricultural tractor trailers, harrow blades, and cattle feeding troughs.',
        'Supplying prefabricated modular iron sheds for rural poultry and goat farming sheds.',
        'Decorative gate and designer metal railing fabrication for modern rural pucca houses.',
        'Government rural housing (PMAY) window frame and door shutter supply sub-contracts.',
      ],
      threats: [
        'Sudden spikes in steel and iron raw material wholesale rates eroding fixed-quote margins.',
        'Unscheduled rural power load-shedding during peak afternoon working hours.',
        'Customer delays in paying final installation balances upon site completion.',
        'Competition from urban mass-manufactured lightweight thin-gauge iron products.',
      ],
      competitorDensityDesc:
        'Within 7 km, 2 small welding shops handle basic gate repairs. Neither specializes in modular livestock farm sheds or heavy agricultural trailers, opening a major high-ticket segment.',
      pricingBenchmarks: [
        { label: 'MS Window Grill / Railing Fabrication', range: '₹85 – ₹130 / kg' },
        { label: 'Farm Entrance Heavy Iron Gate', range: '₹95 – ₹145 / kg' },
        { label: 'Pre-engineered Farm Shed Structure', range: '₹180 – ₹260 / sq. ft.' },
        { label: 'Agricultural Trailer Custom Job', range: '₹45,000 – ₹95,000 / unit' },
      ],
      valueAdditionAdvice:
        'Move from simple window grill repairs to building complete turnkey steel sheds for poultry and goat farms (charged per square foot at ₹220/sq ft). This generates 5x higher project value.',
      operationalCostAdvice:
        'Never start a custom metal fabrication project without a non-refundable 50% cash advance to purchase MS pipes and welding rods. Invest in an inverter-based energy-efficient welding set to cut power bills by 25%.',
      subsidyConvergence:
        'Eligible for PMEGP 25-35% capital subsidy for manufacturing units, stackable with State SCA Term Loan (8% p.a., 7-year tenure).',
    },
    hi: {
      id: 'Manufacturing',
      label: 'लघु उद्योग वेल्डिंग एवं फैब्रिकेशन',
      strengths: [
        'मकान निर्माण और खेतों में गेट, ग्रिल और शेड की निरंतर मांग।',
        'प्रत्येक कार्य का बड़ा वित्तीय आकार (₹8,000 से ₹65,000 प्रति ऑर्डर)।',
        'ग्राहक से 50% अग्रिम (एडवांस) मिलने से कच्चे माल का पैसा नहीं फंसता।',
        'कृषि, आवासीय मकान और पशुपालन शेड में बहुआयामी मांग।',
      ],
      weaknesses: [
        '3-फेज भारी बिजली आपूर्ति और सुरक्षा उपकरणों की सख्त आवश्यकता।',
        'वेल्डिंग, ग्राइंडिंग में आंखों और शरीर की सुरक्षा का जोखिम।',
        'लोहे और स्टील के पाइपों की कीमतों में लगातार उतार-चढ़ाव।',
        'अकेले काम करने पर सीमित क्षमता, कुशल वेल्डर कारीगर की आवश्यकता।',
      ],
      opportunities: [
        'ट्रैक्टर ट्रॉली, कल्टीवेटर और चारा चरनी का निर्माण कर किसानों को बेचना।',
        'पोल्ट्री फार्म और बकरी पालन के लिए तैयार प्री-फैब्रिकेटेड लोहे के शेड बनाना।',
        'पक्के मकानों के लिए डिजाइनर फैंसी गेट और बालकनी ग्रिल।',
        'प्रधानमंत्री आवास योजना (PMAY) के मकानों के लिए लोहे के दरवाजे-खिड़कियां सप्लाई करना।',
      ],
      threats: [
        'लोहे के दामों में अचानक उछाल आने से तय किए गए भाव में नुकसान होना।',
        'दोपहर में बिजली कटौती होने से काम रुकना।',
        'गेट लगाने के बाद ग्राहक द्वारा अंतिम भुगतान में विलंब करना।',
        'शहरी फैक्ट्रियों से आने वाले हल्के और सस्ते सामान की प्रतिस्पर्धा।',
      ],
      competitorDensityDesc:
        '7 किमी में 2 सामान्य वेल्डिंग वाले हैं जो केवल मरम्मत करते हैं। आधुनिक फार्म शेड या ट्रैक्टर ट्रॉली बनाने वाली कोई समर्पित इकाई नहीं है।',
      pricingBenchmarks: [
        { label: 'खिड़की ग्रिल / रेलिंग फैब्रिकेशन', range: '₹85 – ₹130 / किग्रा' },
        { label: 'खेत का मुख्य लोहे का गेट', range: '₹95 – ₹145 / किग्रा' },
        { label: 'फार्म शेड निर्माण', range: '₹180 – ₹260 / वर्ग फीट' },
        { label: 'ट्रैक्टर ट्रॉली निर्माण', range: '₹45,000 – ₹95,000 / इकाई' },
      ],
      valueAdditionAdvice:
        'केवल ग्रिल मरम्मत न करें। पोल्ट्री और बकरी फार्म के लिए पूरे शेड का ठेका लें (₹220/वर्ग फीट)। इसमें प्रति प्रोजेक्ट 5 गुना अधिक शुद्ध बचत होती है।',
      operationalCostAdvice:
        'कच्चा माल खरीदने के लिए हमेशा 50% एडवांस लें। बिजली बिल घटाने के लिए इनवर्टर आधारित आधुनिक वेल्डिंग मशीन का उपयोग करें।',
      subsidyConvergence:
        'PMEGP योजना के तहत 25-35% विनिर्माण सब्सिडी और राज्य SCA 8% टर्म लोन योजना का दोहरा लाभ उठाएं।',
    },
    gu: {
      id: 'Manufacturing',
      label: 'લઘુ ઉદ્યોગ ફેબ્રિકેશન અને વેલ્ડિંગ',
      strengths: [
        'મકાન બાંધકામ અને ખેતરોના ઝાંપા, ગ્રીલ અને શેડની સતત માંગ.',
        'દરેક જોબ વર્કનું મોટું બિલ (₹૮,૦૦૦ થી ₹૬૫,૦૦૦ સુધી).',
        'ગ્રાહક પાસેથી ૫૦% એડવાન્સ મળવાથી માલ લાવવામાં મુશ્કેલી નહીં.',
        'ખેતી, રહેણાંક અને ડેરી શેડમાં બહુવિધ ઉપયોગીતા.',
      ],
      weaknesses: [
        'હેવી ૩-ફેઝ વીજળી જોડાણની જરૂરિયાત.',
        'વેલ્ડિંગ અને કટિંગ કામમાં શારીરિક સલામતીનું જોખમ.',
        'લોખંડના પાઇપ અને પતરાના ભાવમાં થતી વધઘટ.',
        'કુશળ વેલ્ડર કારીગરોની ઉપલબ્ધતાનો પ્રશ્ન.',
      ],
      opportunities: [
        'ટ્રેક્ટર ટ્રોલી, દાંતી અને પશુ ગમાણનું વ્યાવસાયિક ઉત્પાદન.',
        'પોલ્ટ્રી ફાર્મ અને ડેરી ફાર્મ માટે તૈયાર લોખંડના શેડ બનાવવાનો કોન્ટ્રાક્ટ.',
        'નવા પાકા મકાનો માટે ફેન્સી ડિઝાઇનર મેઇન ગેટ અને રેલિંગ.',
        'પ્રધાનમંત્રી આવાસ યોજના હેઠળ બારી-બારણાના સપ્લાયના ઓર્ડર.',
      ],
      threats: [
        'લોખંડના ભાવમાં અચાનક વધારો થતાં નફામાં ઘટાડો.',
        'બપોરે વીજળી જવાથી ઉત્પાદનમાં વિલંબ.',
        'સાઇટ પર ઇન્સ્ટોલેશન પછી બાકી પેમેન્ટ આવવામાં વિલંબ.',
        'શહેરી હલકા પતરાવાળા માલની સસ્તી હરીફાઈ.',
      ],
      competitorDensityDesc:
        '૭ કિમીમાં ૨ નાના વેલ્ડિંગ વાળા છે જે માત્ર રિપેરિંગ કરે છે. મોટો ફાર્મ શેડ કે ટ્રોલી બનાવનાર કોઈ આધુનિક એકમ નથી.',
      pricingBenchmarks: [
        { label: 'બારી ગ્રીલ / રેલિંગ ફેબ્રિકેશન', range: '₹૮૫ – ₹૧૩૦ / કિગ્રા' },
        { label: 'ખેતરનો મેઇન લોખંડનો ઝાંપો', range: '₹૯૫ – ₹૧૪૫ / કિગ્રા' },
        { label: 'ફાર્મ શેડ સ્ટ્રક્ચર નિર્માણ', range: '₹૧૮૦ – ₹૨૬૦ / ચોરસ ફૂટ' },
        { label: 'ટ્રેક્ટર ટ્રોલી જોબવર્ક', range: '₹૪૫,૦૦૦ – ₹૯૫,૦૦૦ / યુનિટ' },
      ],
      valueAdditionAdvice:
        'નાના કામો કરવાને બદલે પશુપાલન અને મરઘા પાલનના શેડનો ચોરસ ફૂટના ભાવે (₹૨૨૦/ફૂટ) કોન્ટ્રાક્ટ લો. તેમાં ૫ ગણો વધુ નફો મળે છે.',
      operationalCostAdvice:
        'કાચો માલ ખરીદવા ગ્રાહક પાસેથી ૫૦% એડવાન્સ અવશ્ય લો. વીજળી બિલ ઘટાડવા ઇન્વર્ટર વેલ્ડિંગ મશીન વાપરો.',
      subsidyConvergence:
        'PMEGP હેઠળ ૨૫-૩૫% કેપિટલ સબસિડી અને SCA ૮% ટર્મ લોન યોજના સાથે સહાય મેળવો.',
    },
  },
}

export function getTradeProfile(category: string, lang: string = 'en'): TradeProfile {
  const normalizedLang: 'en' | 'hi' | 'gu' = lang === 'hi' ? 'hi' : lang === 'gu' ? 'gu' : 'en'
  
  // Fuzzy match category
  let catKey = 'Dairy'
  const c = (category || '').toLowerCase()
  if (c.includes('food') || c.includes('flour') || c.includes('spice') || c.includes('processing')) {
    catKey = 'Food Processing'
  } else if (c.includes('retail') || c.includes('kirana') || c.includes('shop') || c.includes('provision')) {
    catKey = 'Retail'
  } else if (c.includes('textile') || c.includes('handloom') || c.includes('weav') || c.includes('tailor')) {
    catKey = 'Textile'
  } else if (c.includes('agri') || c.includes('seed') || c.includes('fertili') || c.includes('farm')) {
    catKey = 'Agriculture'
  } else if (c.includes('handicraft') || c.includes('pottery') || c.includes('wood') || c.includes('artisan')) {
    catKey = 'Handicrafts'
  } else if (c.includes('service') || c.includes('repair') || c.includes('solar') || c.includes('digital')) {
    catKey = 'Services'
  } else if (c.includes('manufactur') || c.includes('fabricat') || c.includes('weld') || c.includes('metal')) {
    catKey = 'Manufacturing'
  } else {
    catKey = 'Dairy'
  }

  const profiles = TRADE_PROFILES[catKey] || TRADE_PROFILES['Dairy']
  return profiles[normalizedLang] || profiles['en']
}
