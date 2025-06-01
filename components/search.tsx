"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchProps {
  onSearch: (location: string) => void
}

export function Search({ onSearch }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const locations = [
    "Palermo, Buenos Aires",
    "Puerto Madero, Buenos Aires",
    "San Telmo, Buenos Aires",
    "Recoleta, Buenos Aires",
    "Belgrano, Buenos Aires",
    "Caballito, Buenos Aires",
    "Núñez, Buenos Aires",
    "Villa Crespo, Buenos Aires",
    "Barracas, Buenos Aires",
    "La Boca, Buenos Aires",
  ]

  const handleInputChange = (value: string) => {
    setSearchTerm(value)
    if (value.length > 0) {
      const filtered = locations.filter((location) => location.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (location: string) => {
    setSearchTerm(location)
    onSearch(location)
    setShowSuggestions(false)
  }

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
          value={searchTerm}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
        />
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          {suggestions.map((location, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 border-b border-gray-100 last:border-b-0"
              onClick={() => handleSuggestionClick(location)}
            >
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{location}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
