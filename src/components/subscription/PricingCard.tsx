/* eslint-disable react/no-unescaped-entities */
'use client';

import { Check, Loader2, X } from "lucide-react";
import { useCreateSubscriptionMutation } from "../../redux/feature/travel/travel.api";

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
}

export default function SubscriptionCard({
  title,
  price,
  duration,
  description,
  popular,
  plan,
  features,
}: Props) {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  console.log(createSubscription , "the data is")

  const handleSubscribe = async () => {
    console.log("payment button hit .......", plan);

    try {
      const res = await createSubscription({ plan }).unwrap();

      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error("Subscription failed", error);
    }
  };

  return (
    <div
      className={`divide-y rounded-2xl border shadow-sm ${
        popular ? "border-indigo-600 scale-105" : "border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">{description}</p>

        <p className="mt-4">
          <strong className="text-3xl font-bold text-gray-900">
            {price}
          </strong>
          <span className="text-sm text-gray-600">{duration}</span>
        </p>

        <button
          onClick={handleSubscribe}
          disabled={isLoading || plan === "FREE"}
          className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Redirecting...
            </span>
          ) : plan === "FREE" ? (
            "Current Plan"
          ) : (
            "Get Started"
          )}
        </button>
      </div>

      {/* Features */}
      <div className="p-6">
        <p className="text-sm font-medium text-gray-900">
          What's included:
        </p>

        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              {feature.available ? (
                <Check className="h-5 w-5 text-indigo-600" />
              ) : (
                <X className="h-5 w-5 text-red-600" />
              )}
              <span className="text-gray-700">{feature.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
