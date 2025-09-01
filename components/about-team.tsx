import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"

export function AboutTeam() {
  const teamMembers = [
    {
      name: "Alex van der Berg",
      role: "Founder & Lead Developer",
      bio: "Full-stack developer met 8+ jaar ervaring in moderne webtechnologieën. Gespecialiseerd in React, Next.js en performance optimalisatie.",
      image: "/team-alex-founder.png",
      linkedin: "#",
      email: "alex@avenixsoftware.nl",
    },
    {
      name: "Sarah Jansen",
      role: "UI/UX Designer",
      bio: "Creatieve designer die gebruiksvriendelijke interfaces ontwerpt die conversie stimuleren. Expert in user research en design systems.",
      image: "/team-sarah-designer.png",
      linkedin: "#",
      email: "sarah@avenixsoftware.nl",
    },
    {
      name: "Mike de Vries",
      role: "Backend Developer",
      bio: "Specialist in API development, database optimalisatie en cloud infrastructuur. Zorgt ervoor dat alles soepel draait achter de schermen.",
      image: "/team-mike-backend.png",
      linkedin: "#",
      email: "mike@avenixsoftware.nl",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Ons Team</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Maak kennis met de experts die uw digitale ambities waarmaken
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-montserrat font-bold text-xl mb-1">{member.name}</h3>
                <p className="text-white/90 text-sm">{member.role}</p>
              </div>
            </div>

            <CardContent className="p-6">
              <p className="text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

              <div className="flex space-x-3">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Company Stats */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Tevreden Klanten</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Projecten Voltooid</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Jaar Ervaring</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
