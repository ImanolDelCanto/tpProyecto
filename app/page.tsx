"use client"

import { useState } from "react"
import { PropertyGrid } from "@/components/property-grid"
import { Navbar } from "@/components/navbar"
import { FilterBar } from "@/components/filter-bar"
import { Search } from "@/components/search"

export default function Home() {
  const [searchLocation, setSearchLocation] = useState("")
  const [priceFilter, setPriceFilter] = useState<"asc" | "desc" | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleSearch = (location: string) => {
    setSearchLocation(location)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="py-4 sm:hidden">
          <Search onSearch={handleSearch} />
        </div>
        <FilterBar
          onPriceFilter={setPriceFilter}
          onCategoryFilter={setSelectedCategory}
          currentPriceFilter={priceFilter}
          currentCategory={selectedCategory}
        />
        <div className="mt-6">
          <PropertyGrid searchLocation={searchLocation} priceFilter={priceFilter} categoryFilter={selectedCategory} />
        </div>
      </main>
    </div>
  )
}
