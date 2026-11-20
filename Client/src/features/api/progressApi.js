import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const progressApi = new createApi({
    reducerPath:"progressApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${API_BASE_URL}/api/something/progress`,
        credentials:"include"
    }),

    endpoints:(builder)=>({
        getCourseProgress:builder.query({
            query:(courseId)=>({
                url:`/${courseId}`,
                method:"GET",
            })
        }),

        updateProgress:builder.mutation({
            query:({courseId,lectureId})=>({
                url:`/${courseId}/lecture/${lectureId}/view`,
                method:"POST"
                
            })
        }),
        markCompleted:builder.mutation({
            query:(courseId)=>({
                url:`/${courseId}/markcompleted`,
                method:"POST"
            })
        }),
        markInCompleted:builder.mutation({
            query:(courseId)=>({
                url:`/${courseId}/markincompleted`,
                method:"POST"
            })
        })
    })

})

export const {
    useGetCourseProgressQuery,
    useUpdateProgressMutation,
    useMarkCompletedMutation,
    useMarkInCompletedMutation
} = progressApi