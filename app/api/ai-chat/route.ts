import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are a helpful AI assistant for the AI & Data Club at Innovation University. 
Your role is to help students and visitors learn about the club, its activities, events, and how to join.

Key Information:
- Club Name: AI & Data Club
- University: Innovation University
- Goal: Helping students become job-ready for the AI & Data market
- Type: Educational + Student Activities
- Target Audience: Students, graduates, and anyone interested in AI & Data

You should:
- Answer questions about the club's mission, vision, and activities
- Provide information about upcoming events
- Help with joining the club
- Be friendly, professional, and encouraging
- If you don't know something, suggest contacting the club directly

Keep responses concise and helpful.`;

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const { message, locale, conversationHistory } = await req.json()

    const messages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT + (locale === 'ar' ? '\n\nRespond in Arabic.' : '\n\nRespond in English.'),
      },
      ...conversationHistory.slice(-6).map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user' as const,
        content: message,
      },
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    })

    const response = completion.choices[0]?.message?.content || 
      (locale === 'ar' 
        ? 'عذراً، لم أتمكن من إنشاء رد. يرجى المحاولة مرة أخرى.'
        : 'Sorry, I couldn\'t generate a response. Please try again.')

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Error calling OpenAI:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

