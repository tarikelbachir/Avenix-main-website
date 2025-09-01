import { AdvancedNavigation } from "@/components/advanced-navigation"
import { SophisticatedHero } from "@/components/sophisticated-hero"
import { AvenixServicesPreview } from "@/components/avenix-services-preview"
import { AvenixPortfolioPreview } from "@/components/avenix-portfolio-preview"
import { AvenixTestimonials } from "@/components/avenix-testimonials"
import { AvenixCTASection } from "@/components/avenix-cta-section"
import { AvenixFooter } from "@/components/avenix-footer"
import { AnimatedSection } from "@/components/animated-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <AdvancedNavigation />

      <main>
        <SophisticatedHero />

        <AnimatedSection className="py-24" delay={0.1}>
          <AvenixServicesPreview />
        </AnimatedSection>

        <AnimatedSection className="py-24 bg-muted/30" delay={0.2}>
          <AvenixPortfolioPreview />
        </AnimatedSection>

        <AnimatedSection className="py-24" delay={0.3}>
          <AvenixTestimonials />
        </AnimatedSection>

        <AnimatedSection className="py-24 bg-gradient-to-r from-primary to-secondary" delay={0.4}>
          <AvenixCTASection />
        </AnimatedSection>
      </main>

      <AvenixFooter />
    </div>
  )
}
