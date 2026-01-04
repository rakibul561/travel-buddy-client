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
import { useAllUserFromDbQuery } from "../../../../../redux/feature/auth/auth.api";
import { useGetAllpaymentQuery } from "../../../../../redux/feature/travel/travel.api";

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
  const { data: userData } = useAllUserFromDbQuery(undefined);
  console.log("the user data is ",userData )
  const { data: transactionData } = useGetAllpaymentQuery(undefined);

  const totalUsers = userData?.data?.meta?.total ?? 0;
  const transactions = transactionData?.data ?? [];
  const transactionCount = transactions.length;

  const totalTransactionValue = transactions.reduce(
    (sum: number, txn: any) => sum + (txn.amount ?? 0),
    0
  );

  const avgTransaction =
    transactionCount > 0
      ? totalTransactionValue / transactionCount
      : 0;

  /* ===== Monthly Aggregation ===== */
  const monthlyMap: Record<string, { amount: number; count: number }> = {};

  transactions.forEach((txn: any) => {
    const date = new Date(txn.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;

    if (!monthlyMap[key]) {
      monthlyMap[key] = { amount: 0, count: 0 };
    }

    monthlyMap[key].amount += txn.amount ?? 0;
    monthlyMap[key].count += 1;
  });

  const monthlyTransactions = Object.entries(monthlyMap).map(
    ([month, data]) => ({
      month,
      amount: data.amount,
      count: data.count,
    })
  );

  /* ===== Wallet Distribution ===== */
  const walletMap: Record<string, number> = {};

  transactions.forEach((txn: any) => {
    const wallet = txn.senderId ?? "Unknown";
    if (!walletMap[wallet]) walletMap[wallet] = 0;
    walletMap[wallet] += txn.amount ?? 0;
  });

  const walletPie = Object.entries(walletMap)
    .map(([name, value]) => ({
      name: name.length > 10 ? `${name.slice(0, 10)}...` : name,
      value,
      fullName: name,
    }))
    .slice(0, 6);

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
            title="Total Transactions"
            value={transactionCount}
            icon={Activity}
            trend="+8.2%"
            subtitle="All time"
            color="from-green-500 to-green-600"
          />
          <StatCard
            title="Total Volume"
            value={`$${totalTransactionValue}`}
            icon={DollarSign}
            trend="+15.3%"
            subtitle="Transaction volume"
            color="from-purple-500 to-purple-600"
          />
          <StatCard
            title="Average Transaction"
            value={`$${avgTransaction.toFixed(2)}`}
            icon={Wallet}
            subtitle="Per transaction"
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
                Top Wallet Distribution
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                User transaction volume breakdown
              </p>

              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={walletPie}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={5}
                    >
                      {walletPie.map((_e, i) => (
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
