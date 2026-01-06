'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Users, Image as ImageIcon, Trophy, Mail, MessageSquare } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    teamMembers: 0,
    galleryImages: 0,
    achievements: 0,
    subscribers: 0,
    messages: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats')
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const statCards = [
    {
      title: 'Events',
      value: stats.events,
      icon: Calendar,
      description: 'Total events',
    },
    {
      title: 'Team Members',
      value: stats.teamMembers,
      icon: Users,
      description: 'Active members',
    },
    {
      title: 'Gallery Images',
      value: stats.galleryImages,
      icon: ImageIcon,
      description: 'Total images',
    },
    {
      title: 'Achievements',
      value: stats.achievements,
      icon: Trophy,
      description: 'Total achievements',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribers,
      icon: Mail,
      description: 'Active subscribers',
    },
    {
      title: 'Contact Messages',
      value: stats.messages,
      icon: MessageSquare,
      description: 'Unread messages',
    },
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="glass-dark">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

