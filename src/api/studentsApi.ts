import { apiSlice } from "./apiSlice";

export const studentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query<any[], void>({
      query: () => "/students",
      providesTags: ["Student"],
    }),
    getStudentById: builder.query<any, string>({
      query: (id) => `/students/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Student", id }],
    }),
    addStudent: builder.mutation<any, Partial<any>>({
      query: (newStudent) => ({
        url: "/students",
        method: "POST",
        body: newStudent,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation<any, { id: string; data: Partial<any> }>({
      query: ({ id, data }) => ({
        url: `/students/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_res, _err, { id }) => [{ type: "Student", id }],
    }),
    deleteStudent: builder.mutation<void, string>({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;
