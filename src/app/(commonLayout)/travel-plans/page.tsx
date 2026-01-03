/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useGetMyTravelsQuery } from '@/redux/feature/travel/travel.api';
import { Calendar, CheckCircle2, DollarSign, Loader2, MapPin, Users, XCircle } from 'lucide-react';

export default function MyTravelPlans() {
  const { data, isLoading, isError } = useGetMyTravelsQuery(undefined);

  const getStatusColor = (status:any) => {
    return status === 'PLANNED' ? 'bg-blue-500' : 'bg-gray-500';
  };

  const getStatusIcon = (isActive:any) => {
    return isActive ? (
      <CheckCircle2 className="h-4 w-4 text-[#00DC33]" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  const formatDate = (dateString:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#00DC33] animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-semibold">Loading your travel plans...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-slate-700 mb-2">Error Loading Plans</h3>
          <p className="text-slate-500">Please try again later</p>
        </div>
      </div>
    );
  }

  const travelPlans = data?.data || [];

  return (
    <div className="mt-24 bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My Travel Plans</h1>
          <p className="text-slate-600">
            Explore and manage your upcoming adventures ({travelPlans.length} {travelPlans.length === 1 ? 'plan' : 'plans'})
          </p>
        </div>

        {/* Travel Plans Grid */}
        {travelPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {travelPlans.map((plan:any) => (
              <div
                key={plan.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={plan.image}
                    alt={plan.destination}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className={`px-3 py-1 ${getStatusColor(plan.status)} text-white text-xs font-semibold rounded-full`}>
                      {plan.status}
                    </span>
                    {getStatusIcon(plan.isActive)}
                  </div>

                  {/* Destination */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{plan.destination}</h3>
                    <p className="text-white/90 text-sm flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {plan.city}, {plan.country}
                    </p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  {/* Description */}
                  {plan.description && (
                    <p className="text-slate-600 text-sm line-clamp-2">{plan.description}</p>
                  )}

                  {/* Travel Type */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-[#00DC33]" />
                    <span className="font-semibold text-slate-700">Travel Type:</span>
                    <span className="px-3 py-1 bg-[#00DC33]/10 text-[#00DC33] rounded-full text-xs font-semibold">
                      {plan.travelType}
                    </span>
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-4 w-4 text-[#00DC33]" />
                    <span className="font-semibold">Dates:</span>
                    <span>{formatDate(plan.startDate)} - {formatDate(plan.endDate)}</span>
                  </div>

                  {/* Budget */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="h-4 w-4 text-[#00DC33]" />
                    <span className="font-semibold">Budget:</span>
                    <span className="font-bold text-[#00DC33]">
                      ${plan.budgetMin} - ${plan.budgetMax}
                    </span>
                  </div>

                  {/* User Info */}
                  {plan.user && (
                    <div className="pt-4 border-t border-slate-200">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#00DC33] to-[#00AA27] flex items-center justify-center text-white font-bold">
                          {plan.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">{plan.user.name}</p>
                          <p className="text-xs text-slate-500">{plan.user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-[#00DC33] to-[#00C32D] hover:from-[#00C32D] hover:to-[#00AA27] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#00DC33]/30 transition-all duration-300 hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-200 mb-4">
              <MapPin className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Travel Plans Yet</h3>
            <p className="text-slate-500 mb-6">Start planning your next adventure!</p>
            <button className="px-8 py-3 bg-gradient-to-r from-[#00DC33] to-[#00C32D] hover:from-[#00C32D] hover:to-[#00AA27] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Create New Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
