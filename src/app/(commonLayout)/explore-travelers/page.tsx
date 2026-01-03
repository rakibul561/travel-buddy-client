/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetAllTravelsQuery } from '@/redux/feature/travel/travel.api';
import {
  Calendar,
  CheckCircle2,
  DollarSign,
  Filter,
  Globe,
  Loader2,
  MapPin,
  Search,
  Users,
  XCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ExploreTravelers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | string>('ALL');
  const [page, setPage] = useState(1);
  const limit = 6;

  /* ---------------- Debouncing Search ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  /* ---------------- Reset Page on Filter Change ---------------- */
  useEffect(() => {
    setPage(1);
  }, [filterType]);

  /* ---------------- Query Params ---------------- */
  const queryParams: any = { page, limit };
  if (debouncedSearch) queryParams.search = debouncedSearch;
  if (filterType !== 'ALL') queryParams.travelType = filterType;

  const { data, isLoading, isError } = useGetAllTravelsQuery(queryParams);

  const travelPlans = data?.data?.data || [];
  const meta = data?.meta;

  /* ---------------- Helpers ---------------- */
  const getStatusColor = (status: string) =>
    status === 'PLANNED' ? 'bg-blue-500' : 'bg-gray-500';

  const getStatusIcon = (isActive: boolean) =>
    isActive ? (
      <CheckCircle2 className="h-4 w-4 text-[#00DC33]" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#00DC33]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">Failed to load travel plans</p>
      </div>
    );
  }

  return (
    <div className="mt-24 bg-gradient-to-br from-slate-50 to-slate-100 p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* ---------- Header ---------- */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#00DC33] rounded-xl">
              <Globe className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Explore Travelers
              </h1>
              <p className="text-slate-600">
                Discover and join exciting travel plans
              </p>
            </div>
          </div>

          {meta && (
            <p className="text-sm text-slate-600">
              <span className="font-bold">{meta.total}</span> public plans available
            </p>
          )}
        </div>

        {/* ---------- Search & Filter ---------- */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination, city or country"
              className="w-full pl-12 py-3 border-2 rounded-xl focus:border-[#00DC33] outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="pl-12 pr-6 py-3 border-2 rounded-xl focus:border-[#00DC33]"
            >
              <option value="ALL">All Types</option>
              <option value="SOLO">Solo</option>
              <option value="FAMILY">Family</option>
              <option value="COUPLE">Couple</option>
              <option value="FRIENDS">Friends</option>
            </select>
          </div>
        </div>

        {/* ---------- Cards ---------- */}
        {travelPlans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelPlans.map((plan: any) => (
                <div
                  key={plan.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={plan.image}
                      alt={plan.destination}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Status */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span
                        className={`px-3 py-1 ${getStatusColor(
                          plan.status
                        )} text-white text-xs font-semibold rounded-full`}
                      >
                        {plan.status}
                      </span>
                      {getStatusIcon(plan.isActive)}
                    </div>

                    {/* Destination */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {plan.destination}
                      </h3>
                      <p className="text-white/90 text-sm flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {plan.city}, {plan.country}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {plan.description}
                    </p>

                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-[#00DC33]" />
                      <span className="font-semibold">Travel Type:</span>
                      <span className="px-3 py-1 bg-[#00DC33]/10 text-[#00DC33] rounded-full text-xs font-semibold">
                        {plan.travelType}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="h-4 w-4 text-[#00DC33]" />
                      {formatDate(plan.startDate)} -{' '}
                      {formatDate(plan.endDate)}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <DollarSign className="h-4 w-4 text-[#00DC33]" />
                      <span className="font-bold text-[#00DC33]">
                        ${plan.budgetMin} - ${plan.budgetMax}
                      </span>
                    </div>

                    {/* User */}
                    {plan.user && (
                      <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[#00DC33] flex items-center justify-center text-white font-bold">
                          {plan.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">
                            {plan.user.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {plan.user.email}
                          </p>
                        </div>
                      </div>
                    )}

                    <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#00DC33] to-[#00C32D] text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ---------- Pagination ---------- */}
            {meta?.totalPage > 1 && (
              <div className="flex justify-center gap-4 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-5 py-2 border rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="font-semibold">
                  Page {meta.page} of {meta.totalPage}
                </span>
                <button
                  disabled={page === meta.totalPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-5 py-2 border rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-slate-700">
              No travel plans found
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
