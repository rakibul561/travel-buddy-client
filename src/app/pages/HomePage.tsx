"use client"

import { Globe, MapPin, Compass, ShieldAlert, CloudRain, Lightbulb, Clock, CheckCircle } from 'lucide-react'
import SubscriptionSection from '../../components/subscription/SubscriptionSection'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505881402582-c5bc11054f91?q=80&w=2070&auto=format&fit=crop"
]

export function HomePage() {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 60 }, [Autoplay({ delay: 5000, stopOnInteraction: false })])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden text-slate-800">
      {/* 
        ==============================
        HERO SECTION
        ==============================
      */}
      <section className="relative w-full h-[95vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full Touch-pan-y">
            {CAROUSEL_IMAGES.map((src, index) => (
              <div key={index} className="relative flex-[0_0_100%] h-full min-w-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear hover:scale-110"
                  style={{ backgroundImage: `url(${src})` }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0f172a]/90 mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-col items-center text-center mt-10">
          {mounted && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <p className="text-white/90 text-sm font-medium tracking-wide flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  Your Ultimate Travel Intelligence Hub
                </p>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white mb-6 leading-[1.1] tracking-tight drop-shadow-2xl">
                Travel Smarter <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                  Know Everything
                </span><br />
                Before You Go.
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md"
              >
                Discover visa rules, transit risks, and personalized AI guidance for 190+ countries. Let intelligence drive your next adventure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/auth/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] w-full sm:w-auto"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                <Link href="#features">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-bold transition-all w-full sm:w-auto"
                  >
                    Explore Features
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </div>

        {/* Feature Pills Below */}
        <div className="absolute bottom-10 left-0 right-0 z-20 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto px-4"
          >
            {[
              { title: "190+ Countries", desc: "Global coverage" },
              { title: "AI-Powered", desc: "Multi-source verified" },
              { title: "Real-Time", desc: "Updated continuously" },
              { title: "No Booking required", desc: "Pure intelligence" }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/20 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl hover:bg-slate-900/60 transition-colors w-64 hover:-translate-y-1 transform duration-300">
                <CheckCircle className="w-6 h-6 text-blue-400" />
                <div className="text-left">
                  <p className="font-bold text-sm text-white">{feature.title}</p>
                  <p className="text-xs text-blue-200/80 mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Soft gradient transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </section>

      {/* 
        ==============================
        SECTION 1: International Travel Is Complicated
        ==============================
      */}
      <section className="py-24 px-4 bg-white text-center relative" id="features">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">International Travel Is <span className="text-blue-600">Complicated.</span></h2>
            <p className="text-slate-500 mb-16 text-lg max-w-2xl mx-auto">Don't let preventable issues ruin your trip. We've got you covered with deep, accurate intelligence.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {[
              { icon: Globe, title: "Confusing Visa Rules", desc: "Different Requirements for every country. Processing times vary. Easy to miss critical details.", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100", shadowHover: "hover:shadow-blue-900/5" },
              { icon: ShieldAlert, title: "Transit Surprises", desc: "Transit visas can be required even for short layovers. Rules change without warning.", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", shadowHover: "hover:shadow-orange-900/5" },
              { icon: CloudRain, title: "Weather Unpreparedness", desc: "Seasonal weather changes catch travelers off guard. Wrong clothing ruins experiences.", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100", shadowHover: "hover:shadow-indigo-900/5" },
              { icon: Compass, title: "Get AI Guidance", desc: "Proof of funds, return tickets, hotel bookings, requirements vary and are easy to overlook.", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100", shadowHover: "hover:shadow-emerald-900/5" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group p-8 rounded-3xl bg-white border ${item.border} shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl ${item.shadowHover}`}
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==============================
        SECTION 2: What Our AI Checks For You
        ==============================
      */}
      <section className="py-32 px-4 bg-slate-50 text-center relative border-t border-slate-200/60">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 rounded-l-[100px] -z-0 hidden lg:block blur-3xl" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">What Our AI Checks For You</h2>
            <p className="text-slate-500 mb-20 text-lg max-w-2xl mx-auto">Every insight is verified across multiple authoritative sources, giving you absolute peace of mind.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              { icon: Lightbulb, title: "Visa Requirement Breakdown", desc: "Detailed visa types, processing times, and application requirements tailored to your citizenship." },
              { icon: Clock, title: "Transit Visa Risk", desc: "Analysis of layover requirements, airport transit zones, and visa-free transit eligibility across the world." },
              { icon: CloudRain, title: "Weather & Seasonal Advice", desc: "Climate forecasts, seasonal patterns, and packing recommendations based on historical data." },
              { icon: ShieldAlert, title: "Travel Advisory Alerts", desc: "Real-time safety advisories, political situations, and risk assessments from official sources." },
              { icon: CheckCircle, title: "Document Checklist", desc: "Comprehensive list of required documents, validity requirements, and recommended backups." },
              { icon: MapPin, title: "Route Complexity Analysis", desc: "Multi-country journey analysis including transit points, entry requirements, and risk factors." }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-300 border border-slate-100 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity duration-300">
                  <item.icon className="w-32 h-32 text-blue-900" />
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 
        ==============================
        SUBSCRIPTION SECTION 
        ==============================
      */}
      <div className="bg-white border-t border-slate-200/60 pb-20 pt-10 relative">
        <SubscriptionSection />
      </div>

    </div>
  )
}
