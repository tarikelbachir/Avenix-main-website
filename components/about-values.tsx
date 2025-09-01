import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Gauge, Euro, Code, TrendingUp } from "lucide-react"

export function AboutValues() {
  const values = [
    {
      icon: MapPin,
      title: "Lokaal & Persoonlijk",
      description: "Directe lijnen, Nederlandse support en persoonlijke begeleiding van A tot Z.",
    },
    {
      icon: Gauge,
      title: "Performance Focus",
      description: "Alleen tevreden met 90+ scores. Snelheid en prestaties staan voorop.",
    },
    {
      icon: Euro,
      title: "Transparante Prijzen",
      description: "Geen verrassingen achteraf. Heldere prijzen en duidelijke afspraken.",
    },
    {
      icon: Code,
      title: "Moderne Tech Stack",
      description: "React, Next.js, Tailwind CSS - wij werken met de nieuwste technologieën.",
    },
    {
      icon: TrendingUp,
      title: "Resultaatgericht",
      description: "Conversie voor clicks. Wij bouwen websites die uw bedrijf laten groeien.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
          Waarom Kiezen voor Avenix?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ontdek wat ons onderscheidt van andere webdevelopment bureaus
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => {
          const IconComponent = value.icon
          return (
            <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-4">
                <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="font-montserrat font-bold text-lg">{value.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
