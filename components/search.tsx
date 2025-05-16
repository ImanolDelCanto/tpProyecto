"use client"

import type React from "react"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para buscar propiedades
    console.log("Buscando:", searchTerm)
  }

  return (
    <div className="w-full max-w-3xl mx-auto sm:hidden">
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 shadow-sm focus:border-brand-600 focus:ring-brand-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  )
}
