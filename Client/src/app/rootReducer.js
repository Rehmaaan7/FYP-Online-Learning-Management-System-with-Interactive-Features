import { apiAuth } from "@/features/api/apiAuth"
import {combineReducers} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import {courseApi} from "../features/api/courseApi"
import { purchaseApi } from "@/features/api/purchaseApi"
import { progressApi } from "@/features/api/progressApi"
import { forumApi } from "@/features/api/forumApi"
import { assignmentApi } from "@/features/api/assignmentApi"
import { quizApi } from "@/features/api/quizApi"
import { announcementApi } from "@/features/api/announcementApi"
import { adminApi } from "@/features/api/adminApi"



const rootReducer = combineReducers({
    [apiAuth.reducerPath]:apiAuth.reducer,
    [courseApi.reducerPath]:courseApi.reducer,
    [purchaseApi.reducerPath]:purchaseApi.reducer,
    [progressApi.reducerPath]:progressApi.reducer,
    [forumApi.reducerPath]:forumApi.reducer,
    [assignmentApi.reducerPath]:assignmentApi.reducer,
    [quizApi.reducerPath]:quizApi.reducer,
    [announcementApi.reducerPath]:announcementApi.reducer,
    [adminApi.reducerPath]:adminApi.reducer,
    auth: authReducer
})
export default rootReducer;