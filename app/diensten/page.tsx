import { AvenixNavigation } from "@/components/avenix-navigation"
import { AvenixFooter } from "@/components/avenix-footer"
import { ServicesHero } from "@/components/services-hero"
import { ServicesGrid } from "@/components/services-grid"
import { WorkflowTimeline } from "@/components/workflow-timeline"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Diensten - Avenix Software",
  description:
    "Van simpele landingspagina tot complete webshop - wij hebben de expertise. Bekijk onze diensten en prijzen.",
}

export default function DienstenPage() {
  return (
    <div className="min-h-screen bg-background">
      <AvenixNavigation />

      <main>
        <ServicesHero />

        <AnimatedSection className="py-16" delay={0.1}>
          <ServicesGrid />
        </AnimatedSection>

        <AnimatedSection className="py-16 bg-muted/30" delay={0.2}>
          <WorkflowTimeline />
        </AnimatedSection>
      </main>

      <AvenixFooter />
    </div>
  )
}
