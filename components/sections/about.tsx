'use client'

import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Brain, Users, Target } from 'lucide-react'

export default function About() {
  const { locale } = useLocale()
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const features = [
    {
      icon: Brain,
      title: locale === 'ar' ? 'التعليم المتقدم' : 'Advanced Learning',
      description: locale === 'ar' 
        ? 'برامج تعليمية متقدمة في الذكاء الاصطناعي وعلوم البيانات'
        : 'Advanced educational programs in AI and Data Science',
    },
    {
      icon: Users,
      title: locale === 'ar' ? 'مجتمع نشط' : 'Active Community',
      description: locale === 'ar'
        ? 'مجتمع من الطلاب المتحمسين والمهتمين بالتكنولوجيا'
        : 'A community of passionate and tech-interested students',
    },
    {
      icon: Target,
      title: locale === 'ar' ? 'جاهزية للعمل' : 'Job Ready',
      description: locale === 'ar'
        ? 'إعداد الطلاب لسوق العمل في مجال الذكاء الاصطناعي والبيانات'
        : 'Preparing students for the AI & Data job market',
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32 relative">
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
              {getTranslation(locale, 'about.title')}
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            {getTranslation(locale, 'about.description')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 * (index + 1) }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="glass-dark rounded-lg p-8 text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

