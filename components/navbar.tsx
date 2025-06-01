"use client"

import type React from "react"

import { useState } from "react"
import { Home, Plus, SearchIcon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onSearch?: (location: string) => void
}

export function Navbar({ onSearch }: NavbarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm.trim())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    // Búsqueda en tiempo real
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Home className="h-8 w-auto text-rose-500" />
              <span className="ml-2 text-xl font-bold text-rose-500">RentaFácil</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow w-96"
            >
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="border-none outline-none flex-grow text-sm bg-transparent"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <button type="submit" className="bg-rose-500 rounded-full p-2 ml-2">
                <SearchIcon className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/publicar">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Publicar propiedad</span>
                <span className="sm:hidden">Publicar</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
