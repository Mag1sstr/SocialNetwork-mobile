import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({}),
});
