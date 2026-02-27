import { baseApi } from "../../baseApi";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: "/reviews",
                method: "POST",
                data,
            }),
            invalidatesTags: ["REVIEW"],
        }),
        getReviewsByTravelPlan: builder.query({
            query: (travelPlanId) => ({
                url: `/reviews/travel-plan/${travelPlanId}`,
                method: "GET",
            }),
            providesTags: ["REVIEW"],
        }),
    }),
});

export const { useCreateReviewMutation, useGetReviewsByTravelPlanQuery } = reviewApi;
