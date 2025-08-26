import HeroSection from '@/components/sections/HeroSection'
import StorytellingSection from '@/components/sections/StorytellingSection'
import ProgramsMarqueeSection from '@/components/sections/ProgramsMarqueeSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import MarginCalculatorSection from '@/components/sections/MarginCalculatorSection'
import ContactSection from '@/components/sections/ContactSection'
import Navbar from '@/components/organisms/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />
        <StorytellingSection />
        <TestimonialsSection />
        <ProgramsMarqueeSection />
        <MarginCalculatorSection />
        <ContactSection />
      </main>
    </>
  )
}