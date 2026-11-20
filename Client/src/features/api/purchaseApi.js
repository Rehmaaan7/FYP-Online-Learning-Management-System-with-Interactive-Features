import { API_BASE_URL } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseApi = createApi(
    {
        reducerPath:"purchaseApi",
        baseQuery:fetchBaseQuery({
            baseUrl:`${API_BASE_URL}/api/something/purchase`,
            credentials:"include"
        }),

        endpoints:(builder)=>({
            checkoutSession:builder.mutation({
                query:(courseId) =>({
                    url:"/checkout/create-checkout-session",
                    method:"POST",
                    body:{courseId}
                })
            }),
            getPurchaseDetialsWithStatus:builder.query({
                query:(courseId)=>({
                    url:`/course/${courseId}/detail-with-status`,
                    method:"GET",
                    // body:{courseId}
                })
            }),
            getUserPurchasedCourses:builder.query({
                query:()=>({
                    url:"/",
                    method:"GET",
                    // body:{courseId}
                })
            })
        })
    }
)

export const {useCheckoutSessionMutation,
    useGetPurchaseDetialsWithStatusQuery,
    useGetUserPurchasedCoursesQuery,
} = purchaseApi