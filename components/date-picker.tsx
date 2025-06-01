"use client"

import { useState } from "react"
import { Calendar, ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  onDateChange?: (dates: { checkIn: Date | null; checkOut: Date | null }) => void
  className?: string
  compact?: boolean
}

export function DatePicker({ onDateChange, className, compact = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [checkIn, setCheckIn] = useState<Date | null>(new Date())
  const [checkOut, setCheckOut] = useState<Date | null>(new Date(new Date().setDate(new Date().getDate() + 2)))

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Seleccionar"
    return format(date, "d/MM/yyyy", { locale: es })
  }

  const handleDateChange = (type: "checkIn" | "checkOut", date: Date | null) => {
    if (type === "checkIn") {
      setCheckIn(date)
      if (onDateChange) onDateChange({ checkIn: date, checkOut })
    } else {
      setCheckOut(date)
      if (onDateChange) onDateChange({ checkIn, checkOut: date })
    }
  }

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={handleToggle}
        className={cn(
          "flex items-center justify-between w-full border border-gray-300 rounded-lg bg-white",
          compact ? "px-2 py-1 text-xs" : "px-4 py-2",
        )}
      >
        <div className="flex items-center">
          <Calendar className={cn("text-gray-500", compact ? "h-3 w-3 mr-1" : "h-4 w-4 mr-2")} />
          <span className={cn("text-gray-700", compact ? "text-xs" : "text-sm")}>
            {formatDate(checkIn)} - {formatDate(checkOut)}
          </span>
        </div>
        <ChevronDown className={cn("text-gray-500", compact ? "h-3 w-3" : "h-4 w-4")} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-72">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null
                handleDateChange("checkIn", date)
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
              onChange={(e) => {
                const date = e.target.value ? new Date(e.target.value) : null
                handleDateChange("checkOut", date)
              }}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="text-sm text-gray-600 hover:underline"
              onClick={() => {
                setCheckIn(null)
                setCheckOut(null)
                if (onDateChange) onDateChange({ checkIn: null, checkOut: null })
              }}
            >
              Limpiar
            </button>
            <button
              className="bg-rose-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-rose-600"
              onClick={() => {
                setIsOpen(false)
                if (onDateChange) onDateChange({ checkIn, checkOut })
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
