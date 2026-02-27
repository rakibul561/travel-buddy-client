import { baseApi } from "../../baseApi";

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminStats: builder.query({
            query: () => ({
                url: "/admin/stats",
                method: "GET",
            }),
            providesTags: ["USER", "TRAVEL", "JOIN_REQUEST", "PAYMENT"],
        }),
    }),
});

export const { useGetAdminStatsQuery } = adminApi;
