import dynamic from 'next/dynamic'
import HeroSection from '@/components/homepage/HeroSection'
import IntroSection from '@/components/homepage/IntroSection'
import LogoMarquee from '@/components/ui/logo-marquee'
import ServicesSection from '@/components/homepage/ServicesSection'
import ProjectsSection from '@/components/homepage/ProjectsSection/index'
import TestimonialsSection from '@/components/homepage/TestimonialsSection'
import HomePageChrome from '@/components/homepage/HomePageChrome'
import { SubstackFeed } from '@/components/SubstackFeed'

const CalculatorSection = dynamic(() => import('@/components/homepage/CalculatorSection'), {
  loading: () => (
    <section className="ed-shell border-t border-white/10 px-6 py-20 md:px-10 md:py-28">
      <div className="ed-wide-container">
        <div className="h-8 w-48 rounded-full bg-white/10" />
        <div className="mt-8 h-64 rounded-3xl border border-white/10 bg-white/[0.03]" />
      </div>
    </section>
  ),
})
const HomePageFooter = dynamic(() => import('@/components/homepage/HomePageFooter'))

export default function App() {
  return (
    <HomePageChrome>
      <div id="hero">
        <HeroSection />
      </div>
      <IntroSection />
      <LogoMarquee />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CalculatorSection />
      <SubstackFeed />
      <HomePageFooter />
    </HomePageChrome>
  )
}
