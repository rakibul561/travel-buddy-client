/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Loading from "@/components/shared/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetMyTravelsQuery } from "@/redux/feature/travel/travel.api";
import { ArrowRight, Calendar, DollarSign, MapPin, Plane } from "lucide-react";
import Link from "next/link";

export default function MyTravelsPage() {
  const { data, isLoading } = useGetMyTravelsQuery(undefined);
  const myTravels = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            My Travel <span className="text-blue-600">Plans</span>
          </h1>
          <p className="text-slate-500 text-lg">
            Manage your created travel plans and wait for buddies to join.
          </p>
        </div>
        <Link href="/user/dashboard/create-travel">
          <Button className="h-12 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-95">
            <Plane className="w-5 h-5 mr-2" /> Create New Plan
          </Button>
        </Link>
      </div>

      {myTravels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            No travel plans yet
          </h3>
          <p className="text-slate-500 mb-8 max-w-sm">
            You haven't created any travel plans yet. Start your journey by creating one and find the perfect buddy!
          </p>
          <Link href="/user/dashboard/create-travel">
            <Button
              variant="outline"
              className="h-12 border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all"
            >
              Create Your First Plan
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTravels.map((travel: any) => (
            <div
              key={travel.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 border border-slate-100 flex flex-col hover:-translate-y-1"
            >
              {/* Image Header */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    travel.image ||
                    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
                  }
                  alt={travel.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />

                <div className="absolute top-4 left-4">
                  <Badge
                    variant={travel.isCompleted ? "secondary" : "default"}
                    className={`font-semibold px-3 py-1 shadow-sm ${travel.isCompleted
                      ? "bg-green-500 text-white border-transparent"
                      : "bg-blue-600 text-white border-transparent"
                      }`}
                  >
                    {travel.isCompleted ? "Completed" : "Active"}
                  </Badge>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-blue-600" />
                  {travel.travelType}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col bg-white">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-start gap-2 line-clamp-2">
                    <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    {travel.destination}
                  </h3>

                  <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
                    {travel.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate font-medium">
                        {new Date(travel.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="truncate font-medium">Est. ${travel.budget}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link href={`/travel-plans/${travel.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between hover:bg-slate-50 hover:text-blue-600 text-slate-700 font-semibold h-12 rounded-xl"
                    >
                      View Trip Details <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
