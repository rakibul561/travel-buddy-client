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
import { ChevronLeft, ChevronRight, Search, Trash2, Users, MoreHorizontal, ShieldAlert, UserCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-hot-toast";

import {
  useAllUserQuery,
  useDeleteUserMutation,
} from "../../../../../redux/feature/auth/auth.api";

const AllUser = () => {
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading } = useAllUserQuery({ page, limit });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = data?.data?.data || [];
  const meta = data?.data?.meta;

  const handleDeleteUser = async (userId: string) => {
    const ok = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
    if (!ok) return;

    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-[3px] border-blue-100 border-t-blue-600"></div>
          <p className="text-sm font-medium text-slate-500">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl shadow-sm border border-blue-100/50">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">User Management</h1>
            <p className="text-slate-500 mt-1.5 font-medium">
              Monitor, manage, and moderate all platform users.
            </p>
          </div>
        </div>

        {meta && (
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100 font-semibold text-slate-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20"></span>
            <span className="ml-2">Total Users: {meta.total || 0}</span>
          </div>
        )}
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/80 hover:bg-slate-50/80 border-b-slate-100 min-h-[3rem]">
                <TableHead className="w-[80px] font-semibold text-slate-600 pl-6 h-12">#</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">User Profile</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12 hidden sm:table-cell">Email Address</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Role</TableHead>
                <TableHead className="font-semibold text-slate-600 h-12">Status</TableHead>
                <TableHead className="font-semibold text-slate-600 text-right pr-6 h-12">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                        <Search className="h-8 w-8 text-slate-300" />
                      </div>
                      <p className="text-slate-900 font-semibold text-lg">No users found</p>
                      <p className="text-slate-500 max-w-sm">
                        It looks like there are no users present on this page right now.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any, index: number) => (
                  <TableRow
                    key={user.id}
                    className="group hover:bg-blue-50/30 transition-colors border-b-slate-50 last:border-0"
                  >
                    <TableCell className="font-medium text-slate-500 pl-6 h-16">
                      <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded-md text-slate-600">
                        {((page - 1) * limit + index + 1).toString().padStart(2, '0')}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative h-10 w-10 shrink-0">
                          {user.profilePicture ? (
                            <Image
                              src={user.profilePicture}
                              alt={user.name || "User"}
                              fill
                              className="rounded-full object-cover border-2 border-white shadow-sm"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-white">
                              {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                          )}
                          <div className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white ${user.isBlocked ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-none">{user.name || "Unknown User"}</p>
                          <p className="text-xs text-slate-500 mt-1 sm:hidden truncate max-w-[120px]">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-slate-600 font-medium hidden sm:table-cell">
                      {user.email}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`capitalize font-semibold px-2.5 py-0.5 shadow-sm border-transparent ${user.role === 'ADMIN'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                          }`}
                      >
                        {user.role === 'ADMIN' && <ShieldAlert className="w-3 h-3 mr-1 inline-block -mt-0.5" />}
                        {user.role === 'USER' && <UserCheck className="w-3 h-3 mr-1 inline-block -mt-0.5" />}
                        {user.role}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {user.isBlocked ? (
                        <Badge variant="destructive" className="font-semibold px-2.5 py-0.5 shadow-sm">
                          Blocked
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border-emerald-200 font-semibold px-2.5 py-0.5 shadow-sm transition-colors">
                          Active
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell className="text-right pr-6">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 font-semibold h-9 rounded-lg"
                        disabled={isDeleting}
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        {isDeleting ? "Deleting..." : "Delete"}
                        <Trash2 className="w-4 h-4 ml-2" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        {meta && meta.totalPage > 1 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 px-6">
            <div className="text-sm font-medium text-slate-600 hidden sm:block">
              Showing <span className="text-slate-900 font-bold">{(page - 1) * limit + 1}</span> to{" "}
              <span className="text-slate-900 font-bold">{Math.min(page * limit, meta.total || 0)}</span> of{" "}
              <span className="text-slate-900 font-bold">{meta.total || 0}</span> Users
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-xl border-slate-200 font-semibold text-slate-700 hover:bg-white hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Prev
              </Button>
              <div className="text-sm font-bold text-slate-900 sm:hidden">
                Page {page} of {meta.totalPage}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-xl border-slate-200 font-semibold text-slate-700 hover:bg-white hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all"
                disabled={page >= meta.totalPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUser;
