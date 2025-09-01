import { Badge } from "@/components/ui/badge"

export function AboutExpertise() {
  const expertiseAreas = [
    { name: "React/Next.js", level: "Expert" },
    { name: "Tailwind CSS", level: "Expert" },
    { name: "SEO Optimalisatie", level: "Gevorderd" },
    { name: "Performance", level: "Expert" },
    { name: "UI/UX Design", level: "Gevorderd" },
    { name: "API Integraties", level: "Expert" },
    { name: "E-commerce", level: "Gevorderd" },
    { name: "Database Design", level: "Gevorderd" },
    { name: "Mobile Development", level: "Gevorderd" },
    { name: "Cloud Hosting", level: "Expert" },
    { name: "Security", level: "Gevorderd" },
    { name: "Analytics", level: "Gevorderd" },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Expert":
        return "bg-green-100 text-green-800 border-green-200"
      case "Gevorderd":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Onze Expertise</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Wij beheersen de nieuwste technologieën en best practices voor moderne webdevelopment
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {expertiseAreas.map((skill, index) => (
            <div key={index} className="text-center">
              <div className="mb-3">
                <h3 className="font-semibold text-foreground mb-2">{skill.name}</h3>
                <Badge variant="outline" className={`text-xs ${getLevelColor(skill.level)}`}>
                  {skill.level}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Expert Level</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Gevorderd Level</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
