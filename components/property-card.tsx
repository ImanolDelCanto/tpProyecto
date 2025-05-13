import { Heart, Star } from "lucide-react"
import Image from "next/image"

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
  id,
  title,
  location,
  price,
  currency,
  rating,
  reviews,
  images,
  host,
  dates,
  badge,
}: PropertyCardProps) {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <button className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/60 flex items-center justify-center">
          <Heart className="h-4 w-4" />
          <span className="sr-only">Añadir a favoritos</span>
        </button>
        {badge && (
          <span className="absolute left-3 top-3 z-10 bg-white/80 text-black text-xs font-semibold px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
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
        <p className="text-sm text-gray-500">{dates}</p>
        <p className="text-base font-semibold mt-1">
          {currency} {price} <span className="font-normal">noche</span>
        </p>
      </div>
    </div>
  )
}
