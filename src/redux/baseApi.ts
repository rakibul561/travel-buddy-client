"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["USER", "TRAVEL", "PAYMENT", "REQUESTS", "REVIEW", "JOIN_REQUEST"],
  endpoints: () => ({}),
});
