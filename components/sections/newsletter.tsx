'use client'

import { useState } from 'react'
import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Newsletter() {
  const { locale } = useLocale()
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success(getTranslation(locale, 'newsletter.subscribed'))
        setEmail('')
      } else {
        const data = await res.json()
        throw new Error(data.error || 'Failed to subscribe')
      }
    } catch (error: any) {
      toast.error(error.message || (locale === 'ar' ? 'فشل الاشتراك' : 'Failed to subscribe'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass-dark rounded-lg p-8 md:p-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {getTranslation(locale, 'newsletter.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {getTranslation(locale, 'newsletter.description')}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={getTranslation(locale, 'newsletter.email')}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gradient"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {locale === 'ar' ? 'جاري...' : 'Subscribing...'}
                  </>
                ) : (
                  getTranslation(locale, 'newsletter.subscribe')
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

