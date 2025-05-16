"use client"

import { useState } from "react"
import { Calendar, User, X } from "lucide-react"
import { format } from "date-fns"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  propertyId: string
  propertyTitle: string
  price: number
  currency: string
}

export function BookingModal({ isOpen, onClose, propertyId, propertyTitle, price, currency }: BookingModalProps) {
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date(new Date().setDate(new Date().getDate() + 2)))
  const [guests, setGuests] = useState(1)

  if (!isOpen) return null

  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  const totalPrice = price * nights

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reservar alojamiento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          <h3 className="font-medium mb-2">{propertyTitle}</h3>

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

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>
                {currency} {price} x {nights} noches
              </span>
              <span>
                {currency} {totalPrice}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tarifa de servicio</span>
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

          <button className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600">
            Reservar
          </button>

          <p className="text-center text-xs text-gray-500 mt-4">No se te cobrará ningún cargo por el momento</p>
        </div>
      </div>
    </div>
  )
}
