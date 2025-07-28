import { AboutSection } from './about-section';
import { AchievementsSection } from './achievements-section';
import { ContactSection } from './contact-section';
import { FacilitiesSection } from './facilities-section';
import { HeroSection } from './hero-section';
import { ProgramsSection } from './programs-section';
import { StatsSection } from './stats-section';

export default function HomePage() {
  return (
    <div>
      <main className='flex-1'>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ProgramsSection />
        <FacilitiesSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </div>
  );
}
