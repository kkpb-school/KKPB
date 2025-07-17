import { HeroSection } from "@/app/(pages)/(home)/hero-section";
import { StatsSection } from "@/app/(pages)/(home)/stats-section";
import { AboutSection } from "@/app/(pages)/(home)/about-section";
import { ProgramsSection } from "@/app/(pages)/(home)/programs-section";
import { FacilitiesSection } from "@/app/(pages)/(home)/facilities-section";
import { AchievementsSection } from "@/app/(pages)/(home)/achievements-section";
import { ContactSection } from "@/app/(pages)/(home)/contact-section";

export default function HomePage() {
  return (
    <div>
      <main className="flex-1">
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
