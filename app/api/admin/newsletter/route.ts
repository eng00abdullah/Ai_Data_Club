import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    })

    return NextResponse.json(subscribers)
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    // Return empty array instead of error during build
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      return NextResponse.json([])
    }
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}

