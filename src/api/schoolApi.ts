import { apiSlice } from "./apiSlice";

export const billingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  getSchoolConfig: builder.query({
      query: () => 'config',
      providesTags: ['SchoolConfig'],
    }),
    updateSchoolConfig: builder.mutation({
      query: (config) => ({
        url: 'config',
        method: 'PUT',
        body: config,
      }),
      invalidatesTags: ['SchoolConfig'],
    }),
    uploadLogo: builder.mutation({
      query: (formData) => ({
        url: 'logo',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetSchoolConfigQuery, useUpdateSchoolConfigMutation, useUploadLogoMutation } = billingApi;
