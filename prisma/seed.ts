import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create loan schemes
  await prisma.loanScheme.upsert({
    where: { code: 'micro' },
    update: {},
    create: {
      name: 'Micro Finance Scheme',
      code: 'micro',
      maxProjectCost: 140000,
      minProjectCost: 0,
      maxLoanAmount: 125000,
      fundingPercent: 90,
      interestRate: 6.5,
      tenureYears: 3,
      moratoriumMonths: 3,
      description: 'For small enterprises with project cost up to ₹1.40 lakh. Provides concessional credit at 6.5% per annum to be repaid over 3 years including a 3-month moratorium period.',
    },
  })

  await prisma.loanScheme.upsert({
    where: { code: 'term' },
    update: {},
    create: {
      name: 'Term Loan Scheme',
      code: 'term',
      maxProjectCost: 5000000,
      minProjectCost: 140001,
      maxLoanAmount: 4500000,
      fundingPercent: 90,
      interestRate: 8.0,
      tenureYears: 7,
      moratoriumMonths: 6,
      description: 'For larger enterprises with project cost between ₹1.40 lakh and ₹50 lakh. Provides up to 90% funding at 8% per annum to be repaid over 7 years including a 6-month moratorium period.',
    },
  })

  // Create demo user
  const hashedPassword = await bcrypt.hash('demo123', 10)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@gramsaarthi.ai' },
    update: {},
    create: {
      email: 'demo@gramsaarthi.ai',
      name: 'Rajesh Patel',
      password: hashedPassword,
      phone: '+91 98765 43210',
      state: 'Gujarat',
      district: 'Vadodara',
    },
  })

  // Create demo analysis
  const existingAnalysis = await prisma.businessAnalysis.findFirst({
    where: { userId: demoUser.id, isDemo: true }
  })

  if (!existingAnalysis) {
    const demoAnalysis = await prisma.businessAnalysis.create({
      data: {
        userId: demoUser.id,
        state: 'Gujarat',
        district: 'Vadodara',
        block: 'Savli',
        village: 'Tarsali',
        category: 'Dairy',
        description: 'Establishing a small dairy unit with 5 cows to supply fresh milk and ghee to local market.',
        experience: 'some',
        marginCapital: 100000,
        projectCost: 1000000,
        loanAmount: 900000,
        scheme: 'term',
        interestRate: 8.0,
        tenureYears: 7,
        moratoriumMonths: 6,
        emiMonthly: 14025,
        feasibilityScore: 82,
        marketScore: 85,
        financialScore: 78,
        riskScore: 76,
        executiveSummary: 'The proposed dairy business in Savli block of Vadodara district shows strong feasibility. Gujarat\'s robust cooperative dairy infrastructure, led by Amul, provides excellent market linkage. The region has consistent demand for fresh milk and value-added products. With ₹10 lakh project cost and 82/100 feasibility score, this business presents a viable income-generating opportunity.',
        marketReach: 'Within a 10 km radius of Tarsali village, the estimated consumer base includes approximately 8,000-12,000 residents across 6-8 villages and the Savli town area. Primary distribution channels include direct doorstep delivery, local dairy cooperative collection, and nearby Vadodara city market access.',
        opportunities: 'Strong opportunity exists in value-added dairy products (ghee, paneer, curd) which command 3-5x margins over raw milk. The Amul cooperative network provides guaranteed offtake. Growing urban demand from Vadodara city (25 km) offers premium pricing opportunities. Government Kamdhenu scheme provides additional subsidy support.',
        swotStrengths: JSON.stringify(['Gujarat\'s strong dairy cooperative infrastructure (Amul)', 'Daily cash flow from milk sales', 'Government cattle purchase subsidy available', 'High local demand year-round', 'Existing community trust']),
        swotWeaknesses: JSON.stringify(['Labor intensive — twice daily milking required', 'Perishable product requiring immediate sale', 'Dependence on fodder availability', 'Requires basic veterinary knowledge', 'Initial capital locked in cattle']),
        swotOpportunities: JSON.stringify(['Value-added products: ghee (₹550+/kg), paneer (₹300+/kg)', 'School milk program government contracts', 'Amul/cooperative guaranteed offtake', 'Organic dairy certification premium', 'Vadodara urban market proximity']),
        swotThreats: JSON.stringify(['Seasonal fodder price increases', 'Animal health risks (FMD, mastitis)', 'Competition from established dairy farmers', 'Milk price drops during peak production season', 'Climate change affecting fodder availability']),
        localThreats: JSON.stringify(['Fodder availability risk during summer months', 'Dependency on Amul cooperative for primary offtake', 'Transport to Vadodara city market requires vehicle', 'Veterinary services limited in village — nearest clinic 8 km', 'Seasonal demand reduction in summer']),
        competitorAnalysis: 'Estimated 8-12 existing dairy farmers within 10 km radius. Competition level is moderate. Most competitors supply raw milk only — opportunity exists in value-added products. Local market is not saturated for ghee and paneer supply.',
        pricingStrategy: 'Raw milk: ₹42-48/litre. Ghee: ₹550-680/kg. Paneer: ₹280-350/kg. Curd: ₹60-80/500g. Recommended to start with raw milk supply to cooperative and gradually add value-added processing in Year 2.',
        aiRecommendations: 'Start with 3-5 quality HF/Jersey crossbred cows. Enroll in Amul cooperative in first month for guaranteed milk pricing. Invest in basic milk chilling equipment to extend shelf life. Explore Kamdhenu scheme for additional government subsidy. Plan ghee/paneer production by Year 2 for improved margins. Maintain emergency fund equivalent to 3 months operational cost.',
        status: 'completed',
        isDemo: true,
      },
    })

    // Create demo report
    await prisma.report.create({
      data: {
        userId: demoUser.id,
        analysisId: demoAnalysis.id,
        title: 'Dairy Business Feasibility Report — Vadodara, Gujarat',
        status: 'generated',
      },
    })

    // Create demo chat messages
    await prisma.chatMessage.createMany({
      data: [
        {
          userId: demoUser.id,
          analysisId: demoAnalysis.id,
          role: 'user',
          content: 'Is dairy farming suitable for my village in Vadodara?',
          language: 'en',
        },
        {
          userId: demoUser.id,
          analysisId: demoAnalysis.id,
          role: 'assistant',
          content: 'Yes! Dairy farming is an excellent choice for your location in Vadodara district, Gujarat. Here\'s why:\n\n**Why Gujarat is ideal for dairy:**\n- Gujarat is home to the Amul cooperative — India\'s largest dairy network\n- Guaranteed milk procurement at fixed prices\n- Government\'s Kamdhenu scheme provides additional cattle purchase subsidies\n\n**Your specific advantage:**\n- Savli block has good fodder availability\n- 10 km market radius covers 8,000-12,000 potential customers\n- Vadodara city proximity offers premium market access\n\n**Recommended next steps:**\n1. Contact local Amul cooperative for enrollment\n2. Apply for Kamdhenu scheme subsidy\n3. Start with 3-5 HF/Jersey crossbred cows',
          language: 'en',
        },
      ],
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log('📧 Demo user: demo@gramsaarthi.ai')
  console.log('🔑 Demo password: demo123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
