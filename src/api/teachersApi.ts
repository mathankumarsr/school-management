import { apiSlice } from "./apiSlice";

export const teachersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<any[], void>({
      query: () => "/teachers",
      providesTags: ["Teacher"],
    }),
    addTeacher: builder.mutation<any, Partial<any>>({
      query: (teacher) => ({
        url: "/teachers",
        method: "POST",
        body: teacher,
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const { useGetTeachersQuery, useAddTeacherMutation } = teachersApi;
