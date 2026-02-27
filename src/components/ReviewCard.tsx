/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Star, Quote } from 'lucide-react'

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
    <div className="relative group h-full">
      {/* Chat Bubble */}
      <div className="glass-card bg-white/70 dark:bg-card/70 p-8 rounded-[2rem] rounded-bl-none border border-white/40 dark:border-white/10 relative z-10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10 h-full flex flex-col">
        <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? 'text-secondary fill-secondary' : 'text-muted'}`}
            />
          ))}
        </div>
        <p className="text-foreground/80 font-medium leading-relaxed mb-4 flex-grow text-sm md:text-base">
          "{text}"
        </p>
      </div>

      {/* Triangle for bubble effect */}
      <div className="absolute left-0 bottom-[4rem] w-8 h-8 bg-white/70 dark:bg-card/70 border-b border-l border-white/40 dark:border-white/10 transform -rotate-45 translate-y-full z-0 backdrop-blur-2xl"></div>

      {/* User Info */}
      <div className="flex items-center gap-4 mt-8 ml-4">
        <img
          src={image}
          alt={name}
          className="w-14 h-14 rounded-full object-cover border-[3px] border-background shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <div>
          <h4 className="font-bold text-foreground text-lg">{name}</h4>
          <p className="text-xs font-bold text-primary uppercase tracking-wider">
            {location}
          </p>
        </div>
      </div>
    </div>
  )
}
