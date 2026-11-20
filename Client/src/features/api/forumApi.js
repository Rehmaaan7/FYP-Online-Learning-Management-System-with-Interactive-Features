import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dummy data used until the real backend endpoints are implemented.
// Shape mirrors the thesis DB design (Forums: courseId, title, createdBy, posts[]).


export const forumApi = createApi({
  reducerPath: "forumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/forum`,
    tagTypes: ["refetchForums", "refetchPosts"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getForums: builder.query({
      query: (courseId) => ({
        url: `forum/${courseId}`,
        method: "GET",
      }),
      
      providesTags: ["refetchForums"],
    }),
    createForum: builder.mutation({
      query: ({ courseId, title }) => ({
        url: `forum/${courseId}`,

        method: "POST",
        body: { title },
      }),

      invalidatesTags: ["refetchForums"],
    }),
    getPosts: builder.query({
      query: (forumId) => ({
        url: `/posts/${forumId}`,
        method: "GET",
      }),
     
      providesTags: ["refetchPosts"],
    }),
    createPost: builder.mutation({
      query: ({ forumId, message }) => ({
        url: `/posts/${forumId}`,
        method: "POST",
        body: { message },
      }),
      invalidatesTags: ["refetchPosts"],
    }),
    deletePost: builder.mutation({
      query: ({ forumId, postId }) => ({
        url: `/posts/${forumId}/${postId}`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["refetchPosts"],
    }),
  }),
});

export const {
  useGetForumsQuery,
  useCreateForumMutation,
  useGetPostsQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = forumApi;
