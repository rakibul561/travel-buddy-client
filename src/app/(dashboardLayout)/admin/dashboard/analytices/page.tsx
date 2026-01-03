/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Activity, DollarSign, TrendingUp, Users, Wallet } from "lucide-react";
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
import { useAllUserQuery } from "../../../../../redux/feature/auth/auth.api";
import { useGetAllpaymentQuery } from "../../../../../redux/feature/travel/travel.api";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#EF4444",
];

// StatCard component ke Analytics er BAIRE define korte hobe
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color,
  subtitle,
}: any) => (
  <Card className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
    <div
      className={`absolute inset-0 bg-gradient-to-r ${color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
    />
    <CardContent className="p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color} shadow-lg`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center text-green-600 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-1" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

const Analytics = () => {

  const { data: userData } = useAllUserQuery(undefined);

   console.log("the user data is", userData)
  const { data: transactionData } = useGetAllpaymentQuery(undefined);

  const totalUsers = userData?.data?.meta?.total ?? 0;
  const allTransactionCount = transactionData?.data?.length ?? 0;
  const transactions = transactionData?.data ?? [];

  // Calculate total transaction value
  const totalTransactionValue = transactions.reduce(
    (sum: number, txn: any) => sum + (txn.amount ?? 0),
    0
  );

  // Calculate average transaction
  const avgTransaction =
    allTransactionCount > 0 ? totalTransactionValue / allTransactionCount : 0;

  // Monthly Transaction aggregation
  const monthlyMap: Record<string, { amount: number; count: number }> = {};
  transactions.forEach((txn: any) => {
    const date = new Date(txn.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!monthlyMap[key]) monthlyMap[key] = { amount: 0, count: 0 };
    monthlyMap[key].amount += txn.amount ?? 0;
    monthlyMap[key].count += 1;
  });

  const monthlyTransactions = Object.entries(monthlyMap)
    .map(([month, data]) => ({
      month,
      amount: data.amount,
      count: data.count,
    }))
    .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  // Wallet Distribution (sum per user) - limit to top 6
  const walletMap: Record<string, number> = {};
  transactions.forEach((txn: any) => {
    const user = txn.senderId ?? "Unknown";
    if (!walletMap[user]) walletMap[user] = 0;
    walletMap[user] += txn.amount ?? 0;
  });

  const walletPie = Object.entries(walletMap)
    .map(([name, value]) => ({
      name: name.length > 10 ? `${name.substring(0, 10)}...` : name,
      value,
      fullName: name,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950/30">
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Comprehensive insights into your platform performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={totalUsers.toLocaleString()}
            icon={Users}
            color="from-blue-500 to-blue-600"
            trend="+12%"
            subtitle="Active users"
          />
          <StatCard
            title="Total Transactions"
            value={allTransactionCount.toLocaleString()}
            icon={Activity}
            color="from-green-500 to-green-600"
            trend="+8.2%"
            subtitle="All time"
          />
          <StatCard
            title="Total Volume"
            value={`$${totalTransactionValue.toLocaleString()}`}
            icon={DollarSign}
            color="from-purple-500 to-purple-600"
            trend="+15.3%"
            subtitle="Transaction volume"
          />
          <StatCard
            title="Average Transaction"
            value={`$${avgTransaction.toFixed(2)}`}
            icon={Wallet}
            color="from-orange-500 to-orange-600"
            subtitle="Per transaction"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Monthly Transactions - Enhanced with Area Chart */}
          <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Monthly Transaction Volume
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Revenue and transaction trends
                  </p>
                </div>
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTransactions}>
                    <defs>
                      <linearGradient
                        id="colorAmount"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#6366F1"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#6366F1"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      stroke="#6B7280"
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      stroke="#6B7280"
                      tickFormatter={(value: any) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: any, name?: string) => [
                        name === "amount" ? `${value}` : value,
                        name === "amount" ? "Volume" : "Transactions",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366F1"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                    />
                    <Bar dataKey="count" fill="#8B5CF6" opacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Distribution - Enhanced Pie Chart */}
          <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Top Wallet Distribution
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    User transaction volume breakdown
                  </p>
                </div>
                <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                  <Wallet className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={walletPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      label={(entry: any) => {
                        const percent = entry.percent;
                        return percent !== undefined
                          ? `${(percent * 100).toFixed(0)}%`
                          : "0%";
                      }}
                    >
                      {walletPie.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "12px",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      formatter={(value: any, props: any) => [
                        `$${value}`,
                        props.payload.fullName,
                      ]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{ paddingTop: "20px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Transaction Insights */}
        <Card className="border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Transaction Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {transactions.length > 0
                    ? Math.max(
                        ...transactions.map((t: any) => t.amount ?? 0)
                      ).toLocaleString()
                    : 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Highest Transaction
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {monthlyTransactions.length > 0
                    ? Math.max(...monthlyTransactions.map((m) => m.count))
                    : 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Peak Monthly Transactions
                </div>
              </div>
              <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {Object.keys(walletMap).length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Active Wallets
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
