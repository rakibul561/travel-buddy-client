/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMatchTravelQuery } from "@/redux/feature/travel/travel.api";
import Link from "next/link";
import { useState } from "react";

const MatchTravel = () => {
  const [filters, setFilters] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    minBudget: "",
    maxBudget: "",
    flexDays: 3,
  });

  const { data, isLoading, isError } = useMatchTravelQuery(
     {
      destination: filters.destination,
      startDate: filters.startDate,
      endDate: filters.endDate,
      minBudget: filters.minBudget
        ? Number(filters.minBudget)
        : undefined,
      maxBudget: filters.maxBudget
        ? Number(filters.maxBudget)
        : undefined,
      flexDays: filters.flexDays,
    },
    {
      skip:
        !filters.destination ||
        !filters.startDate ||
        !filters.endDate,
    }
  );



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 🔹 Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Find Your Travel Buddy
          </h1>
          <p className="text-gray-600 text-lg">
            Discover fellow travelers with similar plans and make your journey memorable
          </p>
        </div>

        {/* 🔹 Search Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Criteria
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Destination */}
            <div className="lg:col-span-3">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Destination
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Where do you want to go? (e.g., Paris, Tokyo, New York)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                onChange={handleChange}
                value={filters.destination}
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                onChange={handleChange}
                value={filters.startDate}
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                onChange={handleChange}
                value={filters.endDate}
              />
            </div>

            {/* Flexibility */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Date Flexibility
              </label>
              <select
                name="flexDays"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all bg-white"
                onChange={handleChange}
                value={filters.flexDays}
              >
                <option value={1}>±1 Day</option>
                <option value={3}>±3 Days</option>
                <option value={5}>±5 Days</option>
                <option value={7}>±7 Days</option>
              </select>
            </div>

            {/* Min Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Minimum Budget
              </label>
              <input
                type="number"
                name="minBudget"
                placeholder="Min Budget ($)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                onChange={handleChange}
                value={filters.minBudget}
              />
            </div>

            {/* Max Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <svg className="inline w-4 h-4 mr-1 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Maximum Budget
              </label>
              <input
                type="number"
                name="maxBudget"
                placeholder="Max Budget ($)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
                onChange={handleChange}
                value={filters.maxBudget}
              />
            </div>
          </div>
        </div>

        {/* 🔹 Results Section */}
        <div>
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="mt-4 text-gray-600 text-lg">Finding your perfect travel matches...</p>
            </div>
          )}

          {isError && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-red-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 font-semibold">Something went wrong 😥</p>
              <p className="text-red-600 mt-2">Please try again later</p>
            </div>
          )}

          {!isLoading && data?.data?.length === 0 && (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-8 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 text-lg font-medium">No matching travel plans found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((plan: any) => (
              <div
                key={plan.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:border-indigo-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Destination */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {plan.destination}
                  </h3>
                </div>

                {/* Dates */}
                <div className="bg-indigo-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">
                      {new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="font-medium">
                      {new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </p>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold">${plan.budgetMin} - ${plan.budgetMax}</span>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t-2 border-gray-100">
                  <img
                    src={plan.user.profilePicture || "/avatar.png"}
                    alt={plan.user.name}
                    className="w-10 h-10 rounded-full ring-2 ring-indigo-200"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    {plan.user.name}
                  </span>
                </div>

                {/* View Details Button */}
                <Link
                  href={`/travel-plans/${plan.id}`}
                  className="mt-4 block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchTravel;
