import { PropertyGrid } from "@/components/property-grid"
import { Navbar } from "@/components/navbar"
import { FilterBar } from "@/components/filter-bar"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mt-6">
          <PropertyGrid />
        </div>
      </main>
      <footer className="border-t border-gray-200 py-8">
       
      </footer>
    </div>
  )
}
