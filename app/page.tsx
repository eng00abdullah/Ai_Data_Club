import { LocaleProvider } from '@/components/providers/locale-provider'
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import VisionMission from '@/components/sections/vision-mission'
import Events from '@/components/sections/events'
import Team from '@/components/sections/team'
import Gallery from '@/components/sections/gallery'
import Achievements from '@/components/sections/achievements'
import Contact from '@/components/sections/contact'
import Newsletter from '@/components/sections/newsletter'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import AIChatAssistant from '@/components/ai-chat-assistant'

export default function Home() {
  return (
    <LocaleProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <About />
          <VisionMission />
          <Events />
          <Team />
          <Gallery />
          <Achievements />
          <Contact />
          <Newsletter />
        </main>
        <Footer />
        <AIChatAssistant />
      </div>
    </LocaleProvider>
  )
}

