"use client";

import { Button } from "@/components/ui/button";
import { useGetAllTravelsQuery } from "@/redux/api";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: travelsData } = useGetAllTravelsQuery({ page: 1, limit: 6 });

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-[#8B9D83]/30">
      {/* Background Blurs from the screenshot */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-100/40 rounded-full blur-[120px] -z-10" />
      <div className="fixed top-20 right-[10%] w-[30%] h-[30%] bg-green-100/30 rounded-full blur-[100px] -z-10" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm px-5 py-2.5 rounded-full mb-10 border border-gray-100 shadow-sm animate-fade-in">
            <span className="text-lg">✨</span>
            <span className="text-[15px] font-semibold text-gray-700 tracking-tight">Join 50,000+ happy travelers</span>
          </div>

          {/* Main Heading - Heavy Sans-Serif */}
          <h1 className="text-7xl md:text-8xl lg:text-[100px] font-[950] mb-8 leading-[0.9] tracking-[-0.05em] text-[#1A1A1A]">
            Find your next
            <br />
            adventure
            <br />
            <span className="text-[#76a086]">with friends!</span>
            <span className="inline-block ml-4 transform hover:scale-110 transition-transform cursor-default">🌍</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[19px] md:text-[21px] text-gray-500/80 mb-14 max-w-2xl mx-auto leading-relaxed font-medium">
            Discover beautiful places and meet fellow travelers who love exploring just as much as you do. Your journey starts with hello.
          </p>

          {/* Premium Pill Search Bar */}
          <div className="relative max-w-3xl mx-auto mb-32">
            <div className="flex items-center bg-white rounded-full p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-50">
              <div className="flex-1 flex items-center gap-4 px-8">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where do you want to go?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 outline-none text-[17px] text-gray-800 placeholder:text-gray-400 font-medium"
                />
              </div>
              <Button className="bg-[#76a086] hover:bg-[#658a73] text-white px-12 h-14 rounded-full text-lg font-bold shadow-lg shadow-[#76a086]/20 transition-all hover:scale-[1.02] active:scale-95">
                Search
              </Button>
            </div>
          </div>

          {/* Pricing Section (Matching your screenshot exactly) */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
            {/* Free Plan */}
            <div className="bg-[#f2f4f1] rounded-[2.5rem] p-12 flex flex-col items-start text-left hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Free Plan</h3>
              <p className="text-gray-500 text-[15px] font-medium mb-8">Get started and explore travelers for free</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-[1000] text-gray-900">$0</span>
                <span className="text-gray-400 font-medium">/lifetime</span>
              </div>
              <div className="space-y-4 mb-12 w-full">
                {["Create travel profile", "View public travel plans", "Limited matches"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] font-semibold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-[10px]">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Button disabled className="w-full h-16 bg-[#c4cbd1] text-white rounded-2xl text-[17px] font-black border-none cursor-not-allowed">
                Current Plan
              </Button>
            </div>

            {/* Monthly Plan */}
            <div className="bg-white rounded-[2.5rem] p-12 flex flex-col items-start text-left border-[3px] border-[#76a086] shadow-[0_40px_80px_rgba(118,160,134,0.12)] relative hover:scale-[1.02] transition-all duration-500">
              <h3 className="text-2xl font-black text-gray-900 mb-2">Monthly Plan</h3>
              <p className="text-gray-500 text-[15px] font-medium mb-8">Best for short trips and casual travelers</p>
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-[1000] text-gray-900">$10.00</span>
                <span className="text-gray-400 font-medium">/month</span>
              </div>
              <div className="space-y-4 mb-12 w-full">
                {["Unlimited matches", "Send join requests", "Chat with travelers"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] font-semibold text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 text-[10px]">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Button className="w-full h-16 bg-[#76a086] hover:bg-[#658a73] text-white rounded-2xl text-[17px] font-black shadow-xl shadow-[#76a086]/30 transition-all">
                Get Started
              </Button>
            </div>

            {/* Yearly Plan */}
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-12 flex flex-col items-start text-left text-white hover:shadow-2xl hover:shadow-black/20 transition-all duration-500">
              <h3 className="text-2xl font-black mb-2">Yearly Plan</h3>
              <p className="text-gray-400 text-[15px] font-medium mb-8">Perfect for frequent travelers</p>
              <div className="flex items-baseline gap-1 mb-10 text-white">
                <span className="text-6xl font-[1000]">$100</span>
                <span className="text-gray-500 font-medium ml-1">/year</span>
              </div>
              <div className="space-y-4 mb-12 w-full">
                {["Unlimited matches", "Send join requests", "Verified badge"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[15px] font-semibold text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                      <span className="text-green-400 text-[10px]">✓</span>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
              <Button className="w-full h-16 bg-white hover:bg-gray-100 text-black rounded-2xl text-[17px] font-black transition-all">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
