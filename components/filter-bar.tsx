import { Sliders } from "lucide-react"

export function FilterBar() {
  const filters = [
    { name: "Apartamentos", icon: "🏢" },
    { name: "Casas", icon: "🏠" },
    { name: "Cabañas", icon: "🌲" },
    { name: "Frente al mar", icon: "🌊" },
    { name: "Piscina", icon: "🏊" },
    { name: "Lujo", icon: "✨" },
    { name: "Diseño", icon: "🎨" },
    { name: "Tropical", icon: "🌴" },
    { name: "Campo", icon: "🌾" },
    { name: "Mansiones", icon: "🏰" },
    { name: "Histórico", icon: "🏛️" },
  ]

  return (
    <div className="flex items-center space-x-4 mt-4 overflow-x-auto pb-4">
      {filters.map((filter) => (
        <button
          key={filter.name}
          className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm whitespace-nowrap"
        >
          <span className="mr-2">{filter.icon}</span>
          {filter.name}
        </button>
      ))}
      <button className="flex items-center rounded-full border border-gray-300 px-4 py-2 text-sm whitespace-nowrap">
        <Sliders className="h-4 w-4 mr-2" />
        Filtros
      </button>
    </div>
  )
}
