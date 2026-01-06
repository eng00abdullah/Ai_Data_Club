'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EventCountdown from '@/components/event-countdown'
import { formatDate, formatDateTime } from '@/lib/utils'
import Image from 'next/image'

interface Event {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  date: string
  location?: string | null
  image?: string | null
  status: string
}

export default function Events() {
  const { locale } = useLocale()
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events')
      if (res.ok) {
        const data = await res.json()
        const upcomingEvents = data
          .filter((e: Event) => new Date(e.date) >= new Date())
          .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3)
        setEvents(upcomingEvents)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const nextEvent = events[0]

  return (
    <section id="events" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            <span className="text-gradient">
              {getTranslation(locale, 'events.title')}
            </span>
          </motion.h2>
        </motion.div>

        {/* Next Event Countdown */}
        {nextEvent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <Card className="glass-dark border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {locale === 'ar' ? nextEvent.titleAr : nextEvent.titleEn}
                </CardTitle>
                <CardDescription>
                  {locale === 'ar' ? nextEvent.descriptionAr : nextEvent.descriptionEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5" />
                    <span>{formatDateTime(new Date(nextEvent.date), locale)}</span>
                  </div>
                  {nextEvent.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{nextEvent.location}</span>
                    </div>
                  )}
                  <EventCountdown targetDate={new Date(nextEvent.date)} locale={locale} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              {getTranslation(locale, 'events.noEvents')}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * (index + 1) }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-dark h-full flex flex-col">
                  {event.image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={event.image}
                        alt={locale === 'ar' ? event.titleAr : event.titleEn}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>
                      {locale === 'ar' ? event.titleAr : event.titleEn}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {locale === 'ar' ? event.descriptionAr : event.descriptionEn}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-end">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(new Date(event.date), locale)}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" className="w-full">
                      {getTranslation(locale, 'events.learnMore')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

