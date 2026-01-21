"use client";

import { useGetMyTravelsQuery } from "@/redux/feature/travel/travel.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Loading from "@/components/shared/Loading";

export default function MyTravelsPage() {
  const { data, isLoading } = useGetMyTravelsQuery(undefined);
  const myTravels = data?.data || [];

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-primary">My Travels</h1>
          <p className="text-muted-foreground">Manage your travel plans and requests</p>
        </div>
        <Link href="/user/dashboard/create-travel">
          <Button className="btn-primary shadow-lg shadow-primary/20">
            + Create New Plan
          </Button>
        </Link>
      </div>

      {myTravels.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-3xl border border-dashed border-gray-300">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">No travel plans yet</h3>
          <p className="text-muted-foreground mb-6">Start your journey by creating a travel plan</p>
          <Link href="/user/dashboard/create-travel">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">Create Plan</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myTravels.map((travel: any) => (
            <div
              key={travel.id}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={travel.cardImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"}
                  alt={travel.destination}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                  {travel.travelType}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    {travel.destination}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2">
                    {travel.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{new Date(travel.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span>Est. ${travel.budget}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
                  <Badge variant={travel.isCompleted ? "secondary" : "default"} className={travel.isCompleted ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-primary/10 text-primary hover:bg-primary/20"}>
                    {travel.isCompleted ? "Completed" : "Active"}
                  </Badge>

                  <Link href={`/travel-plans/${travel.id}`}>
                    <Button variant="ghost" className="text-sm font-semibold hover:text-primary p-0 h-auto group-hover:underline">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
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
