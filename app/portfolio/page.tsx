import { AvenixNavigation } from "@/components/avenix-navigation"
import { AvenixFooter } from "@/components/avenix-footer"
import { PortfolioHero } from "@/components/portfolio-hero"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Portfolio - Avenix Software",
  description:
    "Bekijk onze portfolio met succesvolle projecten voor verschillende branches. Van automotive tot zorg, wij hebben de expertise.",
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background">
      <AvenixNavigation />

      <main>
        <PortfolioHero />

        <AnimatedSection className="py-16" delay={0.1}>
          <PortfolioGrid />
        </AnimatedSection>
      </main>

      <AvenixFooter />
    </div>
  )
}
