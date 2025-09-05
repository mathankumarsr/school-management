import { apiSlice } from "./apiSlice";

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendance: builder.query<any[], void>({
      query: () => "/attendance",
      providesTags: ["Attendance"],
    }),
    markAttendance: builder.mutation<any, { studentId: string; date: string; status: string }>({
      query: (data) => ({
        url: "/attendance",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Attendance", "Student"],
    }),
  }),
});

export const { useGetAttendanceQuery, useMarkAttendanceMutation } = attendanceApi;
