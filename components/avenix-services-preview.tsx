import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ShoppingCart, Settings } from "lucide-react"
import Link from "next/link"

export function AvenixServicesPreview() {
  const services = [
    {
      icon: Globe,
      title: "Website Development",
      description: "Custom websites op maat voor uw bedrijf. Snel, veilig en geoptimaliseerd voor conversie.",
      features: ["Responsive Design", "SEO Geoptimaliseerd", "CMS Integratie"],
    },
    {
      icon: ShoppingCart,
      title: "E-commerce",
      description: "Complete webshops met betaalsystemen, voorraad beheer en klantaccounts.",
      features: ["Mollie/Stripe", "Voorraad Beheer", "Klantportaal"],
    },
    {
      icon: Settings,
      title: "Maintenance",
      description: "Zorgeloos onderhoud van uw website. Updates, backups en monitoring.",
      features: ["Security Updates", "Performance Monitoring", "24/7 Support"],
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Onze Diensten</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Van simpele websites tot complexe webshops - wij hebben de expertise
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="font-montserrat font-bold text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
          <Link href="/diensten">Alle Diensten Bekijken</Link>
        </Button>
      </div>
    </section>
  )
}
