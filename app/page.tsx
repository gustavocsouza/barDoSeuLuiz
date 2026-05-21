import { BottleScene } from '@/components/bottle/BottleScene'
import { HeroSection } from '@/components/sections/HeroSection'
import { StorytellingSection } from '@/components/sections/StorytellingSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { MenuSection } from '@/components/sections/MenuSection'
import { ExperienceSection } from '@/components/sections/ExperienceSection'
import { CTASection } from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main id="main-content">
      {/* Fixed bottle lives outside the scroll flow */}
      <BottleScene />

      {/* Scroll sections define the narrative */}
      <HeroSection />
      <StorytellingSection />
      <AboutSection />
      <MenuSection />
      <ExperienceSection />
      <CTASection />
    </main>
  )
}
