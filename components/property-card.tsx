import { Heart, Star } from "lucide-react"
import Image from "next/image"
import { DatePicker } from "./date-picker"

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
}

export function PropertyCard({
  title,
  location,
  price,
  currency,
  rating,
  host,
}: PropertyCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <div className="relative h-full w-full">
          <Image
            src={"/maqueta.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between">
          <h3 className="font-medium text-base text-gray-900">{title}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm">{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{host}</p>

        {/* Selector de fechas */}
        <div className="mt-2">
          <DatePicker compact />
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-base font-semibold">
            {currency} {price} <span className="font-normal">noche</span>
          </p>
          <button className="text-xs bg-rose-500 text-white px-3 py-1 rounded-lg hover:bg-rose-600">Reservar</button>
        </div>
      </div>
    </div>
  )
}
