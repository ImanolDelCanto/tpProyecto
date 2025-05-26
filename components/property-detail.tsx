"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Share, Heart, User, Calendar } from "lucide-react"
import { format } from "date-fns"

interface PropertyDetailProps {
  id: string
  title: string
  description: string
  location: string
  host: string
  price: number
  currency: string
  rating: number
  reviews: number
  images: string[]
  amenities: string[]
}

export function PropertyDetail({
  id,
  title,
  description,
  location,
  host,
  price,
  currency,
  rating,
  reviews,
  images,
  amenities,
}: PropertyDetailProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 2)))
  const [guests, setGuests] = useState(1)

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  const totalPrice = price * nights

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-current text-rose-500" />
          <span className="ml-1 font-medium">{rating}</span>
          <span className="mx-1">·</span>
          <span className="underline">{reviews} reseñas</span>
          <span className="mx-1">·</span>
          <span>{location}</span>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center text-sm font-medium">
            <Share className="h-4 w-4 mr-1" />
            Compartir
          </button>
          <button className="flex items-center text-sm font-medium">
            <Heart className="h-4 w-4 mr-1" />
            Guardar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="aspect-video rounded-lg overflow-hidden">
          <Image
            src={images[0] || "/placeholder.svg?height=500&width=500"}
            alt={title}
            width={800}
            height={500}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className="aspect-square rounded-lg overflow-hidden">
              <Image
                src={image || `/placeholder.svg?height=300&width=300&text=Imagen+${index + 2}`}
                alt={`${title} - imagen ${index + 2}`}
                width={300}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center pb-4 border-b">
            <div>
              <h2 className="text-xl font-semibold">Alojamiento entero</h2>
              <p className="text-gray-600">Anfitrión: {host}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
          </div>

          <div className="py-6 border-b">
            <p className="text-gray-700">{description}</p>
          </div>

          <div className="py-6 border-b">
            <h3 className="text-lg font-semibold mb-4">Lo que ofrece este lugar</h3>
            <div className="grid grid-cols-2 gap-4">
              {amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <span className="text-lg">{amenity.startsWith("Wi") ? "📶" : "✓"}</span>
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="border border-gray-300 rounded-xl p-6 shadow-lg sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xl font-semibold">
                  {currency} {price}
                </span>{" "}
                <span>noche</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-current text-rose-500" />
                <span className="ml-1">{rating}</span>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="p-3">
                  <label className="block text-xs text-gray-500 mb-1">CHECK-IN</label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="border-none p-0 text-sm focus:ring-0 w-full"
                      value={format(checkIn, "yyyy-MM-dd")}
                      onChange={(e) => setCheckIn(new Date(e.target.value))}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs text-gray-500 mb-1">CHECK-OUT</label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="date"
                      className="border-none p-0 text-sm focus:ring-0 w-full"
                      value={format(checkOut, "yyyy-MM-dd")}
                      onChange={(e) => setCheckOut(new Date(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-300 p-3">
                <label className="block text-xs text-gray-500 mb-1">VIAJEROS</label>
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    className="border-none p-0 text-sm focus:ring-0 w-full"
                    value={guests}
                    onChange={(e) => setGuests(Number.parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "viajero" : "viajeros"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600"
            >
              Reservar
            </button>

            <div className="mt-4">
              <div className="flex justify-between mb-2">
                <span className="underline">
                  {currency} {price} x {nights} noches
                </span>
                <span>
                  {currency} {totalPrice}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="underline">Tarifa de servicio</span>
                <span>
                  {currency} {Math.round(totalPrice * 0.12)}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>
                  {currency} {Math.round(totalPrice * 1.12)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
