"use client";

import { useMatchTravelQuery } from "@/redux/feature/travel/travel.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Users, Calendar, Filter, User } from "lucide-react";
import { useState } from "react";
import Loading from "@/components/shared/Loading";
import Link from "next/link";

export default function MatchTravelPage() {
  const [filters, setFilters] = useState({
    destination: "",
    minBudget: "",
    maxBudget: "",
    travelType: "",
  });

  // Construct query params
  const queryParams = {
    ...filters,
  };

  const { data, isLoading, isFetching } = useMatchTravelQuery(queryParams);
  const potentialMatches = data?.data || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // filters are already in state, query will auto-refetch due to RTK Query
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl font-bold font-display text-primary">Find Your Travel Buddy</h1>
        <p className="text-muted-foreground text-lg">Discover fellow travelers with similar plans and make your journey memorable</p>
      </div>

      {/* Search & Filter Section */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent" />

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">
              <MapPin size={16} className="text-primary" /> Destination
            </Label>
            <div className="relative">
              <Input
                placeholder="Where to?"
                className="pl-10 h-12 rounded-xl bg-gray-50 border-gray-200"
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">Travel Type</Label>
            <Select onValueChange={(val) => setFilters({ ...filters, travelType: val })}>
              <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200">
                <SelectValue placeholder="Any Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Adventure">Adventure</SelectItem>
                <SelectItem value="Leisure">Leisure</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Backpacking">Backpacking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range - Simplified as inputs for now */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 font-medium">Budget Range</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Min"
                type="number"
                className="h-12 rounded-xl bg-gray-50 border-gray-200"
                value={filters.minBudget}
                onChange={(e) => setFilters({ ...filters, minBudget: e.target.value })}
              />
              <Input
                placeholder="Max"
                type="number"
                className="h-12 rounded-xl bg-gray-50 border-gray-200"
                value={filters.maxBudget}
                onChange={(e) => setFilters({ ...filters, maxBudget: e.target.value })}
              />
            </div>
          </div>

          <Button type="submit" className="h-12 rounded-xl btn-primary font-bold shadow-lg shadow-primary/20">
            Search Matches
          </Button>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Users className="text-primary" /> Suggested Matches
          {isFetching && <span className="text-sm font-normal text-muted-foreground ml-2 animate-pulse">Finding buddies...</span>}
        </h2>

        {isLoading ? (
          <Loading />
        ) : potentialMatches.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-3xl">
            <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-4">
              <Users className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No matches found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or destination</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potentialMatches.map((match: any) => (
              <div key={match.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-gray-100">
                      <img
                        src={match.user?.profilePicture || `https://ui-avatars.com/api/?name=${match.user?.fullName}`}
                        alt={match.user?.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{match.user?.fullName || "Traveler"}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin size={10} /> {match.user?.address || "World Citizen"}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    {match.travelType}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                    Trip to {match.destination}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{match.description}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                      <Calendar size={14} className="text-primary" />
                      {new Date(match.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
                      <User size={14} className="text-primary" />
                      Est. ${match.budget}
                    </span>
                  </div>
                </div>

                <Link href={`/travel-plans/${match.id}`}>
                  <Button className="w-full rounded-xl bg-gray-900 text-white hover:bg-primary hover:text-white transition-all">
                    View Details & Connect
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
