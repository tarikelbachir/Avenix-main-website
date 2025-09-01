import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Zap } from "lucide-react"

export function AboutMission() {
  const missionPoints = [
    {
      icon: Target,
      title: "Onze Missie",
      description:
        "MKB bedrijven laten groeien met moderne, snelle websites die resultaat opleveren. Geen templates, maar maatwerk dat werkt.",
    },
    {
      icon: Users,
      title: "Onze Klanten",
      description:
        "Wij werken samen met ambitieuze ondernemers die hun online aanwezigheid naar het volgende niveau willen tillen.",
    },
    {
      icon: Zap,
      title: "Onze Aanpak",
      description:
        "Persoonlijk contact, transparante communicatie en focus op meetbare resultaten. Van concept tot conversie.",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Wie Zijn Wij?</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Avenix Software is uw betrouwbare partner voor digitale groei. Wij combineren technische expertise met
          zakelijk inzicht om websites te bouwen die écht werken.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {missionPoints.map((point, index) => {
          const IconComponent = point.icon
          return (
            <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-montserrat font-bold text-xl mb-4">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{point.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
