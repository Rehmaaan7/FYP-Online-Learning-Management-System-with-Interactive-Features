import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/lib/config";

// Dummy data used until the real backend endpoints are implemented.
// Covers the Administrator responsibilities from the thesis (Ch 3.4):
// user management & role assignment, course oversight (activate/deactivate/delete
// any course), and system-wide announcements/configuration.




export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/admin-panel`,
    tagTypes: ["refetchUsers", "refetchAllCourses", "refetchSystemAnnouncements"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // --- User management & role assignment ---
    getUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
     
      providesTags: ["refetchUsers"],
    }),
  
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `/admin/users/${userId}/role`,
        method: "PUT",
        body: { role },
      }),
     
      invalidatesTags: ["refetchUsers"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}/delete`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["refetchUsers"],
    }),

    // --- Course oversight (any course, not just own) ---
    getAllCoursesAdmin: builder.query({
      query: () => ({
        url: "/admin/courses",
        method: "GET",
      }),
      
      providesTags: ["refetchAllCourses"],
    }),
    setCourseStatus: builder.mutation({
      query: ({ courseId, status }) => ({
        url: `/admin/courses/${courseId}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["refetchAllCourses"],
    }),
    deleteCourseAdmin: builder.mutation({
      query: (courseId) => ({
        url: `/admin/courses/${courseId}`,
        method: "DELETE",
      }),
      
      invalidatesTags: ["refetchAllCourses"],
    }),

    // --- System-wide announcements / configuration ---
    getSystemAnnouncements: builder.query({
      query: () => ({
        url: "/admin/system-announcements",
        method: "GET",
      }),
     
      providesTags: ["refetchSystemAnnouncements"],
    }),
    createSystemAnnouncement: builder.mutation({
      query: (message) => ({
        url: "/admin/system-announcements",
        method: "POST",
        body: { message },
      }),
     
      invalidatesTags: ["refetchSystemAnnouncements"],
    }),
    deleteSystemAnnouncement: builder.mutation({
      query: (announcementId) => ({
        url: `admin/system-announcements/${announcementId}`,
        method: "DELETE",
      }),
     
      invalidatesTags: ["refetchSystemAnnouncements"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAllCoursesAdminQuery,
  useSetCourseStatusMutation,
  useDeleteCourseAdminMutation,
  useGetSystemAnnouncementsQuery,
  useCreateSystemAnnouncementMutation,
  useDeleteSystemAnnouncementMutation,
} = adminApi;
