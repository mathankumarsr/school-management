import { apiSlice } from "./apiSlice";

export const admissionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissions: builder.query<any[], void>({
      query: () => "/admissions",
      providesTags: ["Admission"],
    }),
    addAdmission: builder.mutation<any, Partial<any>>({
      query: (admission) => ({
        url: "/admissions",
        method: "POST",
        body: admission,
      }),
      invalidatesTags: ["Admission", "Student"],
    }),
  }),
});

export const { useGetAdmissionsQuery, useAddAdmissionMutation } = admissionsApi;
