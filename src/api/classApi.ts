import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ClassData, CreateClassRequest, UpdateClassRequest, ApiResponse } from '../utils/types';
import { apiSlice } from "./apiSlice";

export const classApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClasses: builder.query<ApiResponse<ClassData[]>, void>({
       async queryFn() {
        const mockResponse = {
          success: true,
          data: [
            {
              id: "class-123",
              grade: "1",
              gradeName: "Grade 1",
              sections: [
                {
                  id: "section-456",
                  name: "A",
                  capacity: 30,
                  currentStudents: 25,
                },
              ],
              academicYear: "2024-2025",
              isActive: true,
              createdAt: "2024-01-15T10:30:00Z",
              updatedAt: "2024-01-20T14:45:00Z",
            },
          ],
          message: "Classes retrieved successfully",
        };

        return { data: mockResponse }; // ✅ shape matches RTK Query expectations
      },
      providesTags: ['Class'],
    }),
    getClassById: builder.query<ApiResponse<ClassData>, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Class', id }],
    }),
    createClass: builder.mutation<ApiResponse<ClassData>, CreateClassRequest>({
      query: (newClass) => ({
        url: '',
        method: 'POST',
        body: newClass,
      }),
      invalidatesTags: ['Class'],
    }),
    updateClass: builder.mutation<ApiResponse<ClassData>, UpdateClassRequest>({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Class', id }],
    }),
    deleteClass: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Class'],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useGetClassByIdQuery,
    useCreateClassMutation,
    useUpdateClassMutation,
    useDeleteClassMutation,
} = classApi;
