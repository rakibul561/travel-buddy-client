import { baseApi } from "../../baseApi";

export const joinRequestApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendJoinRequest: builder.mutation({
            query: (data) => ({
                url: "/join-request",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["JOIN_REQUEST"],
        }),

        getRequestsForMyTrips: builder.query({
            query: () => ({
                url: "/join-request/my-trips",
                method: "GET",
            }),
            providesTags: ["JOIN_REQUEST"],
        }),

        updateJoinRequestStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/join-request/${id}`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["JOIN_REQUEST"],
        }),
    }),
});

export const {
    useSendJoinRequestMutation,
    useGetRequestsForMyTripsQuery,
    useUpdateJoinRequestStatusMutation,
} = joinRequestApi;
