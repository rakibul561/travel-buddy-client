/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { useMatchTravelQuery } from "../../../../../redux/feature/travel/travel.api";

const MatchTravelPage = () => {
  // এখন temporarily hardcoded (later dropdown থেকে আসবে)
  const [travelId, setTravelId] = useState(
    "4c777974-00b1-45d4-be2f-a2cd805afad5"
  );

  const { data, isLoading, error } = useMatchTravelQuery(travelId, {
    skip: !travelId,
  });

  console.log("MATCH RESPONSE:", data);

  if (isLoading) {
    return <p>Loading matched travels...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Matched Travels</h1>

      {data?.length === 0 && (
        <p className="text-gray-500">No match found</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((travel: any) => (
          <Card key={travel.id}>
            <CardHeader>
              <CardTitle>{travel.destination}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <p>
                <strong>Country:</strong> {travel.country}
              </p>
              <p>
                <strong>City:</strong> {travel.city}
              </p>
              <p>
                <strong>Travel Type:</strong> {travel.travelType}
              </p>
              <p>
                <strong>Budget:</strong> {travel.budgetMin} - {travel.budgetMax}
              </p>

              <Button className="mt-3 w-full">
                Send Join Request
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MatchTravelPage;
