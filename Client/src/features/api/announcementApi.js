import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dummy data used until the real backend endpoints are implemented.
// Shape mirrors the thesis DB design:
// Announcements: courseId, message, postedBy, postedAt, isGlobal


export const announcementApi = createApi({
  reducerPath: "announcementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/announcement`,
    tagTypes: ["refetchAnnouncements"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAnnouncements: builder.query({
      query: (courseId) => ({
        url: courseId ? `/instructor/${courseId}/announcement` : "/system/announcement",
        method: "GET",
      }),
      
      providesTags: ["refetchAnnouncements"],
    }),
    createAnnouncement: builder.mutation({
      query: ({ courseId, message, isGlobal }) => ({
        url:`/instructor/${courseId}/announcement`,
        method: "POST",
        body: { message, isGlobal },
      }),
     
      invalidatesTags: ["refetchAnnouncements"],
    }),
    deleteAnnouncement: builder.mutation({
      query: (announcementId) => ({
        url: `/instructor/course/${announcementId}`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["refetchAnnouncements"],
    }),
  }),
});

export const {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
