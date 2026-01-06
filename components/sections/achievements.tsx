'use client'

import { useEffect, useState } from 'react'
import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { formatDate } from '@/lib/utils'
import { Trophy, Award, Target } from 'lucide-react'

interface Achievement {
  id: string
  titleEn: string
  titleAr: string
  descriptionEn: string
  descriptionAr: string
  icon?: string | null
  image?: string | null
  date: string
}

export default function Achievements() {
  const { locale } = useLocale()
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [])

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/achievements')
      if (res.ok) {
        const data = await res.json()
        setAchievements(data)
      }
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (iconName?: string | null) => {
    switch (iconName) {
      case 'trophy':
        return Trophy
      case 'award':
        return Award
      case 'target':
        return Target
      default:
        return Trophy
    }
  }

  return (
    <section id="achievements" className="py-20 md:py-32 relative">
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
              {getTranslation(locale, 'achievements.title')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground"
          >
            {getTranslation(locale, 'achievements.description')}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : achievements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {locale === 'ar' ? 'لا توجد إنجازات' : 'No achievements yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = getIcon(achievement.icon)
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -10 }}
                  className="glass-dark rounded-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">
                        {locale === 'ar' ? achievement.titleAr : achievement.titleEn}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {locale === 'ar' ? achievement.descriptionAr : achievement.descriptionEn}
                      </p>
                      <p className="text-sm text-primary">
                        {formatDate(new Date(achievement.date), locale)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

