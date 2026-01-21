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

      // Handle redirection based on response structure
      if (res.url) {
        window.location.href = res.url;
      } else if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      } else {
        toast.success("Subscription successful!");
      }

    } catch (error) {
      console.error("Subscription failed", error);
      toast.error("Failed to initiate payment");
    }
  };

  const isCurrentPlan = currentPlan === plan;

  return (
    <div
      className={`divide-y rounded-2xl border shadow-sm transition-all duration-300 ${popular ? "border-primary shadow-lg scale-105 bg-white z-10" : "border-gray-200 bg-white hover:border-primary/50"
        }`}
    >
      {/* Header */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 font-display">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <p className="mt-4 flex items-baseline gap-1">
          <strong className="text-4xl font-bold text-gray-900">
            {price}
          </strong>
          <span className="text-sm text-gray-600">{duration}</span>
        </p>

        <button
          onClick={handleSubscribe}
          disabled={isLoading || isCurrentPlan}
          className={`mt-6 w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-60 disabled:pointer-events-none ${isCurrentPlan
              ? "bg-gray-400 cursor-not-allowed"
              : popular
                ? "bg-primary hover:bg-primary/90 shadow-primary/25"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting...
            </span>
          ) : isCurrentPlan ? (
            "Current Plan"
          ) : (
            "Get Started"
          )}
        </button>
      </div>

      {/* Features */}
      <div className="p-6 bg-gray-50/50 rounded-b-2xl">
        <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">
          What's included:
        </p>

        <ul className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              {feature.available ? (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" strokeWidth={3} />
                </div>
              ) : (
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                  <X className="h-3 w-3 text-gray-400" />
                </div>
              )}
              <span className="text-gray-700 font-medium">{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
