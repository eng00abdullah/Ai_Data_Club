'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Locale } from '@/lib/i18n'

interface EventCountdownProps {
  targetDate: Date
  locale: Locale
}

export default function EventCountdown({ targetDate, locale }: EventCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (isExpired) {
    return (
      <div className="text-center py-4">
        <p className="text-lg font-semibold text-primary">
          {locale === 'ar' ? 'انتهى الحدث' : 'Event has started!'}
        </p>
      </div>
    )
  }

  const timeUnits = [
    { label: locale === 'ar' ? 'يوم' : 'Days', value: timeLeft.days },
    { label: locale === 'ar' ? 'ساعة' : 'Hours', value: timeLeft.hours },
    { label: locale === 'ar' ? 'دقيقة' : 'Minutes', value: timeLeft.minutes },
    { label: locale === 'ar' ? 'ثانية' : 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="py-4">
      <p className="text-sm font-medium mb-4 text-center">
        {locale === 'ar' ? 'الوقت المتبقي' : 'Time Remaining'}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1, type: 'spring' }}
            className="text-center"
          >
            <div className="glass-dark rounded-lg p-3 mb-2">
              <motion.div
                key={unit.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-primary"
              >
                {String(unit.value).padStart(2, '0')}
              </motion.div>
            </div>
            <div className="text-xs text-muted-foreground">{unit.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

