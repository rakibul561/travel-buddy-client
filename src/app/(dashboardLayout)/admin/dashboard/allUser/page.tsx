/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Search, Users } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAllUserQuery } from "../../../../../redux/feature/auth/auth.api";

const AllUser = () => {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading } = useAllUserQuery({ page, limit });

  const users = data?.data?.data || [];
  const meta = data?.data?.meta;

  console.log("ALL USERS RESPONSE:", data);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="text-sm text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and monitor platform users
            </p>
          </div>
        </div>

        {meta && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg border">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Total: {meta.total || 0}
            </span>
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">#</TableHead>
              <TableHead className="font-semibold text-gray-700">Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Email</TableHead>
              <TableHead className="font-semibold text-gray-700">Role</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-12 w-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">No users found</p>
                    <p className="text-sm text-gray-400">Try adjusting your search</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: any, index: number) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-600">
                    {(page - 1) * limit + index + 1}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.name || "User"}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold border-2 border-gray-200">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                      )}
                      <span className="font-medium text-gray-900">
                        {user.name || "N/A"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="capitalize font-medium"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.isBlocked ? (
                      <Badge variant="destructive" className="font-medium">
                        Blocked
                      </Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 font-medium">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {meta && meta.totalPage > 1 && (
        <div className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{(page - 1) * limit + 1}</span> to{" "}
            <span className="font-semibold text-gray-900">
              {Math.min(page * limit, meta.total || 0)}
            </span>{" "}
            of <span className="font-semibold text-gray-900">{meta.total || 0}</span> users
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: meta.totalPage }, (_, i) => i + 1)
                .filter(
                  (pageNum) =>
                    pageNum === 1 ||
                    pageNum === meta.totalPage ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                )
                .map((pageNum, index, array) => (
                  <div key={pageNum} className="flex items-center">
                    {index > 0 && array[index - 1] !== pageNum - 1 && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <Button
                      variant={page === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className="min-w-[2.5rem]"
                    >
                      {pageNum}
                    </Button>
                  </div>
                ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= meta.totalPage}
              onClick={() => setPage((p) => p + 1)}
              className="gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUser;
