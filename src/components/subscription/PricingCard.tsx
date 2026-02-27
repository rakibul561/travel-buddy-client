/* eslint-disable react/no-unescaped-entities */
'use client';

import { Check, Loader2, X } from "lucide-react";
import { useCreateSubscriptionMutation } from "../../redux/feature/travel/travel.api";
import toast from "react-hot-toast";

interface Feature {
  label: string;
  available: boolean;
}

interface Props {
  title: string;
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
  plan: "MONTHLY" | "YEARLY" | "FREE";
  features: Feature[];
  currentPlan?: string;
}

export default function SubscriptionCard({
  title,
  price,
  duration,
  description,
  popular,
  plan,
  features,
  currentPlan,
}: Props) {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const handleSubscribe = async () => {
    try {
      const res = await createSubscription({ plan }).unwrap();

      if (res.url) {
        window.location.href = res.url;
      } else if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.success("Subscription successful!");
      }
    } catch (error: any) {
      console.error("Subscription failed", error);
      toast.error(error?.data?.message || "Please login to subscribe");
    }
  };

  const isCurrentPlan = currentPlan === plan;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col h-full ${popular
        ? "border-blue-300 shadow-xl shadow-blue-100 scale-105 z-10 bg-white"
        : "border-blue-100 bg-white hover:border-blue-300 hover:shadow-xl shadow-sm hover:-translate-y-1"
        }`}
    >
      {/* Header - Blue Block */}
      <div className="bg-[#76abd5] p-6 text-white text-left">
        <h3 className="text-base font-bold mb-3 font-display">{title}</h3>
        <div className="flex items-baseline gap-1 mb-4">
          <strong className="text-3xl font-bold tracking-tight">
            {price}
          </strong>
          {duration && <span className="text-sm font-medium opacity-80">{duration}</span>}
        </div>
        <p className="text-xs opacity-90 leading-relaxed max-w-[200px]">{description}</p>
      </div>

      {/* Features - White Block */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              {feature.available ? (
                <div className="flex-shrink-0 w-4 h-4 rounded-full border border-blue-400 flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-blue-400" strokeWidth={3} />
                </div>
              ) : (
                <div className="flex-shrink-0 w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center">
                  <X className="h-2.5 w-2.5 text-slate-300" strokeWidth={3} />
                </div>
              )}
              <span className={`text-[13px] ${feature.available ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>
                {feature.label}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSubscribe}
          disabled={isLoading || isCurrentPlan}
          className={`w-full rounded-full py-3 text-sm font-bold transition-all ${isCurrentPlan
            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
            : "bg-[#76abd5] hover:bg-blue-500 text-white shadow-md hover:shadow-lg active:scale-95"
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </span>
          ) : isCurrentPlan ? (
            "Active Plan"
          ) : (
            "Choose Plan"
          )}
        </button>
      </div>
    </div>
  );
}
