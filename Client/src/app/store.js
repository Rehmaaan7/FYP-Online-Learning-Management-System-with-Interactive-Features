import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { apiAuth } from "@/features/api/apiAuth.js";
import { courseApi } from "../features/api/courseApi.js";
import { purchaseApi } from "@/features/api/purchaseApi.js";
import { progressApi } from "@/features/api/progressApi.js";
import { forumApi } from "@/features/api/forumApi.js";
import { assignmentApi } from "@/features/api/assignmentApi.js";
import { quizApi } from "@/features/api/quizApi.js";
import { announcementApi } from "@/features/api/announcementApi.js";
import { adminApi } from "@/features/api/adminApi.js";

const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleWare) =>
    defaultMiddleWare()
      .concat(
        apiAuth.middleware,
        courseApi.middleware,
        purchaseApi.middleware,
        progressApi.middleware,
      )
      .concat(
        forumApi.middleware,
        assignmentApi.middleware,
        quizApi.middleware,
        announcementApi.middleware,
      )
      .concat(adminApi.middleware),
});

const initializeApp = async () => {
  await appStore.dispatch(
    apiAuth.endpoints.getUser.initiate({}, { forceRefetch: true }),
  );
};
initializeApp();

export default appStore;
