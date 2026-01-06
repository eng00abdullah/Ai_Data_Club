'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Download } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface Subscriber {
  id: string
  email: string
  name?: string | null
  subscribedAt: string
  isActive: boolean
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/admin/newsletter')
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data)
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const activeSubscribers = subscribers.filter(s => s.isActive)

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Newsletter Subscribers</h1>
        <div className="flex gap-4">
          <Card className="glass-dark">
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{activeSubscribers.length}</div>
              <div className="text-sm text-muted-foreground">Active Subscribers</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <Card className="glass-dark">
          <CardHeader>
            <CardTitle>Subscribers List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{subscriber.email}</p>
                      {subscriber.name && (
                        <p className="text-sm text-muted-foreground">{subscriber.name}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDate(new Date(subscriber.subscribedAt), 'en')}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

