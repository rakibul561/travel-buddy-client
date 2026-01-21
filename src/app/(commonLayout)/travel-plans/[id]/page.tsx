"use client";

import { useGetSingleTravelsQuery, useSendJoinRequestMutation } from "@/redux/feature/travel/travel.api";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, DollarSign, User, Clock, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TravelDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  // Queries
  const { data: travelData, isLoading: isTravelLoading } = useGetSingleTravelsQuery(id as string);
  const { data: userData } = useUserInfoQuery(undefined);
  const [sendJoinRequest, { isLoading: isJoining }] = useSendJoinRequestMutation();

  const travel = travelData?.data;
  const user = userData?.data;

  const isOwner = user?.id === travel?.userId; // Assuming travel has userId

  const handleJoinRequest = async () => {
    if (!user) {
      toast.error("Please login to join a trip");
      router.push("/login"); // Fixed: using router.push instead of redirect
      return;
    }

    try {
      await sendJoinRequest({ travelPlanId: id as string }).unwrap();
      toast.success("Join request sent successfully! 🚀");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to send request");
    }
  };

  if (isTravelLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!travel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Travel Plan Not Found</h2>
        <Link href="/travel-plans">
          <Button variant="outline">Back to Travels</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Header/Cover */}
      <div className="bg-primary/10 h-64 md:h-80 relative">
        <div className="absolute top-6 left-6 z-10">
          <Link href="/travel-plans">
            <Button variant="secondary" size="sm" className="rounded-full shadow-md hover:bg-white">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
        </div>
        {/* Placeholder Pattern or Image if available */}
        <div className="w-full h-full flex items-center justify-center text-primary/20">
          <MapPin className="w-32 h-32" />
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Card */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 text-primary mb-4">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-xs font-bold uppercase tracking-wider">
                  {travel.travelType || "Adventure"}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${travel.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {travel.isActive ? "Active" : "Closed"}
                </span>
              </div>

              <h1 className="text-4xl font-bold font-display text-gray-900 mb-4">{travel.destination}</h1>

              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{new Date(travel.startDate).toLocaleDateString()} - {new Date(travel.endDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{Math.ceil((new Date(travel.endDate).getTime() - new Date(travel.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About this Trip</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {travel.description || "No description provided for this trip."}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-primary/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-500">Estimated Budget</span>
                <span className="text-3xl font-bold text-primary flex items-center">
                  <DollarSign className="w-6 h-6" />{travel.budget}
                </span>
              </div>

              {!isOwner ? (
                <Button
                  onClick={handleJoinRequest}
                  disabled={isJoining || !travel.isActive}
                  className="w-full h-12 rounded-xl text-lg font-bold btn-primary shadow-lg shadow-primary/20"
                >
                  {isJoining ? "Sending..." : (
                    <>
                      Request to Join <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              ) : (
                <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200">
                  <span className="text-gray-500 font-medium">You organized this trip</span>
                </div>
              )}

              {!travel.isActive && !isOwner && (
                <p className="text-center text-red-500 text-sm mt-3 font-medium">This trip is no longer accepting requests.</p>
              )}
            </div>

            {/* Organizer Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Organizer</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <User className="w-6 h-6 text-gray-500" />
                  {/* Assuming travel.user populated? If not, standard icon */}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Trip Organizer</p>
                  {/* We might not have organizer name in travel object unless populated */}
                  <p className="text-xs text-muted-foreground">Verified User</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
