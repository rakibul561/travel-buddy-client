"use client";
import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/users/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    logIn: builder.mutation({
      query: (loginfo) => ({
        url: "/auth/login",
        method: "POST",
        data: loginfo,
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});
export const {
  useLogInMutation,
  useUserInfoQuery,
  useRegisterMutation,
  useLogOutMutation,
} = authApi;
