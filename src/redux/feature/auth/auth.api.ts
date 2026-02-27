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

    googleLogin: builder.mutation({
      query: (code) => ({
        url: "/auth/google",
        method: "POST",
        data: { code },
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
    allUser: builder.query({
      query: ({ page, limit }) => ({
        url: "/users",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["USER"],
    }),
    allUserFromDb: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    updateUser: builder.mutation({
      query: (formData) => ({
        url: "/users/profile",
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["USER"],
    }),

    deleteUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),

    sendOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/send",
        method: "POST",
        data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/otp/verify",
        method: "POST",
        data,
      }),
    }),
  }),
});
export const {
  useLogInMutation,
  useGoogleLoginMutation,
  useUserInfoQuery,
  useRegisterMutation,
  useLogOutMutation,
  useAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useAllUserFromDbQuery,
  useSendOtpMutation,
  useVerifyOtpMutation
} = authApi;
