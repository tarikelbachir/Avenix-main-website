import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, ShoppingCart, Cog, Wrench } from "lucide-react"
import Link from "next/link"

export function ServicesGrid() {
  const services = [
    {
      id: "websites",
      icon: Globe,
      title: "Business Websites",
      description: "Professionele websites die uw bedrijf online laten groeien",
      features: [
        "5-10 pagina's",
        "Contact formulieren",
        "Google Maps integratie",
        "WhatsApp chat",
        "Mobile responsive",
        "SEO geoptimaliseerd",
      ],
      price: "Vanaf €1.750",
      popular: false,
    },
    {
      id: "ecommerce",
      icon: ShoppingCart,
      title: "E-commerce/Webshops",
      description: "Complete webshops om online te verkopen",
      features: [
        "Product catalog",
        "Betaalsystemen (Mollie/Stripe)",
        "Voorraad beheer",
        "Klantaccounts",
        "Verzendintegraties",
        "Analytics dashboard",
      ],
      price: "Vanaf €3.500",
      popular: true,
    },
    {
      id: "maatwerk",
      icon: Cog,
      title: "Maatwerk Oplossingen",
      description: "Custom functionaliteit voor specifieke behoeften",
      features: [
        "Reserveringssystemen",
        "Klantportalen",
        "API integraties",
        "Custom functionaliteit",
        "Database ontwerp",
        "Workflow automatisering",
      ],
      price: "Prijs op aanvraag",
      popular: false,
    },
    {
      id: "onderhoud",
      icon: Wrench,
      title: "Website Onderhoud",
      description: "Zorgeloos onderhoud van uw website",
      features: [
        "Security updates",
        "Backups",
        "Content updates",
        "Performance monitoring",
        "24/7 support",
        "Maandelijkse rapportage",
      ],
      price: "Vanaf €75/maand",
      popular: false,
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => {
          const IconComponent = service.icon
          return (
            <Card
              key={service.id}
              className={`relative border-border hover:shadow-lg transition-all duration-300 ${
                service.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">Populair</span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-montserrat font-bold text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-lg">{service.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="text-center">
                  <span className="text-3xl font-bold text-primary">{service.price}</span>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/contact">Offerte Aanvragen</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
