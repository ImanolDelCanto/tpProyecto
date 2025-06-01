"use client"

import { useState, useMemo } from "react"
import { PropertyCard } from "@/components/property-card"
import { BookingSuccessModal } from "@/components/booking-success-modal"

interface PropertyGridProps {
  searchLocation?: string
  priceFilter?: "asc" | "desc" | null
  categoryFilter?: string | null
}

export function PropertyGrid({ searchLocation, priceFilter, categoryFilter }: PropertyGridProps) {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [bookedProperty, setBookedProperty] = useState<any>(null)

  const properties = [
    {
      id: "1",
      title: "Apartamento moderno en Palermo",
      location: "Palermo, Buenos Aires",
      price: 75,
      currency: "USD",
      rating: 4.92,
      reviews: 128,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: María",
      dates: "24-29 may.",
      badge: "Popular",
      category: "Apartamentos",
    },
    {
      id: "2",
      title: "Loft con vista en Puerto Madero",
      location: "Puerto Madero, Buenos Aires",
      price: 120,
      currency: "EUR",
      rating: 4.85,
      reviews: 95,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Carlos",
      dates: "1-6 jun.",
      badge: "Destacado",
      category: "Lujo",
    },
    {
      id: "3",
      title: "Casa histórica en San Telmo",
      location: "San Telmo, Buenos Aires",
      price: 95000,
      currency: "ARS",
      rating: 4.78,
      reviews: 112,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Laura",
      dates: "10-15 jun.",
      badge: "Popular",
      category: "Histórico",
    },
    {
      id: "4",
      title: "Estudio acogedor en Recoleta",
      location: "Recoleta, Buenos Aires",
      price: 65,
      currency: "USD",
      rating: 4.9,
      reviews: 87,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Martín",
      dates: "5-10 jul.",
      category: "Apartamentos",
    },
    {
      id: "5",
      title: "Penthouse de lujo con terraza",
      location: "Belgrano, Buenos Aires",
      price: 150,
      currency: "EUR",
      rating: 4.96,
      reviews: 64,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Sofía",
      dates: "15-20 jul.",
      badge: "Lujo",
      category: "Lujo", 
    },
    {
      id: "6",
      title: "Apartamento familiar en Caballito",
      location: "Caballito, Buenos Aires",
      price: 85000,
      currency: "ARS",
      rating: 4.82,
      reviews: 73,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Diego",
      dates: "1-6 ago.",
      category: "Apartamentos",
    },
    {
      id: "7",
      title: "Casa con jardín en Núñez",
      location: "Núñez, Buenos Aires",
      price: 110,
      currency: "USD",
      rating: 4.88,
      reviews: 59,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Ana",
      dates: "10-15 ago.",
      badge: "Popular",
      category: "Casas",
    },
    {
      id: "8",
      title: "Loft artístico en Villa Crespo",
      location: "Villa Crespo, Buenos Aires",
      price: 70000,
      currency: "ARS",
      rating: 4.75,
      reviews: 92,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Pablo",
      dates: "20-25 ago.",
      category: "Diseño",
    },
    {
      id: "9",
      title: "Departamento en Barracas",
      location: "Barracas, Buenos Aires",
      price: 90,
      currency: "EUR",
      rating: 4.65,
      reviews: 45,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Carmen",
      dates: "1-5 sep.",
      category: "Apartamentos",
    },
    {
      id: "10",
      title: "Casa moderna en La Boca",
      location: "La Boca, Buenos Aires",
      price: 80,
      currency: "USD",
      rating: 4.71,
      reviews: 67,
      images: ["/maqueta.jpg"],
      host: "Anfitrión: Roberto",
      dates: "10-15 sep.",
      category: "Casas",
    },
  ]

  const filteredProperties = useMemo(() => {
    let filtered = [...properties]

    // Filtrar por ubicación (búsqueda)
    if (searchLocation && searchLocation.trim()) {
      const searchTerm = searchLocation.toLowerCase().trim()
      filtered = filtered.filter(
        (property) =>
          property.location.toLowerCase().includes(searchTerm) ||
          property.title.toLowerCase().includes(searchTerm) ||
          property.host.toLowerCase().includes(searchTerm),
      )
    }

    // Filtrar por categoría
    if (categoryFilter) {
      filtered = filtered.filter((property) => property.category === categoryFilter)
    }

    // Ordenar por precio (convertir todo a USD para comparar)
    if (priceFilter) {
      filtered.sort((a, b) => {
        const priceA = convertToUSD(a.price, a.currency)
        const priceB = convertToUSD(b.price, b.currency)

        if (priceFilter === "asc") {
          return priceA - priceB
        } else {
          return priceB - priceA
        }
      })
    }

    return filtered
  }, [searchLocation, priceFilter, categoryFilter])

  // Función para convertir precios a USD para comparación
  const convertToUSD = (price: number, currency: string) => {
    const rates = {
      USD: 1,
      EUR: 1.1, // 1 EUR = 1.1 USD aproximadamente
      ARS: 0.001, // 1000 ARS = 1 USD aproximadamente
    }
    return price * rates[currency as keyof typeof rates]
  }

  const handleBookingSuccess = (property: any, bookingDetails: any) => {
    setBookedProperty({ ...property, ...bookingDetails })
    setShowSuccessModal(true)
  }

  return (
    <>
      {searchLocation && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <span className="font-medium">Buscando en:</span> "{searchLocation}"
            {filteredProperties.length > 0 && (
              <span className="ml-2">
                ({filteredProperties.length} {filteredProperties.length === 1 ? "resultado" : "resultados"})
              </span>
            )}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} {...property} onBookingSuccess={handleBookingSuccess} />
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchLocation
              ? `No se encontraron propiedades en "${searchLocation}"`
              : "No se encontraron propiedades que coincidan con tu búsqueda."}
          </p>
          <p className="text-gray-400 text-sm mt-2">Intenta con otros filtros o ubicaciones.</p>
        </div>
      )}

      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        property={bookedProperty}
      />
    </>
  )
}
