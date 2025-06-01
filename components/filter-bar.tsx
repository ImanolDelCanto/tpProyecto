"use client"
import { Sliders, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FilterBarProps {
  onPriceFilter: (filter: "asc" | "desc" | null) => void
  onCategoryFilter: (category: string | null) => void
  currentPriceFilter: "asc" | "desc" | null
  currentCategory: string | null
}

export function FilterBar({ onPriceFilter, onCategoryFilter, currentPriceFilter, currentCategory }: FilterBarProps) {

  const handleCategoryClick = (categoryName: string) => {
    if (currentCategory === categoryName) {
      onCategoryFilter(null)
    } else {
      onCategoryFilter(categoryName)
    }
  }

  return (
    <div className="flex items-center space-x-4 mt-4 overflow-x-auto pb-4">

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={`flex items-center rounded-full border px-4 py-2 text-sm whitespace-nowrap ${
              currentPriceFilter ? "border-rose-500 bg-rose-50 text-rose-700" : "border-gray-300"
            }`}
          >
            <Sliders className="h-4 w-4 mr-2" />
            Precio
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => onPriceFilter("asc")}>Precio: menor a mayor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPriceFilter("desc")}>Precio: mayor a menor</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onPriceFilter(null)}>Limpiar filtro</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
