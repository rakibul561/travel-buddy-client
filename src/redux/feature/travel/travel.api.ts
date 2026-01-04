/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { baseApi } from "../../baseApi";

export const travelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔹 Create Travel (FormData: file + data)
    createTravel: builder.mutation({
      query: (formData: FormData) => ({
        url: "/travel-plans",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["TRAVEL"],
    }),

    getSingleTravels: builder.query<any, string>({
      query: (id) => ({
        url: `/travel-plans/${id}`,
        method: "GET",
      }),
      providesTags: ["TRAVEL"],
    }),

    // 🔹 Get all travels (for user/admin)
    getAllTravels: builder.query<
      any,
      {
        page?: number;
        limit?: number;
        search?: string;
        travelType?: string;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: (params) => ({
        url: "/travel-plans",
        method: "GET",
        params,
      }),
      providesTags: ["TRAVEL"],
    }),

    sendJoinRequest: builder.mutation<any, { travelPlanId: string }>({
      query: ({ travelPlanId }) => ({
        url: "/join-requests",
        method: "POST",
        body: { travelPlanId },
      }),
      invalidatesTags: ["TRAVEL"],
    }),

    // 🔹 Match Travel
    matchTravel: builder.query({
      query: (params) => ({
        url: "/travel-plans/match",
        method: "GET",
        params,
      }),
      providesTags: ["TRAVEL"],
    }),

    // 🔹 Complete Travel
    completeTravel: builder.mutation({
      query: (travelId: string) => ({
        url: `/travel-plans/${travelId}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["TRAVEL"],
    }),

    // 🔹 My Travels (optional but recommended)
    getMyTravels: builder.query({
      query: () => ({
        url: "/travel-plans/my",
        method: "GET",
      }),
      providesTags: ["TRAVEL"],
    }),

    createSubscription: builder.mutation<
      any,
      { plan: "MONTHLY" | "YEARLY" | "FREE" }
    >({
      query: (body) => ({
        url: "/payment/subscription",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["TRAVEL"],
    }),

    getAllpayment: builder.query({
      query: () => ({
        url: "/payment",
        method: "GET",
      }),
      providesTags: ["PAYMENT"],
    }),
  }),
});

export const {
  useCreateTravelMutation,
  useGetAllTravelsQuery,
  useMatchTravelQuery,
  useCompleteTravelMutation,
  useGetMyTravelsQuery,
  useGetAllpaymentQuery,
  useGetSingleTravelsQuery,
  useSendJoinRequestMutation,
  useCreateSubscriptionMutation,
} = travelApi;
