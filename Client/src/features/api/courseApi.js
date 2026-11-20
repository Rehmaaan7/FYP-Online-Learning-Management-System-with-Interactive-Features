import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/course`,
    tagTypes: ["refetchTable", "refetchLectures", "lecture"],
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ title, category }) => ({
        url: "/",
        method: "POST",
        body: { title, category },
      }),
      invalidatesTags: ["refetchTable"],
    }),
    getCourses: builder.query({
      query: () => ({
        url: "/home",
        method: "GET",
      }),
    }),
    getSearchedCourses: builder.query({
      query:({searchQuery, categories, sort})=>{
          let qeuryString = `/search?query=${encodeURIComponent(searchQuery)}`

          // adding categories also into query
          if (categories && categories.length>0) {
              const categorySting = categories.map(encodeURIComponent).join(",");
              qeuryString +=`&categories=${categorySting}`

          }
          // adding sort criteria also into query
          if (sort) {
              qeuryString+=`&sort=${encodeURIComponent(sort)}`
          }
          return {
              url:qeuryString,
              method:"GET"
          }
      }
      // // query: ({ searchQeury, categories, sort }) => {
      // //   console.log("searchQeury =", searchQeury);
      // //   console.log("categories =", categories);
      // //   console.log("sort =", sort);

      // //   let queryString = `/search?searchQeury=${encodeURIComponent(searchQeury || "")}`;

      // //   if (categories?.length > 0) {
      // //     queryString += `&categories=${categories.join(",")}`;
      // //   }

      // //   if (sort) {
      // //     queryString += `&sort=${sort}`;
      // //   }

      // //   return {
      // //     url: queryString,
      // //     method: "GET",
      // //   };
      // },
    }),
    getCreatorCourses: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["refetchTable"],
    }),
    updateCoure: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["refetchTable"],
    }),
    getCourse: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lectures`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getLecture: builder.query({
      query: (lectureId) => ({
        url: `/lectures/${lectureId}`,
        method: "GET",
      }),
      providesTags: ["lecture"],
    }),

    getLectures: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lectures`,
        method: "GET",
      }),
      providesTags: ["refetchLectures"],
    }),
    updateLecture: builder.mutation({
      query: ({
        lectureTitle,
        videoInfo,
        isPreviewFree,
        courseId,
        lectureId,
      }) => ({
        url: `/${courseId}/lectures/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoInfo, isPreviewFree },
      }),
      invalidatesTags: ["refetchLectures", "lecture"],
    }),
    deleteLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lectures/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["refetchLectures, refetchLectures"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCoursesQuery,
  useGetSearchedCoursesQuery,
  useGetCreatorCoursesQuery,
  useUpdateCoureMutation,
  useGetCourseQuery,
  useCreateLectureMutation,
  useGetLecturesQuery,
  useUpdateLectureMutation,
  useDeleteLectureMutation,
  useGetLectureQuery,
  useToglePublishMutation,
} = courseApi;
