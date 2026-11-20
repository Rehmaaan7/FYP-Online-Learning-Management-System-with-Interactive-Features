import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/quiz`,
    tagTypes: ["refetchQuizzes", "refetchResults"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: (courseId) => ({
        url: `/quizzes/${courseId}`,
        method: "GET",
      }),
      
      providesTags: ["refetchQuizzes"],
    }),
    getQuiz: builder.query({
      query: (quizId) => ({
        url: `/quiz/${quizId}`,
        method: "GET",
      }),
      
    }),
    createQuiz: builder.mutation({
      query: ({ courseId, title, timeLimit, questions }) => ({
        url: `/quizfor/${courseId}`,
        method: "POST",
        body: { title, timeLimit, questions },
      }),
      
      invalidatesTags: ["refetchQuizzes"],
    }),
    deleteQuiz: builder.mutation({
      query: (quizId) => ({
        url: `/delete/${quizId}`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["refetchQuizzes"],
    }),
    submitQuizAttempt: builder.mutation({
      query: ({ quizId, answers }) => ({
        url: `/quiz/${quizId}/attempt`,
        method: "POST",
        body: { answers },
      }),
     
      invalidatesTags: ["refetchResults"],
    }),
    getResults: builder.query({
      query: (quizId) => ({
        url: `/quizzes/${quizId}/results`,
        method: "GET",
      }),
      providesTags: ["refetchResults"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
  useSubmitQuizAttemptMutation,
  useGetResultsQuery,
} = quizApi;
