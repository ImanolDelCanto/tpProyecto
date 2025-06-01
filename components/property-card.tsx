"use client"

import { useState } from "react"
import {  Star, Users } from "lucide-react"
import Image from "next/image"
import { DatePicker } from "./date-picker"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  currency: string
  rating: number
  reviews: number
  images: string[]
  host: string
  dates: string
  badge?: string
  onBookingSuccess?: (property: any, bookingDetails: any) => void
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  currency,
  rating,
  host,
  onBookingSuccess,
}: PropertyCardProps) {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [guests, setGuests] = useState("1")
  const [selectedCurrency, setSelectedCurrency] = useState(currency) // Usar la moneda original de la propiedad
  const [paymentMethod, setPaymentMethod] = useState("tarjeta")
  const [dates, setDates] = useState<{ checkIn: Date | null; checkOut: Date | null }>({ checkIn: null, checkOut: null })

  const currencies = [
    { value: "ARS", label: "$ Pesos Argentinos", symbol: "$" },
    { value: "USD", label: "$ Dólares", symbol: "US$" },
    { value: "EUR", label: "€ Euros", symbol: "€" },
  ]

  const paymentMethods = [
    { value: "tarjeta", label: "Tarjeta de crédito/débito", icon: "💳" },
    { value: "efectivo", label: "Efectivo", icon: "💵" },
    { value: "transferencia", label: "Transferencia bancaria", icon: "🏦" },
  ]

  const convertPrice = (basePrice: number, fromCurrency: string, toCurrency: string) => {
    // Tasas de conversión (valores aproximados)
    const rates = {
      USD: { USD: 1, EUR: 0.91, ARS: 1000 },
      EUR: { USD: 1.1, EUR: 1, ARS: 1100 },
      ARS: { USD: 0.001, EUR: 0.0009, ARS: 1 },
    }

    const rate = rates[fromCurrency as keyof typeof rates]?.[toCurrency as keyof typeof rates.USD] || 1
    return Math.round(basePrice * rate)
  }

  const handleBooking = () => {
    const bookingDetails = {
      guests: Number.parseInt(guests),
      currency: selectedCurrency,
      paymentMethod,
      dates,
      totalPrice: convertPrice(price, currency, selectedCurrency),
      originalPrice: price,
      originalCurrency: currency,
    }

    if (onBookingSuccess) {
      onBookingSuccess({ id, title, location, host }, bookingDetails)
    }
    setIsBookingOpen(false)
  }

  const currentCurrency = currencies.find((c) => c.value === selectedCurrency)
  const displayPrice = convertPrice(price, currency, selectedCurrency)
  const originalCurrency = currencies.find((c) => c.value === currency)

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <div className="relative h-full w-full">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        {currency !== "ARS" && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {currency}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex justify-between">
          <h3 className="font-medium text-base text-gray-900 line-clamp-1">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{host}</p>

        {/* Selector de fechas */}
        <div className="mt-2">
          <DatePicker compact onDateChange={(newDates) => setDates(newDates)} />
        </div>

        {/* Selector de huéspedes */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-400" />
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
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

        {/* Selector de moneda */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Ver en:</span>
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  {curr.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-base font-semibold">
              {currentCurrency?.symbol} {displayPrice.toLocaleString()} <span className="font-normal">noche</span>
            </p>
            {selectedCurrency !== currency && (
              <p className="text-xs text-gray-500">
                Original: {originalCurrency?.symbol} {price.toLocaleString()}
              </p>
            )}
          </div>

          <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white">
                Reservar
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Confirmar reserva</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">{title}</h4>
                  <p className="text-sm text-gray-500">{location}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Método de pago</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                    {paymentMethods.map((method) => (
                      <div key={method.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={method.value} id={method.value} />
                        <Label htmlFor={method.value} className="flex items-center gap-2 cursor-pointer">
                          <span>{method.icon}</span>
                          {method.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total:</span>
                    <span className="font-semibold text-lg">
                      {currentCurrency?.symbol} {displayPrice.toLocaleString()} x {guests} huésped
                      {Number.parseInt(guests) > 1 ? "es" : ""}
                    </span>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full bg-rose-500 hover:bg-rose-600">
                  Confirmar reserva
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
