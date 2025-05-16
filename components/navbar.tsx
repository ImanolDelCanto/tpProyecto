import { Home, Menu, User, Plus } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
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
            <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow w-96">
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="border-none outline-none flex-grow text-sm bg-transparent"
              />
              <button className="bg-rose-500 rounded-full p-2 ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/publicar">
              <Button className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Publicar propiedad</span>
                <span className="sm:hidden">Publicar</span>
              </Button>
            </Link>

            <div className="flex items-center border border-gray-300 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow">
              <Menu className="h-5 w-5 text-gray-600" />
              <div className="ml-2 bg-gray-500 rounded-full h-8 w-8 flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
