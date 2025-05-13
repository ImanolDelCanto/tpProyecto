import { PropertyGrid } from "@/components/property-grid"
import { Navbar } from "@/components/navbar"
import { FilterBar } from "@/components/filter-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mt-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">211 propiedades en Buenos Aires</h1>
          <PropertyGrid />
        </div>
      </main>
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-500">© 2024 RentaFácil, Inc.</p>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Privacidad
              </a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-sm text-gray-500 hover:underline">
                Términos
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-sm text-gray-500 hover:underline flex items-center">
                <span>Español (AR)</span>
              </button>
              <button className="text-sm text-gray-500 hover:underline flex items-center">
                <span>$ USD</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
