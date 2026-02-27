"use client";

import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { useGetMyTravelsQuery } from "@/redux/feature/travel/travel.api";
import {
  Calendar,
  Compass,
  MapPin,
  Plus,
  Settings,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TravelPlanCard from "@/components/travel/TravelPlanCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserDashboardPage() {
  const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
  const { data: travelData, isLoading: isTravelLoading } = useGetMyTravelsQuery(undefined);

  const user = userData?.data;
  const travelPlans = travelData?.data || [];

  // Calculate Stats
  const totalTrips = travelPlans.length;
  const ongoingTrips = travelPlans.filter((t: any) => t.status === "ONGOING").length;
  // Assuming we might calculate total budget or something later

  const recentPlans = [...travelPlans].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 3);

  if (isUserLoading || isTravelLoading) {
    return (
      <div className="p-8 space-y-8">
        <div className="flex gap-4">
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-3xl" />
        </div>
        <Skeleton className="h-96 w-full rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-10 pb-20">

      {/* 🔹 Welcome Section */}
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-primary to-[#00AA27] p-8 md:p-12 text-white shadow-2xl">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-fullblur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4 border border-white/20">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Welcome Back, Traveler!</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-2">
              Hello, {user?.name || "Explorer"}! 👋
            </h1>
            <p className="text-white/90 text-lg max-w-lg">
              Ready for your next adventure? You have {ongoingTrips} ongoing trips and {totalTrips} total plans.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/user/dashboard/create-travel">
              <Button className="bg-white text-primary hover:bg-slate-100 border-none h-12 px-6 rounded-xl font-bold shadow-lg shadow-black/10 transition-all hover:scale-105">
                <Plus className="w-5 h-5 mr-2" /> Create New Plan
              </Button>
            </Link>
            <Link href="/explore-travelers">
              <Button className="bg-primary-foreground/20 backdrop-blur text-white hover:bg-white/20 border-white/30 border h-12 px-6 rounded-xl font-bold transition-all">
                <Compass className="w-5 h-5 mr-2" /> Explore
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Total Trips</p>
            <h3 className="text-3xl font-bold text-slate-800">{totalTrips}</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Ongoing</p>
            <h3 className="text-3xl font-bold text-slate-800">{ongoingTrips}</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-slate-500 font-medium">Profile Status</p>
            <h3 className="text-lg font-bold text-slate-800">{user?.role || "USER"}</h3>
          </div>
        </div>
      </div>

      {/* 🔹 Recent Activity Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 font-display">Recent Travel Plans</h2>
          <Link href="/user/dashboard/my-travels" className="text-primary font-semibold hover:underline">
            View All
          </Link>
        </div>

        {travelPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPlans.map((plan: any) => (
              <TravelPlanCard key={plan.id} plan={plan} compact />
            ))}
            {/* Add New Card Slot */}
            <Link href="/user/dashboard/create-travel" className="group">
              <div className="h-full min-h-[400px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 hover:bg-white hover:border-primary hover:text-primary transition-all cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8" />
                </div>
                <span className="font-bold text-lg">Create New Plan</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Compass className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Recent Activity</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              You haven't planned any trips yet. Start your journey today!
            </p>
            <Link href="/user/dashboard/create-travel">
              <Button className="btn-primary">Create Your First Trip</Button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
