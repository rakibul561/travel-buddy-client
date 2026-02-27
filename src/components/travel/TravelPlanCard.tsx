"use client";

import { Button } from "@/components/ui/button";
import {
    Calendar,
    CheckCircle2,
    DollarSign,
    MapPin,
    Users,
    XCircle,
} from "lucide-react";
import Link from "next/link";

interface TravelPlanCardProps {
    plan: any; // Ideally use a proper type interface here
    compact?: boolean;
}

export default function TravelPlanCard({ plan, compact = false }: TravelPlanCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "PLANNED": return "bg-blue-500";
            case "COMPLETED": return "bg-green-500";
            case "ONGOING": return "bg-amber-500";
            case "CANCELLED": return "bg-red-500";
            default: return "bg-gray-500";
        }
    };

    const getStatusIcon = (isActive: boolean) =>
        isActive ? (
            <CheckCircle2 className="h-4 w-4 text-green-400" />
        ) : (
            <XCircle className="h-4 w-4 text-red-500" />
        );

    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden h-full">
            {/* Image Header */}
            <div className="relative h-56 overflow-hidden">
                <img
                    src={plan.image || "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1000&q=80"}
                    alt={plan.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-slate-800 uppercase tracking-wide flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${getStatusColor(plan.status)}`}></span>
                    {plan.travelType}
                </div>

                {/* Destination Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold font-display leading-tight mb-1">
                        {plan.destination}
                    </h3>
                    <div className="flex items-center text-sm font-medium text-white/90">
                        <MapPin className="w-4 h-4 mr-1 text-primary" />
                        {plan.city}, {plan.country}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col flex-1">
                <div className="space-y-4 mb-6 flex-1">
                    {!compact && (
                        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                            {plan.description}
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="truncate">{formatDate(plan.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 p-2 rounded-lg">
                            <DollarSign className="w-4 h-4 text-primary" />
                            <span>
                                ${plan.budgetMin}-{plan.budgetMax}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                    {plan.user && (
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                                {plan.user.name?.[0]}
                            </div>
                            <span className="text-sm font-medium text-slate-700 truncate max-w-[100px]">
                                {plan.user.name}
                            </span>
                        </div>
                    )}

                    <Link href={`/explore-travelers/${plan.id}`} className="flex-1">
                        <Button className="w-full btn-primary rounded-xl h-10 shadow-none hover:shadow-lg transition-all">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
