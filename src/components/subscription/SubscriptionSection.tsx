"use client";

import SubscriptionCard from "./PricingCard";
import { useUserInfoQuery } from "../../redux/feature/auth/auth.api";
import { Crown } from "lucide-react";

export default function SubscriptionSection() {
  const { data: userData } = useUserInfoQuery(undefined);
  const user = userData?.data;
  const currentPlan = user?.subscriptionPlan || "FREE"; // Assuming 'subscriptionPlan' holds the value

  return (
    <div className="max-w-6xl mx-auto px-4 py-24" id="pricing">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Pricing</h2>
        <p className="text-slate-500 text-sm">Choose from budget to premium packages</p>
      </div>

      <div className="border border-blue-100 rounded-[2rem] p-6 md:p-10 bg-white shadow-sm max-w-4xl mx-auto">
        <div className="mb-8 pl-2">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-1">
            <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Upgrade to Pro
          </h3>
          <p className="text-slate-500 text-sm">Unlock powerful features to make your travel planning seamless</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* MONTHLY */}
          <SubscriptionCard
            title="Monthly subscription"
            price="$9.99"
            duration="/monthly"
            description="This is for users who travels a lot throughout the month"
            plan="MONTHLY"
            currentPlan={currentPlan}
            features={[
              { label: "Unlimited matches", available: true },
              { label: "Send join requests", available: true },
              { label: "Chat with travelers", available: true },
              { label: "Priority support", available: false },
            ]}
          />

          {/* YEARLY */}
          <SubscriptionCard
            title="Per Trip Smart Plan"
            price="$29.99"
            duration="/trip"
            description="This is for users who just need help for one specific trip."
            plan="YEARLY"
            currentPlan={currentPlan}
            features={[
              { label: "Unlimited matches", available: true },
              { label: "Send join requests", available: true },
              { label: "Chat with travelers", available: true },
              { label: "Priority support", available: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
