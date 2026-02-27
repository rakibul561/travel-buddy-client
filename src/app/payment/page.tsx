"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, CreditCard, Sparkles } from "lucide-react";
import { useCreateSubscriptionMutation } from "@/redux/feature/travel/travel.api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
    const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
    const [selectedPlan, setSelectedPlan] = useState<"FREE" | "MONTHLY" | "YEARLY">("MONTHLY");
    const router = useRouter();

    const handleSubscribe = async () => {
        try {
            const res = await createSubscription({ plan: selectedPlan }).unwrap();
            if (res?.success && res?.url) {
                window.location.href = res.url; // Redirect to Stripe Checkout
            } else {
                toast.success(`Subscribed to ${selectedPlan} plan (No payment needed)`);
                router.push("/dashboard");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to initiate payment");
        }
    };

    const plans = [
        {
            id: "FREE",
            name: "Basic Traveler",
            price: "$0",
            period: "forever",
            features: ["Create 2 trips per month", "Join public trips", "Basic matching", "Community access"],
            recommended: false,
        },
        {
            id: "MONTHLY",
            name: "Pro Explorer",
            price: "$9.99",
            period: "per month",
            features: ["Unlimited trips", "Priority matching", "Ad-free experience", "Premium badge", "Advanced filters"],
            recommended: true,
        },
        {
            id: "YEARLY",
            name: "Global Nomad",
            price: "$99",
            period: "per year",
            features: ["All Pro features", "2 months free", "Exclusive VIP events", "24/7 Priority support"],
            recommended: false,
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-bold font-display text-gray-900 mb-4 flex items-center justify-center gap-3">
                        Choose Your Journey <Sparkles className="text-amber-500 w-8 h-8" />
                    </h1>
                    <p className="text-lg text-gray-600">
                        Unlock premium features to find the perfect travel buddy and explore the world without limits.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id as "FREE" | "MONTHLY" | "YEARLY")}
                            className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-300 ${selectedPlan === plan.id
                                    ? "bg-primary text-white shadow-xl shadow-primary/30 scale-105 border-transparent z-10"
                                    : "bg-white text-gray-900 shadow-sm border border-gray-100 hover:border-primary/30"
                                }`}
                        >
                            {plan.recommended && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <h3 className={`text-xl font-bold mb-2 ${selectedPlan === plan.id ? "text-white" : "text-gray-900"}`}>
                                {plan.name}
                            </h3>
                            <div className="mb-6">
                                <span className="text-4xl font-black">{plan.price}</span>
                                <span className={`text-sm ml-2 ${selectedPlan === plan.id ? "text-primary-foreground/80" : "text-gray-500"}`}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <Check className={`w-5 h-5 flex-shrink-0 ${selectedPlan === plan.id ? "text-white" : "text-primary"}`} />
                                        <span className="text-sm font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="max-w-md mx-auto text-center">
                    <Button
                        onClick={handleSubscribe}
                        disabled={isLoading}
                        className="w-full h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : selectedPlan === "FREE" ? (
                            "Get Started for Free"
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5" /> Proceed to Checkout
                            </>
                        )}
                    </Button>
                    <p className="text-sm text-gray-500 mt-6 flex justify-center items-center gap-1">
                        Secure payments powered by Stripe
                    </p>
                </div>
            </div>
        </div>
    );
}