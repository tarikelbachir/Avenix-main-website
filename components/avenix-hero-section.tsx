import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export function AvenixHeroSection() {
  const benefits = [
    "90+ Performance Score Garantie",
    "Mobile-First Design",
    "SEO Geoptimaliseerd",
    "2-4 Weken Levertijd",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary py-20 lg:py-32">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-montserrat font-black text-4xl md:text-6xl lg:text-7xl text-white mb-6 text-balance">
            Moderne Websites Die Uw Bedrijf Laten <span className="text-yellow-300">Groeien</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto text-pretty">
            Van concept tot conversie in 2-4 weken. Geoptimaliseerd voor snelheid, SEO en resultaat.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-3">
              <Link href="/portfolio">Bekijk Portfolio</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-semibold px-8 py-3 bg-transparent"
            >
              <Link href="/contact">Gratis Adviesgesprek</Link>
            </Button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-2 text-white/90">
                <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Image Placeholder */}
      <div className="mt-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <img
              src="/modern-website-dashboard-mockup.png"
              alt="Modern website dashboard mockup"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
