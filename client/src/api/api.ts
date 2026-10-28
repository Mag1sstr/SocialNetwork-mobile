import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import type { IUser } from "./apiTypes";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({ url: "/auth/me" }),
    }),
    login: builder.mutation<IUser, { login: string; password: string }>({
      query: (body) => ({
        url: "/auth/me",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<
      {},
      { username: string; email: string; password: string }
    >({
      query: (body) => ({ url: "/register", method: "POST", body }),
    }),
  }),
});
