'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Check, Trash2 } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Message {
  id: string
  name: string
  email: string
  subject?: string | null
  message: string
  isRead: boolean
  createdAt: string
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages')
      if (res.ok) {
        const data = await res.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Contact Messages</h1>
        <Card className="glass-dark">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{unreadCount}</div>
            <div className="text-sm text-muted-foreground">Unread Messages</div>
          </CardContent>
        </Card>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card
              key={msg.id}
              className={`glass-dark ${!msg.isRead ? 'border-primary/50' : ''}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {msg.name}
                      {!msg.isRead && (
                        <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                          New
                        </span>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{msg.email}</p>
                    {msg.subject && (
                      <p className="text-sm font-medium mt-2">{msg.subject}</p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDateTime(new Date(msg.createdAt), 'en')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 whitespace-pre-wrap">{msg.message}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Read
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

