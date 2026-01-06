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

    const [events, teamMembers, galleryImages, achievements, subscribers, messages] = await Promise.all([
      prisma.event.count(),
      prisma.teamMember.count({ where: { isActive: true } }),
      prisma.galleryImage.count(),
      prisma.achievement.count(),
      prisma.newsletterSubscriber.count({ where: { isActive: true } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ])

    return NextResponse.json({
      events,
      teamMembers,
      galleryImages,
      achievements,
      subscribers,
      messages,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Return default stats instead of error during build
    if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'production') {
      return NextResponse.json({
        events: 0,
        teamMembers: 0,
        galleryImages: 0,
        achievements: 0,
        subscribers: 0,
        messages: 0,
      })
    }
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}

