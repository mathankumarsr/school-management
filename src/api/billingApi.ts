import { apiSlice } from "./apiSlice";

export const billingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query<any[], void>({
      query: () => "/billing",
      providesTags: ["Billing"],
    }),
    addInvoice: builder.mutation<any, Partial<any>>({
      query: (invoice) => ({
        url: "/billing",
        method: "POST",
        body: invoice,
      }),
      invalidatesTags: ["Billing"],
    }),
  }),
});

export const { useGetInvoicesQuery, useAddInvoiceMutation } = billingApi;
