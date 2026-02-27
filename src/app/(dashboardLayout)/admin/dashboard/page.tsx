"use client";

import { useGetAdminStatsQuery } from "@/redux/api";
import { Users, Plane, CheckCircle2, DollarSign, Send } from "lucide-react";

export default function AdminDashboardPage() {
  const { data, isLoading, isError } = useGetAdminStatsQuery(undefined);

  console.log("Admin Data ::", data)

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load dashboard statistics. Please ensure you are logged in as an admin.
      </div>
    );
  }

  const stats = data?.data;

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "Total Travel Plans",
      value: stats?.totalTravelPlans || 0,
      icon: Plane,
      color: "bg-indigo-500/10 text-indigo-500",
    },
    {
      title: "Completed Trips",
      value: stats?.completedTrips || 0,
      icon: CheckCircle2,
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "Total Join Requests",
      value: stats?.totalJoinRequests || 0,
      icon: Send,
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "Total Platform Revenue",
      value: `$${stats?.totalRevenue?.toFixed(2) || "0.00"}`,
      icon: DollarSign,
      color: "bg-green-500/10 text-green-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Platform Analytics</h1>
        <p className="text-gray-500 mt-2">Welcome back, Admin. Here's what's happening on Travel Buddy today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
