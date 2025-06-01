"use client"

import { CheckCircle, Calendar, Users, CreditCard, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface BookingSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  property: any
}

export function BookingSuccessModal({ isOpen, onClose, property }: BookingSuccessModalProps) {
  if (!property) return null

  const paymentMethodLabels = {
    tarjeta: "Tarjeta de crédito/débito",
    efectivo: "Efectivo",
    transferencia: "Transferencia bancaria",
  }

  const currencyLabels = {
    ARS: "Pesos Argentinos",
    USD: "Dólares",
    EUR: "Euros",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-xl font-semibold text-green-800">¡Reserva Exitosa!</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-900">{property.title}</h4>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              {property.location}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              {property.guests} {property.guests === 1 ? "huésped" : "huéspedes"}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              {paymentMethodLabels[property.paymentMethod as keyof typeof paymentMethodLabels]}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Moneda:</span>
              {currencyLabels[property.currency as keyof typeof currencyLabels]}
            </div>

            {property.dates?.checkIn && property.dates?.checkOut && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                {new Date(property.dates.checkIn).toLocaleDateString()} -{" "}
                {new Date(property.dates.checkOut).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Recibirás un email de confirmación con todos los detalles de tu reserva.
            </p>

            <Button onClick={onClose} className="w-full bg-rose-500 hover:bg-rose-600">
              Continuar explorando
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
