// =====================================================
// AI SERVICE — GramSaarthi AI
// Gemini API with full mock fallback
// =====================================================

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null

export interface BusinessInput {
  state: string
  district: string
  block?: string
  village?: string
  category: string
  marginCapital: number
  projectCost: number
  loanAmount: number
  scheme: string
  experience: string
  language?: string
}

export interface FeasibilityReport {
  feasibilityScore: number
  marketScore: number
  financialScore: number
  riskScore: number
  executiveSummary: string
  marketReach: string
  opportunities: string
  swotStrengths: string[]
  swotWeaknesses: string[]
  swotOpportunities: string[]
  swotThreats: string[]
  localThreats: string[]
  competitorAnalysis: string
  pricingStrategy: string
  aiRecommendations: string
}

// =====================================================
// MOCK DATA — used when API unavailable
// =====================================================

const MOCK_DATA: Record<string, Partial<FeasibilityReport>> = {
  Dairy: {
    feasibilityScore: 82,
    marketScore: 85,
    financialScore: 78,
    riskScore: 76,
    executiveSummary: 'The proposed dairy business shows strong feasibility for this location. Gujarat\'s robust cooperative dairy infrastructure provides excellent market linkage. Consistent demand for fresh milk and value-added products, combined with government support schemes, makes this a viable income-generating opportunity with good growth potential.',
    marketReach: 'Within a 10 km radius, the estimated consumer base includes 8,000–12,000 residents across 6–8 villages. Primary distribution channels: doorstep delivery, dairy cooperative collection, and nearby city market access.',
    opportunities: 'Strong opportunity in value-added dairy products (ghee, paneer, curd) commanding 3–5x margins over raw milk. Amul cooperative provides guaranteed offtake. Government Kamdhenu scheme offers additional subsidy support.',
    swotStrengths: ['Strong dairy cooperative infrastructure (Amul)', 'Daily cash flow from milk sales', 'Government cattle purchase subsidy available', 'High local demand year-round', 'Established supply chains'],
    swotWeaknesses: ['Labor intensive — twice daily milking required', 'Perishable product needs immediate sale', 'Dependence on fodder availability', 'Requires basic veterinary knowledge'],
    swotOpportunities: ['Value-added products: Ghee (₹550+/kg), Paneer (₹300+/kg)', 'School milk program government contracts', 'Organic dairy certification premium', 'Urban market proximity for premium sales'],
    swotThreats: ['Seasonal fodder price increases', 'Animal health risks (FMD, mastitis)', 'Milk price drops during peak season', 'Climate change affecting fodder supply'],
    localThreats: ['Fodder availability risk in summer months', 'Dependency on cooperative for primary offtake', 'Nearest veterinary clinic may be 8+ km', 'Transport costs to urban market'],
    competitorAnalysis: 'Estimated 8–12 existing dairy farmers within 10 km radius. Competition level is moderate. Most competitors supply raw milk only — opportunity exists in value-added products. Local market not saturated for ghee and paneer.',
    pricingStrategy: 'Raw milk: ₹42–48/litre. Ghee: ₹550–680/kg. Paneer: ₹280–350/kg. Curd: ₹60–80/500g. Start with raw milk supply to cooperative, then add value-added products by Year 2.',
    aiRecommendations: 'Start with 3–5 quality HF/Jersey crossbred cows. Enroll in Amul cooperative immediately for guaranteed pricing. Invest in basic milk chilling equipment. Explore Kamdhenu scheme subsidy. Plan value-added processing by Year 2 for improved margins. Maintain emergency fund equivalent to 3 months operational cost.',
  },
  Retail: {
    feasibilityScore: 76,
    marketScore: 80,
    financialScore: 72,
    riskScore: 70,
    executiveSummary: 'A kirana/retail shop shows good feasibility for rural and semi-urban locations. Essential goods retail has consistent inelastic demand. Success depends on location, product mix, and credit management.',
    marketReach: 'Estimated 5,000–8,000 residents within 5 km catchment. Primary channels: walk-in customers, home delivery orders, wholesale supply to smaller shops.',
    opportunities: 'ONDC integration for digital orders. Mobile recharge and bill payment as additional revenue. PDS sub-dealership opportunity. Growing FMCG penetration in rural markets.',
    swotStrengths: ['Inelastic demand for essential goods', 'Immediate daily cash flow', 'Supplier credit from distributors', 'Community trust and loyalty'],
    swotWeaknesses: ['Low margins require high volume', 'Extensive inventory management', 'Receivables from credit customers', 'Perishable goods wastage risk'],
    swotOpportunities: ['ONDC integration for digital reach', 'Mobile recharge and bill payment services', 'Home delivery premium in towns', 'Government PDS sub-dealership'],
    swotThreats: ['JioMart / BigBasket expanding to rural areas', 'Supermarket competition in nearby towns', 'FMCG margin pressure', 'Changing buying habits'],
    localThreats: ['Credit customers defaulting on payment', 'Theft and pilferage risk', 'Supply chain disruptions for essential items', 'Competition from new entrants'],
    competitorAnalysis: 'Estimated 3–8 existing kirana shops within 5 km. Competition is moderate to high in denser areas. Differentiate through better product range, home delivery, and digital payments.',
    pricingStrategy: 'FMCG margins: 5–12%. Loose grains/pulses: 8–15%. Beverages: 12–20%. Target overall net margin of 10–15% on turnover.',
    aiRecommendations: 'Focus on high-margin categories initially. Implement basic inventory management. Accept digital payments (UPI) to attract modern customers. Build relationships with 2–3 reliable distributors. Limit credit to trusted customers only. Consider adding mobile recharge for additional income.',
  },
  Textile: {
    feasibilityScore: 74,
    marketScore: 72,
    financialScore: 75,
    riskScore: 68,
    executiveSummary: 'Textile and weaving businesses show moderate to good feasibility, particularly for GI-tagged regional crafts. The national revival of handloom and handcraft creates growing premium markets both domestically and for export.',
    marketReach: 'Local market within 10 km for basic fabric. Premium handloom products reach city markets and online platforms nationally. Export potential through government schemes.',
    opportunities: 'GI-tagged textiles command 3–5x premium. Government exhibitions (Dilli Haat, Shilp Samagam). Online platforms: Amazon Karigar, Flipkart Samarth, GEM portal. NRI and international buyer segment.',
    swotStrengths: ['Cultural heritage value and unique products', 'GI tag premium pricing potential', 'Low recurring material costs post-setup', 'Government exhibition support'],
    swotWeaknesses: ['High skill barrier — months to master', 'Slow production vs. power looms', 'Working capital locked in yarn inventory', 'Limited direct market access'],
    swotOpportunities: ['E-commerce and GEM portal listing', 'Export to EU/US handloom buyers', 'Corporate gifting sector', 'Premium urban boutique market'],
    swotThreats: ['Cheap synthetic fabric imports', 'Power loom competition at lower prices', 'Youth migration from craft skills', 'Fashion trend changes'],
    localThreats: ['Raw material (yarn) price volatility', 'Seasonal demand (festival-driven)', 'Machine-made imitations sold as handmade', 'Skill transmission gap to younger generation'],
    competitorAnalysis: 'Estimated 5–15 similar weavers/textile units within region. Competition is moderate for standard fabrics but lower for premium GI-tagged and specialty products.',
    pricingStrategy: 'Handloom sarees: ₹600–3,000. Fabrics: ₹120–400/metre. Dupattas: ₹200–800. Export quality items 3x premium. Value-added finished products earn 2–3x more than raw fabric.',
    aiRecommendations: 'Focus on value-added finished products (sarees, dress materials) rather than raw fabric. Pursue GI tag registration for your regional craft. List on government-supported e-commerce platforms. Apply for Handloom Weavers Welfare Scheme. Maintain quality consistency through peer group production if possible.',
  },
  Agriculture: {
    feasibilityScore: 71,
    marketScore: 73,
    financialScore: 68,
    riskScore: 64,
    executiveSummary: 'Agri-based businesses offer moderate feasibility with seasonal considerations. Success depends on crop choice, market linkage, storage capacity, and risk management. Value-added processing significantly improves margins and stability.',
    marketReach: 'Agricultural produce reaches local mandis (APMC), state markets, and increasingly direct-to-consumer channels via e-NAM (National Agriculture Market).',
    opportunities: 'e-NAM integration for better price discovery. FPO (Farmer Producer Organization) membership for collective bargaining. PM-KISAN and other government scheme linkages. Cold storage and processing add value.',
    swotStrengths: ['Land asset as collateral', 'Established local supply chains', 'Government support schemes (PM-KISAN, PMFBY)', 'Cultural knowledge of local crops'],
    swotWeaknesses: ['Seasonal income — not year-round', 'Weather and climate dependency', 'APMC market price volatility', 'High post-harvest losses without storage'],
    swotOpportunities: ['e-NAM platform for better prices', 'FPO/cooperative formation', 'Agri-processing for value addition', 'Organic certification premium'],
    swotThreats: ['Monsoon failure and weather risks', 'Pest and disease outbreaks', 'APMC price manipulation risk', 'Rising input costs (seeds, fertilizer)'],
    localThreats: ['Irrigation water availability', 'Cold storage and warehousing access', 'Transport to nearest APMC mandi', 'Seasonal labor availability during peak'],
    competitorAnalysis: 'Agriculture is highly competitive. Differentiation through crop choice (high-value vegetables, spices), organic certification, or FPO membership for collective market access is recommended.',
    pricingStrategy: 'Follow current APMC mandi prices. Premium for organic certified produce (25–40% above market rate). Direct-to-consumer via e-NAM or local market provides 15–20% better realisation vs. middlemen.',
    aiRecommendations: 'Diversify crops to reduce income concentration risk. Enroll in PMFBY crop insurance. Join or form local FPO for collective bargaining power. Invest in basic post-harvest management (storage, grading). Consider high-value cash crops suitable for your region.',
  },
  'Food Processing': {
    feasibilityScore: 79,
    marketScore: 81,
    financialScore: 77,
    riskScore: 73,
    executiveSummary: 'Food processing businesses show strong feasibility as they add value to locally available agricultural produce. India wastes 40% of produce due to poor processing infrastructure — creating strong opportunity for village-level processing units.',
    marketReach: 'Processed food products reach local, regional, and national markets. Online platforms enable direct-to-consumer sales. Institutional buyers (schools, hostels) provide bulk stable orders.',
    opportunities: 'Institutional bulk orders (schools, hostels, canteens). ONDC and Amazon Local Shops listing. Export of traditional Indian foods to diaspora. Private label manufacturing for brands. PMEGP/MUDRA funding support.',
    swotStrengths: ['Low raw material cost from local farmers', 'Traditional recipes as unique selling point', 'SHG group production reduces labor cost', 'FMCG companies seeking local suppliers'],
    swotWeaknesses: ['FSSAI licensing requires time and cost', 'Seasonal raw material availability', 'Packaging investment required', 'Quality consistency challenges initially'],
    swotOpportunities: ['ONDC and e-commerce listing', 'Institutional bulk orders', 'Export potential for traditional foods', 'Private label manufacturing'],
    swotThreats: ['Branded processed food competition', 'Raw material price spikes', 'Food safety regulatory compliance', 'Consumer shift to packaged branded foods'],
    localThreats: ['FSSAI compliance and inspection risk', 'Consistent packaging material supply', 'Electricity supply reliability for processing', 'Cold chain for perishable processed goods'],
    competitorAnalysis: 'Limited organized competition at village level. Most competition from branded national players in supermarkets. Local, fresh, traditionally-made products have competitive advantage in local and regional markets.',
    pricingStrategy: 'Papad: ₹120–200/kg. Pickles: ₹180–350/kg. Masala/spices: ₹200–500/kg. Flour milling: ₹2–4/kg service charge. Value-add ratio: 200–400% on raw material costs.',
    aiRecommendations: 'Start with FSSAI Basic registration (mandatory). Focus on 2–3 products initially rather than a wide range. Build packaging that reflects quality. Target local institutions (schools, hotels) for bulk orders first. Use SHG group structure for shared production cost. Plan ONDC listing in first 6 months.',
  },
}

function getMockData(category: string, input: BusinessInput): FeasibilityReport {
  const base = MOCK_DATA[category] || MOCK_DATA['Dairy']
  const location = input.village ? `${input.village}, ${input.district}` : `${input.district}, ${input.state}`
  
  return {
    feasibilityScore: base.feasibilityScore || 75,
    marketScore: base.marketScore || 75,
    financialScore: base.financialScore || 75,
    riskScore: base.riskScore || 70,
    executiveSummary: base.executiveSummary?.replace('this location', location) || 
      `The proposed ${category} business in ${location} shows moderate to good feasibility based on available data. Further local market research is recommended before making investment decisions.`,
    marketReach: base.marketReach || `Within a 10 km radius of ${location}, the estimated consumer base ranges from 5,000–15,000 residents. Distribution channels vary by product type.`,
    opportunities: base.opportunities || `Market opportunity exists for ${category} businesses in this region. Consider local demand-supply gaps and emerging digital market channels.`,
    swotStrengths: base.swotStrengths || ['Local market knowledge', 'Lower operating costs vs. urban', 'Government scheme support'],
    swotWeaknesses: base.swotWeaknesses || ['Limited initial capital', 'Access to formal markets', 'Working capital management'],
    swotOpportunities: base.swotOpportunities || ['Growing rural purchasing power', 'Government digital market initiatives', 'Local supply-demand gap'],
    swotThreats: base.swotThreats || ['Competition from established players', 'Raw material price volatility', 'Economic downturns'],
    localThreats: base.localThreats || ['Working capital management', 'Seasonal demand fluctuations', 'Infrastructure constraints'],
    competitorAnalysis: base.competitorAnalysis || `Estimated 5–15 similar businesses within 10 km. Competition level is moderate. Differentiation through quality, service, and pricing is recommended.`,
    pricingStrategy: base.pricingStrategy || `Research current local market prices carefully. Target a 20–30% net margin. Start competitive to build customer base, then adjust as reputation grows.`,
    aiRecommendations: base.aiRecommendations || `Start conservatively and validate demand before scaling. Maintain emergency working capital reserve. Seek local mentorship from successful similar businesses. Connect with local industry association or cooperative for market guidance.`,
  }
}

// =====================================================
// AI PROMPTS
// =====================================================

function buildAnalysisPrompt(input: BusinessInput, language: string = 'en'): string {
  const langInstruction = language === 'hi' 
    ? 'Respond primarily in Hindi but keep financial figures in English/numbers.'
    : language === 'gu'
    ? 'Respond primarily in Gujarati but keep financial figures in English/numbers.'
    : 'Respond in English.'

  return `You are GramSaarthi AI, an expert business advisor for rural micro-entrepreneurs in India.

${langInstruction}

Analyze this business proposal and provide a detailed feasibility report.

BUSINESS DETAILS:
- Location: ${input.village ? input.village + ', ' : ''}${input.block ? input.block + ', ' : ''}${input.district}, ${input.state}
- Business Category: ${input.category}
- Entrepreneur Experience: ${input.experience}
- Available Margin Capital: ₹${input.marginCapital.toLocaleString('en-IN')}
- Calculated Project Cost: ₹${input.projectCost.toLocaleString('en-IN')}
- Loan Required: ₹${input.loanAmount.toLocaleString('en-IN')}
- Applicable Scheme: ${input.scheme === 'micro' ? 'Micro Finance Scheme (6.5% p.a., 3 years)' : 'Term Loan Scheme (8% p.a., 7 years)'}

Provide your analysis as a JSON object with EXACTLY these fields:
{
  "feasibilityScore": <integer 0-100>,
  "marketScore": <integer 0-100>,
  "financialScore": <integer 0-100>,
  "riskScore": <integer 0-100>,
  "executiveSummary": "<2-3 paragraph executive summary>",
  "marketReach": "<describe consumer base within 5-10km, distribution channels>",
  "opportunities": "<unserved niches, demand opportunities, growth potential>",
  "swotStrengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "swotWeaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "swotOpportunities": ["<opportunity 1>", "<opportunity 2>", "<opportunity 3>", "<opportunity 4>"],
  "swotThreats": ["<threat 1>", "<threat 2>", "<threat 3>"],
  "localThreats": ["<local risk 1>", "<local risk 2>", "<local risk 3>"],
  "competitorAnalysis": "<estimated competitors, competition level, competitive positioning>",
  "pricingStrategy": "<recommended pricing with specific ranges in INR>",
  "aiRecommendations": "<5-7 specific actionable recommendations>"
}

IMPORTANT GUIDELINES:
- Be realistic and specific to the location and business type
- Do NOT claim guaranteed success or profits
- Use "indicative" or "estimated" for market data
- Include specific government schemes relevant to this business
- Keep financial analysis grounded in the given margin capital
- Scores should reflect genuine assessment (not all 90+)
- Return ONLY the JSON object, no markdown formatting`
}

// =====================================================
// MAIN AI SERVICE
// =====================================================

export async function generateFeasibilityReport(
  input: BusinessInput
): Promise<FeasibilityReport> {
  // Try Gemini API first
  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const prompt = buildAnalysisPrompt(input, input.language || 'en')
      
      const result = await model.generateContent(prompt)
      const text = result.response.text()
      
      // Parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return {
          feasibilityScore: Math.min(100, Math.max(0, parseInt(parsed.feasibilityScore) || 75)),
          marketScore: Math.min(100, Math.max(0, parseInt(parsed.marketScore) || 75)),
          financialScore: Math.min(100, Math.max(0, parseInt(parsed.financialScore) || 75)),
          riskScore: Math.min(100, Math.max(0, parseInt(parsed.riskScore) || 70)),
          executiveSummary: parsed.executiveSummary || '',
          marketReach: parsed.marketReach || '',
          opportunities: parsed.opportunities || '',
          swotStrengths: Array.isArray(parsed.swotStrengths) ? parsed.swotStrengths : [],
          swotWeaknesses: Array.isArray(parsed.swotWeaknesses) ? parsed.swotWeaknesses : [],
          swotOpportunities: Array.isArray(parsed.swotOpportunities) ? parsed.swotOpportunities : [],
          swotThreats: Array.isArray(parsed.swotThreats) ? parsed.swotThreats : [],
          localThreats: Array.isArray(parsed.localThreats) ? parsed.localThreats : [],
          competitorAnalysis: parsed.competitorAnalysis || '',
          pricingStrategy: parsed.pricingStrategy || '',
          aiRecommendations: parsed.aiRecommendations || '',
        }
      }
    } catch (error) {
      console.log('Gemini API unavailable, using mock data:', error instanceof Error ? error.message : 'Unknown')
    }
  }

  // Fallback to mock data
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate processing
  return getMockData(input.category, input)
}

export async function generateChatResponse(
  userMessage: string,
  businessContext: {
    category?: string
    location?: string
    marginCapital?: number
    scheme?: string
    feasibilityScore?: number
  },
  conversationHistory: Array<{ role: string; content: string }>,
  language: string = 'en'
): Promise<string> {
  const langInstruction = language === 'hi' 
    ? 'Respond in Hindi. Use simple, clear Hindi that rural entrepreneurs can understand.'
    : language === 'gu'
    ? 'Respond in Gujarati. Use simple Gujarati.'
    : 'Respond in English. Use simple, clear language.'

  const systemContext = businessContext.category
    ? `You are analyzing a ${businessContext.category} business in ${businessContext.location || 'India'} with ₹${businessContext.marginCapital?.toLocaleString('en-IN') || 'N/A'} margin capital.`
    : 'No specific business analysis loaded.'

  if (genAI && process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      
      const prompt = `You are GramSaarthi AI, a friendly business advisor for rural micro-entrepreneurs in India.
${langInstruction}

CONTEXT: ${systemContext}
${businessContext.scheme ? `Applicable scheme: ${businessContext.scheme}` : ''}
${businessContext.feasibilityScore ? `Feasibility score: ${businessContext.feasibilityScore}/100` : ''}

CONVERSATION:
${conversationHistory.slice(-6).map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

USER: ${userMessage}

Provide a helpful, concise response. Be specific and practical. Use simple language. If relevant, mention specific government schemes. Keep response under 200 words.`

      const result = await model.generateContent(prompt)
      return result.response.text()
    } catch (error) {
      console.log('Chat API unavailable, using mock response')
    }
  }

  // Mock chat responses
  return generateMockChatResponse(userMessage, businessContext, language)
}

function generateMockChatResponse(
  message: string,
  context: { category?: string; location?: string; marginCapital?: number; scheme?: string },
  language: string
): string {
  const lower = message.toLowerCase()
  
  if (lower.includes('loan') || lower.includes('scheme') || lower.includes('borrow')) {
    if (language === 'hi') {
      return `आपकी पूंजी के आधार पर:\n\n• **मार्जिन कैपिटल** (10%): ₹${context.marginCapital?.toLocaleString('en-IN') || 'N/A'}\n• **कुल प्रोजेक्ट कोस्ट**: ₹${((context.marginCapital || 0) / 0.10).toLocaleString('en-IN')}\n• **लोन राशि** (90%): ₹${((context.marginCapital || 0) * 9).toLocaleString('en-IN')}\n• **स्कीम**: ${context.scheme === 'micro' ? 'माइक्रो फाइनेंस (6.5% p.a., 3 साल)' : 'टर्म लोन (8% p.a., 7 साल)'}\n\nकृपया आधिकारिक पुष्टि के लिए नजदीकी बैंक या SCA से संपर्क करें।`
    }
    return `Based on your margin capital of ₹${context.marginCapital?.toLocaleString('en-IN') || 'N/A'}:\n\n• **Your Contribution (10%)**: ₹${context.marginCapital?.toLocaleString('en-IN')}\n• **Total Project Cost**: ₹${((context.marginCapital || 0) / 0.10).toLocaleString('en-IN')}\n• **Loan Eligibility (90%)**: ₹${((context.marginCapital || 0) * 9).toLocaleString('en-IN')}\n• **Applicable Scheme**: ${context.scheme === 'micro' ? 'Micro Finance Scheme (6.5% p.a., 3 years)' : 'Term Loan Scheme (8% p.a., 7 years)'}\n\n*This is an indicative estimate. Please verify with your nearest SCA or bank for official eligibility.*`
  }

  if (lower.includes('dairy') || lower.includes('milk') || lower.includes('cow')) {
    return `**Dairy Farming** is one of the most viable options for rural entrepreneurs in India.\n\n✅ **Why it works:**\n• Daily income from milk sales\n• Amul/cooperative guaranteed offtake\n• Government subsidies (Kamdhenu scheme)\n• Value-added products (Ghee ₹550+/kg, Paneer ₹300+/kg)\n\n📋 **Next steps:**\n1. Contact local Amul cooperative for enrollment\n2. Apply for Kamdhenu scheme\n3. Start with 3–5 HF/Jersey crossbred cows\n\n*AI-generated estimate. Verify with local agricultural extension officer.*`
  }

  if (lower.includes('risk') || lower.includes('problem') || lower.includes('challenge')) {
    return `**Key risks to consider for ${context.category || 'your business'}:**\n\n⚠️ **Market Risks:**\n• Seasonal demand fluctuations\n• Price volatility of inputs\n• Competition from established players\n\n⚠️ **Financial Risks:**\n• Working capital management during moratorium period\n• Receivables from credit customers\n• Unexpected operational expenses\n\n✅ **Risk Mitigation:**\n• Maintain 3-month emergency working capital buffer\n• Diversify customer base early\n• Enroll in relevant government insurance schemes\n\n*AI-generated estimate based on typical business patterns.*`
  }

  if (lower.includes('price') || lower.includes('sell') || lower.includes('market')) {
    return `**Pricing strategy for ${context.category || 'your business'}:**\n\n📊 **Approach:**\n• Research current local market prices first\n• Target 20–30% net margin on turnover\n• Start competitive to build customer base\n• Gradually increase as reputation grows\n\n💡 **Tips:**\n• Offer slightly better quality to justify slightly higher price\n• Bundled/combo offers to increase average transaction value\n• Seasonal promotions during peak demand\n\n*These are indicative estimates. Actual pricing should be based on your local market research.*`
  }

  return `Thank you for your question about ${context.category || 'your business'} in ${context.location || 'your area'}.\n\nI'm GramSaarthi AI, your business advisor. Based on your business profile:\n\n• **Business**: ${context.category || 'Not specified'}\n• **Location**: ${context.location || 'Not specified'}\n• **Capital**: ₹${context.marginCapital?.toLocaleString('en-IN') || 'Not specified'}\n\nFor specific guidance, I recommend:\n1. Using our **Business Wizard** to complete your full analysis\n2. Checking the **Financial Calculator** for exact loan amounts\n3. Reviewing the **Market Map** for local competitor insights\n\n*This is an AI-generated advisory. Always verify with official sources before making financial decisions.*`
}
