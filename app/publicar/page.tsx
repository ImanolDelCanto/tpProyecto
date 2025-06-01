"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Home, DollarSign } from "lucide-react"

export default function PublicarPropiedad() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    currency: "ARS",
    paymentMethod: "tarjeta",
    category: "",
    guests: "",
    bedrooms: "",
    bathrooms: "",
    amenities: [] as string[],
  })

  const currencies = [
    { value: "ARS", label: "$ Pesos Argentinos" },
    { value: "USD", label: "$ Dólares" },
    { value: "EUR", label: "€ Euros" },
  ]

  const paymentMethods = [
    { value: "tarjeta", label: "Tarjeta de crédito/débito", icon: "💳" },
    { value: "efectivo", label: "Efectivo", icon: "💵" },
    { value: "transferencia", label: "Transferencia bancaria", icon: "🏦" },
  ]

  const categories = [
    { value: "apartamento", label: "Apartamento" },
    { value: "casa", label: "Casa" },
    { value: "cabaña", label: "Cabaña" },
    { value: "loft", label: "Loft" },
    { value: "estudio", label: "Estudio" },
  ]

  const amenitiesList = [
    "WiFi",
    "Cocina",
    "Aire acondicionado",
    "Calefacción",
    "TV",
    "Lavadora",
    "Secadora",
    "Estacionamiento",
    "Piscina",
    "Gimnasio",
    "Balcón",
    "Jardín",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Propiedad publicada:", formData)
    alert("¡Propiedad publicada exitosamente!")
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        amenities: prev.amenities.filter((a) => a !== amenity),
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Publicar tu propiedad</h1>
          <p className="text-gray-600 mt-2">Completa la información para publicar tu alojamiento</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información básica */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Información básica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título de la propiedad</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Apartamento moderno en el centro"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu propiedad..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Tipo de propiedad</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="Ej: Palermo, Buenos Aires"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="guests">Huéspedes máximo</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, guests: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Huéspedes" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "huésped" : "huéspedes"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bedrooms">Habitaciones</Label>
                  <Select
                    value={formData.bedrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bedrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Habitaciones" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "habitación" : "habitaciones"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="bathrooms">Baños</Label>
                  <Select
                    value={formData.bathrooms}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, bathrooms: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Baños" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "baño" : "baños"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Precio y métodos de pago */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Precio y métodos de cobro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Precio por noche</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                    placeholder="100"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="currency">Moneda</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-base font-medium">Métodos de cobro aceptados</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                  className="mt-3"
                >
                  {paymentMethods.map((method) => (
                    <div key={method.value} className="flex items-center space-x-3">
                      <RadioGroupItem value={method.value} id={method.value} />
                      <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer">
                        <span className="text-lg">{method.icon}</span>
                        {method.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Fotos */}
          <Card>
            <CardHeader>
              <CardTitle>Fotos de la propiedad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Arrastra y suelta tus fotos aquí</p>
                <p className="text-sm text-gray-500">o haz clic para seleccionar archivos</p>
                <Button type="button" variant="outline" className="mt-4">
                  Seleccionar fotos
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" size="lg" className="bg-rose-500 hover:bg-rose-600 px-8">
              Publicar propiedad
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
