/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useGetMyTravelsQuery } from '@/redux/feature/travel/travel.api';
import { Loader2, MapPin, Plus } from 'lucide-react';
import TravelPlanCard from '@/components/travel/TravelPlanCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MyTravelPlans() {
  const { data, isLoading, isError } = useGetMyTravelsQuery(undefined);

  const travelPlans = data?.data || [];

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">Error Loading Plans</p>
          <Button variant="outline" onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold font-display text-slate-900 mb-2">My Travel Plans</h1>
            <p className="text-slate-600 text-lg">
              Manage your upcoming adventures and track your journey status.
            </p>
          </div>
          <Link href="/user/dashboard/create-travel">
            <Button className="btn-primary flex items-center gap-2 rounded-xl h-12 px-6 shadow-glow">
              <Plus className="w-5 h-5" /> Create New Plan
            </Button>
          </Link>
        </div>

        {/* Travel Plans Grid */}
        {travelPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {travelPlans.map((plan: any) => (
              <TravelPlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 mb-6 text-slate-300">
              <MapPin className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No Travel Plans Yet</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              You haven't created any travel plans yet. Start planning your next adventure today!
            </p>
            <Link href="/user/dashboard/create-travel">
              <Button className="btn-primary rounded-full h-12 px-8 shadow-lg">
                Start Planning
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

