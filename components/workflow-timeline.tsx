export function WorkflowTimeline() {
  const steps = [
    {
      title: "Kennismaking & Briefing",
      description: "We bespreken uw wensen, doelen en budget in een persoonlijk gesprek",
      duration: "1 dag",
    },
    {
      title: "Design & Concept",
      description: "Wij maken een visueel ontwerp en wireframes voor uw goedkeuring",
      duration: "3-5 dagen",
    },
    {
      title: "Development",
      description: "Onze developers bouwen uw website met de nieuwste technologieën",
      duration: "1-2 weken",
    },
    {
      title: "Testing & Feedback",
      description: "Uitgebreid testen en uw feedback verwerken voor de perfecte website",
      duration: "2-3 dagen",
    },
    {
      title: "Launch & Nazorg",
      description: "Live zetten van uw website en ondersteuning bij de eerste stappen",
      duration: "1 dag",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Onze Werkwijze</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Van eerste gesprek tot succesvolle launch - zo werken wij
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start">
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10"></div>

              {/* Mobile dot */}
              <div className="md:hidden flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>

              {/* Content */}
              <div className="md:ml-16 flex-1">
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-montserrat font-bold text-xl text-foreground">{step.title}</h3>
                    <span className="text-sm text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
