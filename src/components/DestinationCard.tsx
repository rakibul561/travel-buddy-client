import React from 'react'
import { MapPin, Heart } from 'lucide-react'
interface DestinationCardProps {
  title: string
  location: string
  image: string
  price: string
  tags: string[]
  color: 'sunny' | 'coral' | 'fresh-green' | 'sky-blue'
}
export function DestinationCard({
  title,
  location,
  image,
  price,
  tags,
  color,
}: DestinationCardProps) {
  const colorClasses = {
    sunny: 'bg-sunny text-yellow-900',
    coral: 'bg-coral text-white',
    'fresh-green': 'bg-fresh-green text-white',
    'sky-blue': 'bg-sky-blue text-white',
  }
  const tagColorClasses = {
    sunny: 'bg-yellow-100 text-yellow-800',
    coral: 'bg-red-100 text-red-800',
    'fresh-green': 'bg-green-100 text-green-800',
    'sky-blue': 'bg-blue-100 text-blue-800',
  }
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-warm-hover transition-all duration-300 hover:-translate-y-2">
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-coral hover:bg-coral hover:text-white transition-all duration-300 shadow-sm group-hover:scale-110">
          <Heart className="w-5 h-5 fill-current" />
        </button>

        <div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${colorClasses[color]}`}
        >
          Popular
        </div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/95 backdrop-blur-md rounded-t-3xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <div className="flex items-center text-gray-500 text-sm font-semibold">
              <MapPin className="w-4 h-4 mr-1 text-coral" />
              {location}
            </div>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-extrabold text-gray-800">
              {price}
            </span>
            <span className="text-xs text-gray-400 font-bold">/ person</span>
          </div>
        </div>

        <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-bold px-3 py-1 rounded-full ${tagColorClasses[color]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
