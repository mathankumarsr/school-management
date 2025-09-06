import { apiSlice } from "./apiSlice";

export const admissionsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdmissions: builder.query<any[], void>({
      query: () => "/admission/profile/",
      providesTags: ["Admission"],
    }),
    getAdmissionById: builder.query<any, number>({
      query: (id) => `/admission/profile/${id}/`,
      providesTags: (_result, _err, id) => [{ type: "Admission", id }],
    }),
    addAdmission: builder.mutation<any, Partial<any>>({
      query: (admission) => ({
        url: "/admission/profile/create/",
        method: "POST",
        body: admission,
      }),
      invalidatesTags: ["Admission"],
    }),
    updateAdmission: builder.mutation<any, { id: number; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/admission/profile/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Admission", id }],
    }),
    deleteAdmission: builder.mutation<any, number>({
      query: (id) => ({
        url: `/admission/profile/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admission"],
    }),
  }),
});

export const {
  useGetAdmissionsQuery,
  useGetAdmissionByIdQuery,
  useLazyGetAdmissionByIdQuery,
  useAddAdmissionMutation,
  useUpdateAdmissionMutation,
  useDeleteAdmissionMutation,
} = admissionsApi;
