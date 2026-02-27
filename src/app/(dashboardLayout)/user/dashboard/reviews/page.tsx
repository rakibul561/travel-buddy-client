"use client";

import { useUserInfoQuery } from "@/redux/feature/auth/auth.api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Star, ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function ReviewsPage() {
  const { data: userData } = useUserInfoQuery(undefined);

  // Placeholder reviews data since we don't have a backend endpoint for this yet
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      rating: 5,
      date: "2024-03-15",
      content: "An amazing travel buddy! Very organized and fun to be around. We had a great time in Tokyo.",
      trip: "Trip to Tokyo, Japan"
    },
    {
      id: 2,
      author: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      rating: 5,
      date: "2024-02-10",
      content: "Highly recommend travelling with them. Great communication throughout the planning process.",
      trip: "Backpacking in Peru"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold font-display text-primary">My Reviews</h1>
          <p className="text-muted-foreground">See what others are saying about their trips with you</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div className="flex items-center gap-1 text-amber-400">
            <Star fill="currentColor" size={20} />
            <span className="text-2xl font-bold text-slate-800">5.0</span>
          </div>
          <span className="text-sm text-slate-500 font-medium">Average Rating</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar Side */}
                <div className="flex-shrink-0 flex md:flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                    <img src={review.avatar} alt={review.author} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="font-bold text-slate-900">{review.author}</h3>
                    <p className="text-xs text-slate-500">Verified Traveler</p>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-amber-400" : "text-gray-300"} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl relative">
                    <MessageSquare className="absolute top-4 left-4 text-slate-200 w-8 h-8 -z-0" />
                    <p className="text-slate-700 relative z-10 italic">"{review.content}"</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <ThumbsUp size={14} />
                    <span>Trip: {review.trip}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
