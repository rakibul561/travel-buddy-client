/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  DollarSign,
  Loader2,
  MapPin,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useGetSingleTravelsQuery,
  useSendJoinRequestMutation,
} from "@/redux/feature/travel/travel.api";

export default function TravelDetailsPage() {
  const params = useParams();

  const travelPlanId = typeof params?.id === "string" ? params.id : undefined;

  const [requestSent, setRequestSent] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  // 🔹 Get single travel plan
  const { data, isLoading, isError } = useGetSingleTravelsQuery(
    travelPlanId as string,
    { skip: !travelPlanId }
  );

  // 🔹 Send join request mutation
  const [sendJoinRequest, { isLoading: isSubmitting }] = useSendJoinRequestMutation();

  // Removed throw Error to avoid crushing the app, handled via isError UI below
  // if(!travelPlanId){ throw new Error("travelPlaneId is not found") }

  // 🔹 Toast helper
  const showNotification = (
    message: string,
    type: "success" | "error"
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 🔹 Button click handler (MAIN LOGIC)
  const handleJoinRequest = async () => {
    if (!travelPlanId || requestSent) return;
    console.log("button click for travelPlaneId", travelPlanId);

    try {
      await sendJoinRequest({ travelPlanId }).unwrap();
      setRequestSent(true);
      showNotification(
        "Join request sent successfully!",
        "success"
      );
    } catch (error: any) {
      console.error(error);
      showNotification(
        error?.data?.message || "Failed to send join request",
        "error"
      );
    }
  };

  // 🔹 Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="h-12 w-12 animate-spin text-[#00DC33]" />
      </div>
    );
  }

  // 🔹 Error state
  if (isError || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-red-500">
            Failed to load travel details
          </p>
        </div>
      </div>
    );
  }

  const plan = data.data;

  return (
    <div className="min-h-screen mt-20 bg-slate-100">
      {/* 🔔 Toast */}
      {showToast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg text-white ${toastType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg mb-10">
          <img
            src={plan.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"}
            alt={plan.destination}
            className="w-full h-[420px] object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-6 left-6 text-white">
            <h1 className="text-4xl font-bold">{plan.destination}</h1>
            <p className="flex items-center gap-2 mt-2">
              <MapPin className="h-5 w-5" />
              {plan.city}, {plan.country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-3">
                About This Trip
              </h2>
              <p className="text-slate-600">{plan.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InfoCard
                icon={<Users />}
                title="Travel Type"
                value={plan.travelType}
              />
              <InfoCard
                icon={<Calendar />}
                title="Duration"
                value={`${new Date(
                  plan.startDate
                ).toDateString()} - ${new Date(
                  plan.endDate
                ).toDateString()}`}
              />
              <InfoCard
                icon={<DollarSign />}
                title="Budget"
                value={`$${plan.budgetMin} - $${plan.budgetMax}`}
                full
              />
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow sticky top-24">
              <h3 className="text-xl font-bold mb-3">
                Interested in Joining?
              </h3>
              <p className="text-slate-600 mb-5">
                Send a join request to the trip organizer.
              </p>

              <button
                onClick={handleJoinRequest}
                disabled={isSubmitting || requestSent}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${requestSent
                    ? "bg-green-500 text-white"
                    : isSubmitting
                      ? "bg-gray-300 text-gray-500"
                      : "bg-[#00DC33] text-white hover:bg-[#00C02B]"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : requestSent ? (
                  <>
                    <CheckCircle2 className="h-5 w-5" />
                    Request Sent
                  </>
                ) : (
                  <>
                    <Users className="h-5 w-5" />
                    Send Join Request
                  </>
                )}
              </button>

              {requestSent && (
                <p className="text-sm text-green-600 mt-4 text-center">
                  ✓ Waiting for organizer approval
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Small reusable card */
function InfoCard({
  icon,
  title,
  value,
  full,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow flex gap-4 ${full ? "md:col-span-2" : ""
        }`}
    >
      <div className="text-[#00DC33]">{icon}</div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
