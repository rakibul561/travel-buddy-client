"use client";

import { useGetMyReceivedRequestsQuery, useGetMySentRequestsQuery, useRespondToJoinRequestMutation } from "@/redux/feature/travel/travel.api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Clock, MapPin, User, X } from "lucide-react";
import toast from "react-hot-toast";

export default function JoinRequestsPage() {
  const { data: sentData, isLoading: sentLoading } = useGetMySentRequestsQuery(undefined);
  const { data: receivedData, isLoading: receivedLoading } = useGetMyReceivedRequestsQuery(undefined);
  const [respondToRequest, { isLoading: isResponding }] = useRespondToJoinRequestMutation();

  const sentRequests = sentData?.data || [];
  const receivedRequests = receivedData?.data || [];

  const handleRespond = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    try {
      await respondToRequest({ requestId, status }).unwrap();
      toast.success(`Request ${status === 'APPROVED' ? 'accepted' : 'rejected'} successfully`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Failed to update request status");
    }
  };

  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">Pending</Badge>;
    }
  };

  if (sentLoading || receivedLoading) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-display text-primary">Join Requests</h1>
        <p className="text-muted-foreground">Manage your incoming and outgoing travel buddy requests</p>
      </div>

      <Tabs defaultValue="received" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-12 rounded-xl bg-gray-100 p-1">
          <TabsTrigger value="received" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Received Requests ({receivedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Sent Requests ({sentRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* RECEIVED REQUESTS */}
        <TabsContent value="received" className="space-y-4">
          {receivedRequests.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-gray-200">
              <p className="text-slate-500">No requests received yet.</p>
            </div>
          ) : (
            receivedRequests.map((request: any) => (
              <Card key={request.id} className="overflow-hidden border-none shadow-md">
                <CardHeader className="bg-gray-50/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {request.user.name?.[0] || <User />}
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">
                          {request.user.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          wants to join your trip to <span className="font-semibold text-gray-900">{request.travel.destination}</span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User size={16} className="text-primary" />
                      <span className="font-semibold">Contact:</span> {request.user.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-primary" />
                      <span className="font-semibold">Requested on:</span> {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  {request.status === "PENDING" && (
                    <div className="flex gap-3 justify-end">
                      <Button
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleRespond(request.id, "REJECTED")}
                        disabled={isResponding}
                      >
                        <X size={16} className="mr-2" /> Reject
                      </Button>
                      <Button
                        className="bg-primary hover:bg-primary/90 text-white"
                        onClick={() => handleRespond(request.id, "APPROVED")}
                        disabled={isResponding}
                      >
                        <Check size={16} className="mr-2" /> Accept
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* SENT REQUESTS */}
        <TabsContent value="sent" className="space-y-4">
          {sentRequests.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-gray-200">
              <p className="text-slate-500">You haven't sent any requests yet.</p>
            </div>
          ) : (
            sentRequests.map((request: any) => (
              <Card key={request.id} className="overflow-hidden border-none shadow-md">
                <CardHeader className="bg-gray-50/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold overflow-hidden">
                        <img
                          src={request?.travel?.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=2021&q=80"}
                          alt="Trip"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold">
                          Trip to {request?.travel?.destination || "Unknown Destination"}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          Hosted by <span className="font-semibold text-gray-900">{request?.travel?.user?.name || "Unknown Host"}</span>
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-primary" />
                      <span className="font-semibold">Destination:</span> {request?.travel?.destination || "N/A"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} className="text-primary" />
                      <span className="font-semibold">Sent on:</span> {new Date(request.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
