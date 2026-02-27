/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetAllTravelsQuery } from '@/redux/feature/travel/travel.api';
import {
  Calendar,
  DollarSign,
  Filter,
  Globe,
  Loader2,
  MapPin,
  Search,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import TravelPlanCard from '@/components/travel/TravelPlanCard';

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
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  /* ---------------- Loading ---------------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-red-500 font-semibold text-lg">Failed to load travel plans. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* ---------- Header ---------- */}
        <div className="mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
            <Globe className="w-4 h-4" />
            <span>Global Community</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-display mb-4">
            Explore <span className="text-primary">Travel Plans</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            Find your perfect travel buddy, join existing plans, or get inspired for your next adventure.
          </p>
        </div>

        {/* ---------- Search & Filter Bar ---------- */}
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-slate-100 mb-10 flex flex-col md:flex-row gap-4 sticky top-24 z-30">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by destination (e.g., Paris, Bali)..."
              className="w-full pl-12 py-3 bg-slate-50 border-transparent focus:bg-white border-2 focus:border-primary rounded-xl outline-none transition-all"
            />
          </div>

          <div className="relative min-w-[200px] group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full pl-12 pr-10 py-3 bg-slate-50 border-transparent focus:bg-white border-2 focus:border-primary rounded-xl outline-none appearance-none cursor-pointer transition-all"
            >
              <option value="ALL">All Types</option>
              <option value="SOLO">Solo Adventure</option>
              <option value="FAMILY">Family Trip</option>
              <option value="COUPLE">Couples</option>
              <option value="FRIENDS">Friends Group</option>
            </select>
          </div>
        </div>

        {/* ---------- Results Meta ---------- */}
        {meta && (
          <p className="text-sm text-slate-500 mb-6 font-medium">
            Showing <span className="text-slate-900 font-bold">{meta.total}</span> travel plans
          </p>
        )}

        {/* ---------- Cards Grid ---------- */}
        {travelPlans.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {travelPlans.map((plan: any) => (
                <TravelPlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* ---------- Pagination ---------- */}
            {meta?.totalPage > 1 && (
              <div className="flex justify-center gap-4 mt-16">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-xl px-6"
                >
                  Previous
                </Button>
                <div className="flex items-center px-4 font-bold text-slate-900 bg-white rounded-xl border border-slate-200 shadow-sm">
                  Page {meta.page} of {meta.totalPage}
                </div>
                <Button
                  variant="outline"
                  disabled={page === meta.totalPage}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-xl px-6"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Search size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              No travel plans found
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any trips matching your search. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="link"
              className="text-primary mt-4"
              onClick={() => { setSearchTerm(''); setFilterType('ALL') }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

