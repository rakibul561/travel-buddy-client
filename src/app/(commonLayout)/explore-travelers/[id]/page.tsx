/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AlertCircle, Calendar, CheckCircle2, DollarSign, Loader2, MapPin, Users } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useGetSingleTravelsQuery, useSendJoinRequestMutation } from "../../../../redux/feature/travel/travel.api";

export default function TravelDetailsPage() {
  const params = useParams();
  const [requestSent, setRequestSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const travelPlanId = typeof params?.id === "string" ? params.id : undefined;

  const { data, isLoading, isError } = useGetSingleTravelsQuery(
    travelPlanId as string,
    { skip: !travelPlanId }
  );

  const [sendJoinRequest, { isLoading: isSubmitting }] = useSendJoinRequestMutation();

  const showNotification = (message: string, type: "success" | "error") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleJoinRequest = async () => {
    if (!travelPlanId) return;

    try {
      await sendJoinRequest({ travelPlanId }).unwrap();
      setRequestSent(true);
      showNotification("Join request sent successfully!", "success");
    } catch (error: any) {
      showNotification(error?.data?.message || "Failed to send join request", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <Loader2 className="h-12 w-12 animate-spin text-[#00DC33]" />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl text-red-500 font-semibold">Failed to load travel details</p>
          <p className="text-slate-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  const plan = data.data;

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 ${
          toastType === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}>
          {toastType === "success" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        {/* Hero Image Section */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 group">
          <img
            src={plan.image}
            alt={plan.destination}
            className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
              {plan.destination}
            </h1>
            <p className="flex items-center gap-2 text-lg text-white/90">
              <MapPin className="h-5 w-5" />
              {plan.city}, {plan.country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">About This Trip</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {plan.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Users className="text-[#00DC33] h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Travel Type</p>
                  <p className="text-lg font-semibold text-slate-800">{plan.travelType}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <Calendar className="text-blue-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Duration</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 flex items-start gap-4 hover:shadow-xl transition-shadow md:col-span-2">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <DollarSign className="text-yellow-600 h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium mb-1">Budget Range</p>
                  <p className="text-lg font-semibold text-slate-800">
                    ${plan.budgetMin?.toLocaleString()} - ${plan.budgetMax?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Join Request */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-slate-800">Interested in Joining?</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                Send a join request to connect with the trip organizer and become part of this adventure!
              </p>

              <button
                onClick={handleJoinRequest}
                disabled={isSubmitting || requestSent}
                className={`w-full px-6 py-4 font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg ${
                  requestSent
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : isSubmitting
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                    : "bg-[#00DC33] text-white hover:bg-[#00C02B] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending Request...
                  </>
                ) : requestSent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Request Sent!
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5" />
                    Send Join Request
                  </>
                )}
              </button>

              {requestSent && (
                <p className="mt-4 text-sm text-green-600 text-center font-medium">
                  ✓ The organizer will review your request soon
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
