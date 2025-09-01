import { AvenixNavigation } from "@/components/avenix-navigation"
import { AvenixFooter } from "@/components/avenix-footer"
import { AboutHero } from "@/components/about-hero"
import { AboutMission } from "@/components/about-mission"
import { AboutValues } from "@/components/about-values"
import { AboutExpertise } from "@/components/about-expertise"
import { AboutTeam } from "@/components/about-team"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Over Ons - Avenix Software",
  description:
    "Leer meer over Avenix Software. Uw digitale partner voor moderne websites die uw bedrijf laten groeien.",
}

export default function OverOnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AvenixNavigation />

      <main>
        <AboutHero />

        <AnimatedSection className="py-16" delay={0.1}>
          <AboutMission />
        </AnimatedSection>

        <AnimatedSection className="py-16 bg-muted/30" delay={0.2}>
          <AboutValues />
        </AnimatedSection>

        <AnimatedSection className="py-16" delay={0.3}>
          <AboutExpertise />
        </AnimatedSection>

        <AnimatedSection className="py-16 bg-muted/30" delay={0.4}>
          <AboutTeam />
        </AnimatedSection>
      </main>

      <AvenixFooter />
    </div>
  )
}
