import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

export function Search() {
  return (
    <div className="w-full max-w-3xl mx-auto sm:hidden">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="¿A dónde quieres ir?"
          className="pl-10 pr-4 py-2 rounded-full border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
        />
      </div>
    </div>
  )
}
