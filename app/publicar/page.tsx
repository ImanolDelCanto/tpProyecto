"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, Home, MapPin, DollarSign, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

export default function PublicarPropiedad() {
  const router = useRouter()
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Esta función simula la carga de imágenes
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLoading(true)

      // Simulamos un tiempo de carga
      setTimeout(() => {
        const newImages = Array.from(e.target.files || []).map((file) => URL.createObjectURL(file))
        setImages([...images, ...newImages])
        setLoading(false)
      }, 1000)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos
    // Como es estático, simplemente redirigimos al inicio
    router.push("/")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Publicar tu propiedad</h1>
        <p className="text-gray-600 mt-2">Completa la información para publicar tu propiedad en RentaFácil</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-8">
          {/* Sección de información básica */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Home className="mr-2 h-5 w-5 text-rose-500" />
              Información básica
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-base">
                      Título de la propiedad
                    </Label>
                    <Input id="title" placeholder="Ej: Apartamento moderno en el centro" className="mt-1" required />
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base">
                      Descripción
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu propiedad, sus características y lo que la hace especial..."
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-2 block">Tipo de propiedad</Label>
                    <RadioGroup defaultValue="apartment" className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <Label
                        htmlFor="type-apartment"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-apartment" value="apartment" />
                        Apartamento
                      </Label>
                      <Label
                        htmlFor="type-house"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-house" value="house" />
                        Casa
                      </Label>
                      <Label
                        htmlFor="type-cabin"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-cabin" value="cabin" />
                        Cabaña
                      </Label>
                      <Label
                        htmlFor="type-loft"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-loft" value="loft" />
                        Loft
                      </Label>
                      <Label
                        htmlFor="type-villa"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-villa" value="villa" />
                        Villa
                      </Label>
                      <Label
                        htmlFor="type-other"
                        className="border cursor-pointer rounded-md p-3 flex items-center gap-2 [&:has(:checked)]:bg-rose-50 [&:has(:checked)]:border-rose-500"
                      >
                        <RadioGroupItem id="type-other" value="other" />
                        Otro
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sección de ubicación */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-rose-500" />
              Ubicación
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-base">
                      Dirección
                    </Label>
                    <Input id="address" placeholder="Calle, número, piso, etc." className="mt-1" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-base">
                        Ciudad
                      </Label>
                      <Input id="city" placeholder="Ej: Buenos Aires" className="mt-1" required />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-base">
                        Estado/Provincia
                      </Label>
                      <Input id="state" placeholder="Ej: CABA" className="mt-1" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country" className="text-base">
                        País
                      </Label>
                      <Select defaultValue="argentina">
                        <SelectTrigger id="country" className="mt-1">
                          <SelectValue placeholder="Selecciona un país" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="argentina">Argentina</SelectItem>
                          <SelectItem value="chile">Chile</SelectItem>
                          <SelectItem value="uruguay">Uruguay</SelectItem>
                          <SelectItem value="brasil">Brasil</SelectItem>
                          <SelectItem value="colombia">Colombia</SelectItem>
                          <SelectItem value="mexico">México</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipcode" className="text-base">
                        Código Postal
                      </Label>
                      <Input id="zipcode" placeholder="Ej: 1425" className="mt-1" required />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sección de fotos */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Camera className="mr-2 h-5 w-5 text-rose-500" />
              Fotos
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">Sube fotos de tu propiedad (mínimo 5 fotos recomendadas)</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Propiedad ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                          >
                            <X className="h-4 w-4 text-gray-700" />
                          </button>
                        </div>
                      ))}

                      <label className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center aspect-square cursor-pointer hover:bg-gray-50">
                        <div className="flex flex-col items-center justify-center p-4">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">Subir foto</span>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} multiple />
                      </label>
                    </div>

                    {loading && <div className="mt-2 text-sm text-gray-500">Cargando imágenes...</div>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sección de precios */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-rose-500" />
              Precios
            </h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-base">
                        Precio por noche
                      </Label>
                      <div className="relative mt-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input id="price" type="number" placeholder="0" className="pl-7" min="0" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="currency" className="text-base">
                        Moneda
                      </Label>
                      <Select defaultValue="usd">
                        <SelectTrigger id="currency" className="mt-1">
                          <SelectValue placeholder="Selecciona una moneda" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD - Dólar estadounidense</SelectItem>
                          <SelectItem value="ars">ARS - Peso argentino</SelectItem>
                          <SelectItem value="eur">EUR - Euro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cleaning_fee" className="text-base">
                      Tarifa de limpieza (opcional)
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <Input id="cleaning_fee" type="number" placeholder="0" className="pl-7" min="0" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/")}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white">
              Publicar propiedad
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
