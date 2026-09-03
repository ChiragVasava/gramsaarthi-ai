import fs from 'fs'

// Read .env manually
const envContent = fs.readFileSync('.env', 'utf-8')
const match = envContent.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)["']?/)
const key = match ? match[1] : ''
process.env.GEMINI_API_KEY = key

console.log('Testing key length:', key.length, 'Prefix:', key.substring(0, 6) + '...')

async function checkKey() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`
    const res = await fetch(url)
    const data = await res.json()
    console.log('HTTP Status:', res.status)
    if (res.status === 200) {
      console.log('✅ Testing latest information response from generateChatResponse:')
      const { generateChatResponse } = await import('./lib/ai-service.ts')
      const reply = await generateChatResponse(
        'What are the latest government subsidy rates and milk procurement price for a dairy startup in Vadodara Gujarat?',
        { category: 'Dairy', location: 'Vadodara, Gujarat', marginCapital: 100000, scheme: 'term' },
        [],
        'en'
      )
      console.log('🟢 Advisor Response:\n', reply)
    } else {
      console.log('❌ Error Response:', JSON.stringify(data, null, 2))
    }
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

checkKey()
