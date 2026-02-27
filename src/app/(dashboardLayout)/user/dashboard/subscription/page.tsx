"use client";

import { useCreateSubscriptionMutation } from "@/redux/feature/travel/travel.api";
import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Shield } from "lucide-react";
import toast from "react-hot-toast";

export default function SubscriptionPage() {
    const { data: userData, isLoading: isUserLoading } = useUserInfoQuery(undefined);
    const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

    const currentPlan = userData?.data?.subscriptionPlan || "FREE";

    const handleSubscribe = async (plan: "MONTHLY" | "YEARLY" | "FREE") => {
        try {
            const res = await createSubscription({ plan }).unwrap();

            // If payment URL is returned (likely for Stripe/SSLCommerz), redirect
            if (res?.data?.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            } else {
                toast.success(`Successfully subscribed to ${plan} plan! 🎉`);
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Subscription failed");
        }
    };

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            icon: Shield,
            features: ["Create 1 Trip Plan", "View Public Trips", "Basic Profile"],
            planKey: "FREE",
            popular: false,
        },
        {
            name: "Monthly",
            price: "$9.99",
            period: "per month",
            icon: Zap,
            features: ["Unlimited Trip Plans", "Match with Travelers", "Priority Support", "Verified Badge"],
            planKey: "MONTHLY",
            popular: false,
            color: "bg-blue-500",
        },
        {
            name: "Yearly",
            price: "$99.99",
            period: "per year",
            icon: Crown,
            features: ["All Monthly Features", "2 Months Free", "Exclusive Events", "Profile Spotlight"],
            planKey: "YEARLY",
            popular: true,
            color: "bg-primary",
        },
    ];

    return (
        <div className="container mx-auto p-6 space-y-12 py-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-4xl font-bold font-display text-gray-900">Upgrade Your Journey</h1>
                <p className="text-muted-foreground text-lg">
                    Unlock the full potential of Travel Buddy with our premium plans. Save money and travel smarter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan: any) => (
                    <div
                        key={plan.name}
                        className={`relative bg-white rounded-3xl p-8 border ${plan.popular ? 'border-primary shadow-2xl scale-105 z-10' : 'border-gray-100 shadow-xl'} flex flex-col`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-6">
                            <div className={`w-14 h-14 rounded-2xl ${plan.popular ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'} flex items-center justify-center mb-4`}>
                                <plan.icon size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                            <div className="mt-2 flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                <span className="text-muted-foreground text-sm">/ {plan.period}</span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature: string) => (
                                <li key={feature} className="flex items-center gap-3 text-gray-600">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => handleSubscribe(plan.planKey)}
                            disabled={isLoading || plan.planKey === currentPlan}
                            className={`w-full h-12 rounded-xl font-bold text-lg ${plan.planKey === currentPlan ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : plan.popular ? 'btn-primary shadow-lg shadow-primary/20' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                        >
                            {plan.planKey === currentPlan ? "Active Plan" : isLoading ? "Processing..." : plan.name === "Free" ? "Get Started" : `Subscribe ${plan.name}`}
                        </Button>
                    </div>
                ))}
            </div>

            <div className="text-center pt-8">
                <p className="text-sm text-gray-400">
                    Secure payment processing. You can cancel at any time.
                </p>
            </div>
        </div>
    );
}
