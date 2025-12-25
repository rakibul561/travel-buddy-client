/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Star } from 'lucide-react'
interface ReviewCardProps {
  name: string
  location: string
  image: string
  text: string
  rating: number
}
export function ReviewCard({
  name,
  location,
  image,
  text,
  rating,
}: ReviewCardProps) {
  return (
    <div className="relative group">
      {/* Chat Bubble */}
      <div className="bg-white p-8 rounded-3xl rounded-bl-none shadow-sm border border-gray-100 relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-warm">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < rating ? 'text-sunny fill-sunny' : 'text-gray-200'}`}
            />
          ))}
        </div>
        <p className="text-gray-600 font-medium leading-relaxed mb-4">
          "{text}"
        </p>
      </div>

      {/* Triangle for bubble effect */}
      <div className="absolute left-0 bottom-[50px] w-6 h-6 bg-white border-b border-l border-gray-100 transform -rotate-45 translate-y-full z-0"></div>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-6 ml-2">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-xs font-bold text-gray-400 uppercase">
            {location}
          </p>
        </div>
      </div>
    </div>
  )
}
