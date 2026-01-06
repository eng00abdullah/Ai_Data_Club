'use client'

import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Eye, Rocket } from 'lucide-react'

export default function VisionMission() {
  const { locale } = useLocale()
  const { ref: visionRef, inView: visionInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: missionRef, inView: missionInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div
            ref={visionRef}
            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
            animate={visionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-dark rounded-lg p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                {getTranslation(locale, 'vision.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {getTranslation(locale, 'vision.description')}
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            ref={missionRef}
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            animate={missionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-dark rounded-lg p-8 md:p-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                {getTranslation(locale, 'mission.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {getTranslation(locale, 'mission.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

