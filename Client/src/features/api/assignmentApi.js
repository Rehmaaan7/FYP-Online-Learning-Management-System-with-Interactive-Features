import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dummy data used until the real backend endpoints are implemented.
// Shape mirrors the thesis DB design:
// Assignments: courseId, title, instructions, deadline, createdBy
// Submissions: assignmentId, studentId, fileUrl, submittedAt, grade, feedback




export const assignmentApi = createApi({
  reducerPath: "assignmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/assignment`,
    tagTypes: ["refetchAssignments", "refetchSubmissions"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: (courseId) => ({
        url: `/instructor/assignment/${courseId}`,
        method: "GET",
      }),
     
      providesTags: ["refetchAssignments"],
    }),
    createAssignment: builder.mutation({
      query: ({ courseId, title, instructions, deadline }) => ({
        url: `/instructor/assignment/${courseId}`,
        method: "POST",
        body: { title, instructions, deadline },
      }),
     
      invalidatesTags: ["refetchAssignments"],
    }),
    deleteAssignment: builder.mutation({
      query: (assignmentId) => ({
        url: `/instructor/assignment/${assignmentId}`,
        method: "DELETE",
      }),
     
      invalidatesTags: ["refetchAssignments"],
    }),
    submitAssignment: builder.mutation({
      query: ({ assignmentId, formData }) => ({
        url: `/student/${assignmentId}/submit`,
        method: "POST",
        body: formData,
      }),
     
      invalidatesTags: ["refetchSubmissions"],
    }),
    getSubmissions: builder.query({
      query: (assignmentId) => ({
        url: `/instructor/${assignmentId}/submissions`,
        method: "GET",
      }),
     
      providesTags: ["refetchSubmissions"],
    }),
    gradeSubmission: builder.mutation({
      query: ({ submissionId, grade, feedback }) => ({
        url: `/instructor/submissions/${submissionId}/grade`,
        method: "PUT",
        body: { grade, feedback },
      }),
     
      invalidatesTags: ["refetchSubmissions"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useDeleteAssignmentMutation,
  useSubmitAssignmentMutation,
  useGetSubmissionsQuery,
  useGradeSubmissionMutation,
} = assignmentApi;
