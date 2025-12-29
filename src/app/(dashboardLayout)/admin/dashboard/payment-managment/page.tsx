/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllpaymentQuery } from "../../../../../redux/feature/travel/travel.api";

const PaymentManagment = () => {
  const { data, isLoading } = useGetAllpaymentQuery(undefined);
  const payments = data?.data || [];
  const totalPayments = payments.length;
  const totalAmount = payments.reduce((sum: number, p: any) => sum + p.amount, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payments...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("paid") || s.includes("success") || s.includes("completed")) {
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Paid</Badge>;
    } else if (s === "pending") {
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Pending</Badge>;
    } else if (s.includes("failed") || s.includes("cancelled")) {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return "NA";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl  text-gray-900 font-bold mb-3">Payment History</h1>
          <p className="text-gray-600 text-lg">All your travel plan payments in one place</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Total Transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-emerald-600">{totalPayments}</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Total Amount</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-emerald-600">${totalAmount.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Average Payment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-emerald-600">
                ${totalPayments > 0 ? (totalAmount / totalPayments).toFixed(2) : "0.00"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Cards */}
        {payments.length === 0 ? (
          <Card className="p-20 text-center border-dashed border-2 border-gray-300">
            <div className="mx-auto w-24 h-24 bg-gray-200 border-2 border-dashed rounded-full mb-6" />
            <h3 className="text-2xl font-semibold text-gray-700">No payments found</h3>
            <p className="text-gray-500 mt-2">Start your journey and payments will appear here!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {payments.map((payment: any, index: number) => (
              <Card
                key={payment.id}
                className="overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:border-emerald-300 transition-all duration-300"
              >
                {/* Header with Green Accent */}
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white pb-10 pt-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl font-bold">Payment #{index + 1}</CardTitle>
                      <CardDescription className="text-emerald-100 mt-2 text-base">
                        {new Date(payment.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>
                </CardHeader>

                {/* Content with Good Padding */}
                <CardContent className="pt-8 pb-10 px-8">
                  {/* User Info */}
                  <div className="flex items-center gap-5 mb-8">
                    <Avatar className="h-14 w-14 ring-4 ring-emerald-100">
                      <AvatarFallback className="bg-emerald-500 text-white text-xl font-bold">
                        {getInitials(payment.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">{payment.user?.name || "Guest User"}</p>
                      <p className="text-sm text-gray-600">{payment.user?.email || "N/A"}</p>
                    </div>
                  </div>

                  {/* Amount & Plan */}
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Amount</span>
                      <span className="text-3xl font-extrabold text-emerald-600">
                        ${payment.amount.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">Plan</span>
                      <Badge className="bg-emerald-100 text-emerald-800 text-base px-4 py-1">
                        {payment.plan?.toUpperCase() || "BASIC"}
                      </Badge>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-500">
                      {new Date(payment.createdAt).toLocaleString()}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentManagment;
