import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api", // your backend base URL
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth?.token; 
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Auth", "Student", "Teacher", "Admission", "Billing", "Attendance"],
  endpoints: () => ({}), // extended by other files
});
