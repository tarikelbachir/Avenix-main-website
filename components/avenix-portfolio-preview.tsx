import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

export function AvenixPortfolioPreview() {
  const projects = [
    {
      name: "Garage Van Der Berg",
      industry: "Automotive",
      image: "/modern-automotive-garage-website.png",
      services: ["Website", "SEO", "Fotografie"],
    },
    {
      name: "TechSolutions B.V.",
      industry: "IT Services",
      image: "/professional-it-services-website.png",
      services: ["Website", "Maatwerk", "API"],
    },
    {
      name: "Restaurant Bella Vista",
      industry: "Horeca",
      image: "/elegant-restaurant-website.png",
      services: ["Website", "Reserveringen", "Menu"],
    },
    {
      name: "Accountantskantoor Jansen",
      industry: "Zakelijke dienstverlening",
      image: "/professional-accounting-firm-website.png",
      services: ["Website", "Klantportaal", "SEO"],
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Ons Portfolio</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ontdek hoe wij bedrijven hebben geholpen met moderne, resultaatgerichte websites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {projects.map((project, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.name} website`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button size="sm" variant="secondary" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Bekijk Project
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="font-montserrat font-bold text-lg mb-2">{project.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{project.industry}</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service, serviceIndex) => (
                  <span key={serviceIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {service}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/portfolio">Bekijk Alle Projecten</Link>
        </Button>
      </div>
    </section>
  )
}
