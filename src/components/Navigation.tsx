"use client"

import React, { useState } from 'react'
import { Menu, User, Heart } from 'lucide-react'
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-warm px-6 py-3 flex items-center justify-between border border-white/50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-sunny rounded-full flex items-center justify-center text-white font-bold text-xl shadow-sm transform -rotate-6">
            H
          </div>
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Hello<span className="text-coral">Travel</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Destinations', 'Community', 'Stories', 'About'].map((item) => (
            <a
              key={item}
              href="#"
              className="text-gray-600 font-bold hover:text-coral transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-cream text-coral hover:bg-coral hover:text-white transition-all duration-300">
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <button className="bg-sky-blue text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Join Community</span>
          </button>
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-3xl shadow-xl p-6 md:hidden animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="flex flex-col gap-4">
            {['Destinations', 'Community', 'Stories', 'About'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-lg font-bold text-gray-700 py-2 px-4 hover:bg-cream rounded-xl transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
