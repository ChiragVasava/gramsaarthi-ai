import { NextRequest, NextResponse } from 'next/server'
import { generateChatResponse } from '@/lib/ai-service'

export async function POST(req: NextRequest) {
  try {
    const { message, context, history, language } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const reply = await generateChatResponse(
      message,
      context || {},
      history || [],
      language || 'en'
    )

    return NextResponse.json({
      reply,
      isLiveAI: Boolean(process.env.GEMINI_API_KEY),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    )
  }
}
