import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function AvenixTestimonials() {
  const testimonials = [
    {
      name: "Mark van der Berg",
      company: "Garage Van Der Berg",
      content:
        "Avenix heeft onze website volledig getransformeerd. Meer klanten, betere vindbaarheid en een professionele uitstraling.",
      rating: 5,
      avatar: "/professional-man-avatar.png",
    },
    {
      name: "Lisa Jansen",
      company: "Accountantskantoor Jansen",
      content:
        "Snelle levering, uitstekende communicatie en een website die perfect aansluit bij onze bedrijfsvoering.",
      rating: 5,
      avatar: "/professional-woman-avatar.png",
    },
    {
      name: "Roberto Silva",
      company: "Restaurant Bella Vista",
      content: "Het reserveringssysteem werkt perfect en onze online bestellingen zijn met 200% gestegen!",
      rating: 5,
      avatar: "/chef-restaurant-owner-avatar.png",
    },
  ]

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">Wat Onze Klanten Zeggen</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Ontdek waarom bedrijven kiezen voor Avenix Software
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
