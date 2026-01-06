'use client'

import { useLocale } from '@/components/providers/locale-provider'
import { getTranslation } from '@/lib/translations'
import { Heart } from 'lucide-react'

export default function Footer() {
  const { locale } = useLocale()

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gradient">
              AI & Data Club
            </h3>
            <p className="text-sm text-muted-foreground">
              {getTranslation(locale, 'about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getTranslation(locale, 'nav.home')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  {getTranslation(locale, 'nav.about')}
                </a>
              </li>
              <li>
                <a href="#events" className="text-muted-foreground hover:text-primary transition-colors">
                  {getTranslation(locale, 'nav.events')}
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-primary transition-colors">
                  {getTranslation(locale, 'nav.team')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {getTranslation(locale, 'nav.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {getTranslation(locale, 'nav.contact')}
            </h3>
            <p className="text-sm text-muted-foreground">
              Innovation University
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              abdullahhossam414@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            {getTranslation(locale, 'footer.madeWith')}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            {getTranslation(locale, 'footer.by')}
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} AI & Data Club. {getTranslation(locale, 'footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  )
}

