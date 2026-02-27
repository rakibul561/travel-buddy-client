/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  DollarSign,
  Loader2,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  useGetSingleTravelsQuery,
  useSendJoinRequestMutation,
} from "@/redux/feature/travel/travel.api";

export default function TravelDetailsPage() {
  const params = useParams();
  const travelPlanId = typeof params?.id === "string" ? params.id : undefined;

  const [requestSent, setRequestSent] = useState(false);

  // 🔹 Get single travel plan
  const { data, isLoading, isError } = useGetSingleTravelsQuery(
    travelPlanId as string,
    { skip: !travelPlanId }
  );

  // 🔹 Send join request mutation
  const [sendJoinRequest, { isLoading: isSubmitting }] = useSendJoinRequestMutation();

  const handleJoinRequest = async () => {
    if (!travelPlanId || requestSent) return;

    try {
      await sendJoinRequest({ travelPlanId }).unwrap();
      setRequestSent(true);
      toast.success("Join request sent successfully! The organizer will review it soon.");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to send join request");
    }
  };

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // 🔹 Error state
  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unavailable</h2>
          <p className="text-slate-500">
            Failed to load travel details. The plan might have been removed.
          </p>
        </div>
      </div>
    );
  }

  const plan = data.data;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* � HERO HEADER */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <img
          src={plan.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"}
          alt={plan.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 container mx-auto">
          <div className="max-w-4xl animate-slide-in-from-bottom">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold mb-4 border border-white/10">
              <Users className="w-4 h-4" />
              {plan.travelType} Trip
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white font-display mb-4 shadow-lg">
              {plan.destination}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-lg">
              <span className="flex items-center gap-2">
                <MapPin className="text-primary" />
                {plan.city}, {plan.country}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="text-primary" />
                {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-8">

            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-display text-slate-900">About this Trip</h2>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Share2 className="w-5 h-5 text-slate-500" />
                </Button>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
                {plan.description}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-full">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Group Size</p>
                  <p className="text-lg font-bold text-slate-900">5-10 Travelers</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-4 bg-green-50 text-green-600 rounded-full">
                  <DollarSign size={24} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Est. Budget</p>
                  <p className="text-lg font-bold text-slate-900">${plan.budgetMin} - ${plan.budgetMax}</p>
                </div>
              </div>
            </div>

            {/* Organizer Info (Mock for now if not in API) */}
            {plan.user && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold font-display text-slate-900 mb-6">Meet the Organizer</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
                    {plan.user.profilePhoto ? (
                      <img src={plan.user.profilePhoto} alt={plan.user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl font-bold">
                        {plan.user.name?.[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{plan.user.name}</p>
                    <p className="text-slate-500">{plan.user.email}</p>
                  </div>
                  <Button variant="outline" className="ml-auto rounded-full">View Profile</Button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - STICKY */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-3xl p-8 shadow-lg border border-slate-100">
              <div className="mb-6">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Status</span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="font-bold text-slate-900">Open for requests</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-slate-600">Days</span>
                  <span className="font-bold text-slate-900">
                    {Math.ceil((new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-slate-600">Travel Style</span>
                  <span className="font-bold text-slate-900">{plan.travelType}</span>
                </div>
              </div>

              <Button
                onClick={handleJoinRequest}
                disabled={isSubmitting || requestSent}
                className={`w-full h-14 text-lg font-bold rounded-xl shadow-glow transition-all ${requestSent ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'btn-primary'}`}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : requestSent ? (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" /> Request Sent
                  </>
                ) : (
                  "Send Join Request"
                )}
              </Button>

              <p className="text-center text-xs text-slate-400 mt-4">
                No payment required to send a request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

