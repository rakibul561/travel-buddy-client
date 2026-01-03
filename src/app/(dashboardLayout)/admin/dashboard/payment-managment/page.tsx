/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
          <h1 className="text-4xl text-gray-900 font-bold mb-3">Payment History</h1>
          <p className="text-gray-600 text-lg">All your travel plan payments in one place</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Total Transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#00DC33]">{totalPayments}</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Total Amount</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#00DC33]">${totalAmount.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200 shadow-md">
            <CardHeader>
              <CardDescription className="text-gray-600">Average Payment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-[#00DC33]">
                ${totalPayments > 0 ? (totalAmount / totalPayments).toFixed(2) : "0.00"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Table */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r bg-[#00DC33] text-white">
            <CardTitle className="text-2xl">Payment Transactions</CardTitle>
            <CardDescription className="text-emerald-100">
              Complete list of all payment records
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {payments.length === 0 ? (
              <div className="p-20 text-center">
                <div className="mx-auto w-24 h-24 bg-gray-200 border-2 border-dashed rounded-full mb-6" />
                <h3 className="text-2xl font-semibold text-gray-700">No payments found</h3>
                <p className="text-gray-500 mt-2">Start your journey and payments will appear here!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                      <TableHead className="font-bold text-gray-700">#</TableHead>
                      <TableHead className="font-bold text-gray-700">User</TableHead>
                      <TableHead className="font-bold text-gray-700">Amount</TableHead>
                      <TableHead className="font-bold text-gray-700">Plan</TableHead>
                      <TableHead className="font-bold text-gray-700">Status</TableHead>
                      <TableHead className="font-bold text-gray-700">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment: any, index: number) => (
                      <TableRow key={payment.id} className="hover:bg-emerald-50 transition-colors">
                        <TableCell className="font-medium text-gray-900">{index + 1}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 ring-2 ring-emerald-100">
                              <AvatarFallback className="bg-[#00DC33] text-white text-sm font-bold">
                                {getInitials(payment.user?.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">
                                {payment.user?.name || "Guest User"}
                              </p>
                              <p className="text-sm text-gray-600">
                                {payment.user?.email || "N/A"}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-xl font-bold text-[#00DC33]">
                            ${payment.amount.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-100 text-emerald-800 text-sm">
                            {payment.plan?.toUpperCase() || "BASIC"}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {new Date(payment.createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            <p className="text-sm text-gray-500">
                              {new Date(payment.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentManagment;
