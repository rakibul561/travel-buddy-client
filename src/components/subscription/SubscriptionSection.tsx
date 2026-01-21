"use client";

import SubscriptionCard from "./PricingCard";
import { useUserInfoQuery } from "../../redux/feature/auth/auth.api";

export default function SubscriptionSection() {
  const { data: userData } = useUserInfoQuery(undefined);
  const user = userData?.data;
  const currentPlan = user?.subscriptionPlan || "FREE"; // Assuming 'subscriptionPlan' holds the value

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

        {/* FREE */}
        <SubscriptionCard
          title="Free Plan"
          price="$0"
          duration="/lifetime"
          description="Get started and explore travelers for free"
          plan="FREE"
          currentPlan={currentPlan}
          features={[
            { label: "Create travel profile", available: true },
            { label: "View public travel plans", available: true },
            { label: "Limited matches", available: true },
            { label: "Send join requests", available: false },
            { label: "Chat with travelers", available: false },
            { label: "Verified badge", available: false },
          ]}
        />

        {/* MONTHLY */}
        <SubscriptionCard
          title="Monthly Plan"
          price="$10.00"
          duration="/month"
          description="Best for short trips and casual travelers"
          plan="MONTHLY"
          popular
          currentPlan={currentPlan}
          features={[
            { label: "Unlimited matches", available: true },
            { label: "Send join requests", available: true },
            { label: "Chat with travelers", available: true },
            { label: "Verified badge", available: false },
            { label: "Priority support", available: false },
          ]}
        />

        {/* YEARLY */}
        <SubscriptionCard
          title="Yearly Plan"
          price="$100"
          duration="/year"
          description="Perfect for frequent travelers"
          plan="YEARLY"
          currentPlan={currentPlan}
          features={[
            { label: "Unlimited matches", available: true },
            { label: "Send join requests", available: true },
            { label: "Chat with travelers", available: true },
            { label: "Verified badge", available: true },
            { label: "Priority support", available: true },
          ]}
        />
      </div>
    </div>
  );
}
