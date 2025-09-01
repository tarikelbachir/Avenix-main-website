"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, TrendingUp } from "lucide-react"

export function PortfolioGrid() {
  const [activeFilter, setActiveFilter] = useState("Alle")

  const filters = ["Alle", "Automotive", "Retail", "B2B", "Horeca", "Zorg", "Sport", "Vastgoed"]

  const projects = [
    {
      id: 1,
      name: "Garage Van Der Berg",
      industry: "Automotive",
      image: "/modern-automotive-garage-website.png",
      services: ["Website", "SEO", "Fotografie"],
      challenge: "Verouderde website met slechte vindbaarheid in Google",
      solution: "Moderne responsive website met lokale SEO optimalisatie",
      results: "+150% meer online aanvragen, #1 in Google voor 'garage [stad]'",
      metrics: { traffic: "+150%", ranking: "#1 Google", conversions: "+200%" },
    },
    {
      id: 2,
      name: "TechSolutions B.V.",
      industry: "B2B",
      image: "/professional-it-services-website.png",
      services: ["Website", "Maatwerk", "API"],
      challenge: "Complexe diensten moeilijk uit te leggen aan potentiële klanten",
      solution: "Heldere website met interactieve service configurator",
      results: "+80% meer leads, 40% kortere sales cycle",
      metrics: { leads: "+80%", sales: "-40% cycle", satisfaction: "95%" },
    },
    {
      id: 3,
      name: "Restaurant Bella Vista",
      industry: "Horeca",
      image: "/elegant-restaurant-website.png",
      services: ["Website", "Reserveringen", "Menu"],
      challenge: "Veel telefonische reserveringen, geen online bestelmogelijkheid",
      solution: "Website met online reserveringssysteem en takeaway module",
      results: "70% minder telefoontjes, +200% online bestellingen",
      metrics: { calls: "-70%", orders: "+200%", efficiency: "+300%" },
    },
    {
      id: 4,
      name: "Accountantskantoor Jansen",
      industry: "B2B",
      image: "/professional-accounting-firm-website.png",
      services: ["Website", "Klantportaal", "SEO"],
      challenge: "Klanten moesten fysiek documenten brengen",
      solution: "Beveiligd klantportaal voor document uitwisseling",
      results: "90% digitale documentuitwisseling, +50% klanttevredenheid",
      metrics: { digital: "90%", satisfaction: "+50%", efficiency: "+60%" },
    },
    {
      id: 5,
      name: "Fitness Studio PowerFit",
      industry: "Sport",
      image: "/modern-fitness-studio-website.png",
      services: ["Website", "Boekingssysteem", "App"],
      challenge: "Handmatige planning van lessen en personal training",
      solution: "Online boekingssysteem met automatische planning",
      results: "+120% online boekingen, 50% minder administratie",
      metrics: { bookings: "+120%", admin: "-50%", retention: "+30%" },
    },
    {
      id: 6,
      name: "Makelaardij Stad & Land",
      industry: "Vastgoed",
      image: "/professional-real-estate-website.png",
      services: ["Website", "CRM", "Zoekfunctie"],
      challenge: "Woningen niet goed vindbaar, verouderde presentatie",
      solution: "Moderne website met geavanceerde zoekfunctie en VR tours",
      results: "+90% meer bezichtigingen, 30% snellere verkoop",
      metrics: { viewings: "+90%", sales: "+30% sneller", leads: "+160%" },
    },
    {
      id: 7,
      name: "Bakkerij De Korenschoof",
      industry: "Retail",
      image: "/artisan-bakery-website.png",
      services: ["Website", "E-commerce", "Bezorging"],
      challenge: "Alleen fysieke verkoop, geen online aanwezigheid",
      solution: "E-commerce website met lokale bezorgservice",
      results: "+300% omzet tijdens lockdown, nieuwe klantenkring",
      metrics: { revenue: "+300%", customers: "+250%", orders: "500/week" },
    },
    {
      id: 8,
      name: "Tandartspraktijk Smile",
      industry: "Zorg",
      image: "/modern-dental-practice-website.png",
      services: ["Website", "Afspraken", "Patiëntportaal"],
      challenge: "Veel telefonische afspraken, papieren dossiers",
      solution: "Online afsprakenplanner met digitaal patiëntdossier",
      results: "80% online afspraken, paperless praktijk",
      metrics: { online: "80%", paper: "0%", efficiency: "+70%" },
    },
  ]

  const filteredProjects =
    activeFilter === "Alle" ? projects : projects.filter((project) => project.industry === activeFilter)

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "outline"}
            onClick={() => setActiveFilter(filter)}
            className={activeFilter === filter ? "bg-primary hover:bg-primary/90" : "border-border hover:bg-muted"}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.name} website`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <Button size="sm" variant="secondary" className="w-full mb-2">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Bekijk Project
                  </Button>
                  <div className="flex items-center text-white text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>{Object.values(project.metrics)[0]}</span>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-montserrat font-bold text-lg">{project.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {project.industry}
                </Badge>
              </div>

              <div className="space-y-4">
                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>

                {/* Case Study Preview */}
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold text-muted-foreground">Challenge:</span>
                    <p className="text-muted-foreground mt-1">{project.challenge}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Resultaat:</span>
                    <p className="text-foreground mt-1 font-medium">{project.results}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                  {Object.entries(project.metrics).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-primary font-bold text-sm">{value}</div>
                      <div className="text-muted-foreground text-xs capitalize">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl">
        <h3 className="font-montserrat font-bold text-2xl mb-4">Klaar voor Uw Succes Verhaal?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Laten we samen uw bedrijf naar het volgende niveau tillen met een website die resultaat oplevert.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Start Uw Project
        </Button>
      </div>
    </section>
  )
}
