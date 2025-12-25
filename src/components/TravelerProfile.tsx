/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { MessageCircle } from 'lucide-react'
interface TravelerProfileProps {
  name: string
  role: string
  bio: string
  image: string
  interests: string[]
  color: 'sunny' | 'coral' | 'fresh-green' | 'sky-blue'
}
export function TravelerProfile({
name,role, bio,image,interests, color,}: TravelerProfileProps) {
  const borderColors = {
    sunny: 'border-sunny',
    coral: 'border-coral',
    'fresh-green': 'border-fresh-green',
    'sky-blue': 'border-sky-blue',
  }
  const bgColors = {
    sunny: 'bg-yellow-50',
    coral: 'bg-red-50',
    'fresh-green': 'bg-green-50',
    'sky-blue': 'bg-blue-50',
  }
  return (
    <div
      className={`flex flex-col items-center text-center p-6 rounded-3xl ${bgColors[color]} transition-transform duration-300 hover:scale-105`}
    >
      <div className="relative mb-4 group">
        <div
          className={`w-32 h-32 rounded-full border-4 ${borderColors[color]} p-1 bg-white overflow-hidden`}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-coral hover:text-white transition-colors duration-300">
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>

      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
      <p className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
        {role}
      </p>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed px-2">"{bio}"</p>

      <div className="flex flex-wrap justify-center gap-2">
        {interests.map((interest) => (
          <span
            key={interest}
            className="px-3 py-1 bg-white rounded-full text-xs font-bold text-gray-500 shadow-sm"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  )
}
