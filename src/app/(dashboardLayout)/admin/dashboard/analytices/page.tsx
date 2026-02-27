/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Activity,
  DollarSign,
  Users,
  Wallet
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAdminStatsQuery } from "../../../../../redux/feature/admin/adminApi";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

/* ================= STAT CARD ================= */
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
  color,
}: any) => (
  <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-medium text-green-600">
            {trend}
          </span>
        )}
      </div>

      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </CardContent>
  </Card>
);

/* ================= ANALYTICS PAGE ================= */
const Analytics = () => {
  const { data, isLoading } = useGetAdminStatsQuery(undefined);
  const stats = data?.data;

  const totalUsers = stats?.totalUsers || 0;
  const transactionCount = stats?.totalTravelPlans || 0; // Using travel plans for activity
  const totalJoinRequests = stats?.totalJoinRequests || 0;
  const completedTrips = stats?.completedTrips || 0;
  const totalTransactionValue = stats?.totalRevenue || 0;

  const avgTransaction =
    transactionCount > 0
      ? totalTransactionValue / transactionCount
      : 0;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading stats...</div>;
  }

  /* Mock data for charts since we don't have time series data from the backend yet */
  const monthlyTransactions = [
    { month: "Jan", amount: totalTransactionValue * 0.1, count: Math.floor(transactionCount * 0.1) },
    { month: "Feb", amount: totalTransactionValue * 0.2, count: Math.floor(transactionCount * 0.2) },
    { month: "Mar", amount: totalTransactionValue * 0.7, count: Math.floor(transactionCount * 0.7) },
  ];

  const pieData = [
    { name: "Completed", value: completedTrips },
    { name: "Pending", value: transactionCount - completedTrips > 0 ? transactionCount - completedTrips : 0 },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* ===== Header ===== */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-500">
            Comprehensive insights into your platform performance
          </p>
        </div>

        {/* ===== Stats ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            trend="+12%"
            subtitle="Active users"
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Total Travel Plans"
            value={transactionCount}
            icon={Activity}
            trend="+8.2%"
            subtitle="All time created"
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Total Revenue"
            value={`$${totalTransactionValue}`}
            icon={DollarSign}
            trend="+15.3%"
            subtitle="Generated revenue"
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Join Requests"
            value={totalJoinRequests}
            icon={Wallet}
            subtitle="All connection requests"
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* ===== Charts ===== */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Monthly Chart */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Monthly Transaction Volume
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Revenue and transaction trends
              </p>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTransactions}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E5E7EB"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="#E5E7EB"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <YAxis
                      stroke="#E5E7EB"
                      tick={{ fill: "#6B7280", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                      }}
                    />
                    <Area
                      dataKey="amount"
                      type="monotone"
                      stroke="#6366F1"
                      fill="#C7D2FE"
                      strokeWidth={3}
                    />
                    <Bar dataKey="count" fill="#A5B4FC" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Pie */}
          <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Trips Status Overview
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Completed vs Pending Trips
              </p>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={5}
                    >
                      {pieData.map((_e, i) => (
                        <Cell
                          key={i}
                          fill={COLORS[i % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      wrapperStyle={{
                        color: "#6B7280",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
