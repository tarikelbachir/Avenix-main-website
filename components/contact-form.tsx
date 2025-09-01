"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Building } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    naam: "",
    bedrijfsnaam: "",
    email: "",
    telefoon: "",
    website: "",
    budget: "",
    projectType: "",
    bericht: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold text-2xl">Vraag Een Offerte Aan</CardTitle>
            <p className="text-muted-foreground">
              Vertel ons over uw project en ontvang binnen 24 uur een persoonlijke offerte.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="naam">
                    Naam <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="naam"
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => handleInputChange("naam", e.target.value)}
                    placeholder="Uw volledige naam"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrijfsnaam">Bedrijfsnaam</Label>
                  <Input
                    id="bedrijfsnaam"
                    type="text"
                    value={formData.bedrijfsnaam}
                    onChange={(e) => handleInputChange("bedrijfsnaam", e.target.value)}
                    placeholder="Naam van uw bedrijf"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="uw@email.nl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefoon">Telefoon</Label>
                  <Input
                    id="telefoon"
                    type="tel"
                    value={formData.telefoon}
                    onChange={(e) => handleInputChange("telefoon", e.target.value)}
                    placeholder="+31 6 12 34 56 78"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Huidige Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  placeholder="https://uwwebsite.nl (optioneel)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer uw budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="less_than_2000">&lt; €2.000</SelectItem>
                      <SelectItem value="2000_to_5000">€2.000 - €5.000</SelectItem>
                      <SelectItem value="5000_to_10000">€5.000 - €10.000</SelectItem>
                      <SelectItem value="more_than_10000">€10.000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Project Type</Label>
                  <Select
                    value={formData.projectType}
                    onValueChange={(value) => handleInputChange("projectType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nieuwe-website">Nieuwe website</SelectItem>
                      <SelectItem value="redesign">Redesign</SelectItem>
                      <SelectItem value="e-commerce">E-commerce</SelectItem>
                      <SelectItem value="anders">Anders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bericht">Bericht/Vraag</Label>
                <Textarea
                  id="bericht"
                  rows={4}
                  value={formData.bericht}
                  onChange={(e) => handleInputChange("bericht", e.target.value)}
                  placeholder="Vertel ons meer over uw project, wensen en doelen..."
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                Verstuur Aanvraag
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-8">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="font-montserrat font-bold text-2xl">Contact Informatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-muted-foreground">info@avenixsoftware.nl</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Telefoon</p>
                  <p className="text-muted-foreground">+31 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Adres</p>
                  <p className="text-muted-foreground">Nederland</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">KvK Nummer</p>
                  <p className="text-muted-foreground">12345678</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-r from-primary/5 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Response Tijd</p>
                  <p className="text-muted-foreground">We reageren binnen 24 uur op werkdagen</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Heeft u haast? Bel ons direct voor een snelle reactie en persoonlijk advies.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="font-montserrat font-bold text-lg mb-4">Werkdagen & Tijden</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Maandag - Vrijdag</span>
                  <span className="text-muted-foreground">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zaterdag</span>
                  <span className="text-muted-foreground">10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag</span>
                  <span className="text-muted-foreground">Gesloten</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
