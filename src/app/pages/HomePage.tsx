"use client"

import { ReviewCard } from '@/components/ReviewCard'
import { Search, Sparkles } from 'lucide-react'

export function HomePage() {
  return (
    <div className="min-h-screen bg-cream font-sans overflow-x-hidden">


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sunny/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-coral/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-4 h-4 text-sunny fill-sunny" />
            <span className="text-sm font-bold text-gray-600">
              Join 50,000+ happy travelers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-tight tracking-tight">
            Find your next adventure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-coral to-sunny">
              with friends!
            </span>{' '}
            🌍
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            Discover beautiful places and meet fellow travelers who love
            exploring just as much as you do. Your journey starts with hello.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-2 rounded-full shadow-warm max-w-2xl mx-auto flex items-center gap-2 border-4 border-white/50">
            <div className="flex-1 flex items-center px-6 h-14 bg-gray-50 rounded-full hover:bg-white transition-colors group focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-blue/20">
              <Search className="w-5 h-5 text-gray-400 group-focus-within:text-sky-blue transition-colors" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="w-full bg-transparent border-none focus:ring-0 text-gray-700 font-bold placeholder:text-gray-400 ml-3 outline-none"
              />
            </div>
            <button className="h-14 px-8 bg-[#00DC33] text-white rounded-full font-bold transition-all hover:shadow-lg hover:scale-105 active:scale-95">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      {/* <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
                Popular Destinations
              </h2>
              <p className="text-gray-500 font-medium">
                Curated spots for your next group trip
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-coral font-bold hover:gap-3 transition-all">
              View all places <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DestinationCard
              title="Kyoto Stroll"
              location="Japan"
              price="$1,200"
              image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              tags={['Culture', 'Food', 'Nature']}
              color="coral"
            />
            <DestinationCard
              title="Bali Retreat"
              location="Indonesia"
              price="$850"
              image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              tags={['Relax', 'Beach', 'Yoga']}
              color="fresh-green"
            />
            <DestinationCard
              title="Alpine Hike"
              location="Switzerland"
              price="$2,100"
              image="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              tags={['Adventure', 'Mountains']}
              color="sky-blue"
            />
            <DestinationCard
              title="Lisbon Vibes"
              location="Portugal"
              price="$1,100"
              image="https://images.unsplash.com/photo-1590725140246-20ac70da4207?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              tags={['City', 'History', 'Food']}
              color="sunny"
            />
          </div>
        </div>
      </section> */}

      {/* Community Section */}
      {/* <section className="py-20 px-4 md:px-8 bg-white rounded-[3rem] mx-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-sunny/20 text-yellow-700 font-bold text-sm mb-4">
              Our Community
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
              Meet fellow travelers
            </h2>
            <p className="text-gray-500 font-medium max-w-2xl mx-auto">
              Connect with diverse people from around the world. Share stories,
              make memories, and find your travel buddies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TravelerProfile
              name="Sarah Chen"
              role="Foodie Explorer"
              bio="Always looking for the best street food. Let's eat our way through Asia!"
              image="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              interests={['Food', 'Photography', 'Urban']}
              color="coral"
            />
            <TravelerProfile
              name="Marcus Johnson"
              role="Adventure Seeker"
              bio="Hiking, climbing, and surfing. If it gets your heart racing, I'm in."
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              interests={['Hiking', 'Surfing', 'Nature']}
              color="sky-blue"
            />
            <TravelerProfile
              name="Elena Rodriguez"
              role="Culture Enthusiast"
              bio="History buff and museum lover. I want to learn everything about local traditions."
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              interests={['History', 'Art', 'Museums']}
              color="sunny"
            />
            <TravelerProfile
              name="David Kim"
              role="Digital Nomad"
              bio="Working remotely from cafes around the world. Coffee is my fuel."
              image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              interests={['Tech', 'Coffee', 'Startups']}
              color="fresh-green"
            />
          </div>
        </div>
      </section> */}

      {/* Reviews Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12 text-center">
            Stories from the road
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard
              name="Jessica M."
              location="New York, USA"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              rating={5}
              text="I found my best friends on this platform! We went to Bali together and it was magical. The community here is so welcoming."
            />
            <ReviewCard
              name="Tom H."
              location="London, UK"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              rating={5}
              text="As a solo traveler, I was nervous. But meeting people here made me feel safe and connected. Highly recommend for first-timers!"
            />
            <ReviewCard
              name="Amara K."
              location="Toronto, Canada"
              image="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              rating={4}
              text="The local guides we met through the community were amazing. They showed us hidden gems we would never have found alone."
            />
          </div>
        </div>
      </section>



    </div>
  )
}
