import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loggedIn, loggedOut } from "../authSlice";
import { API_BASE_URL } from "@/lib/config";

export const apiAuth = createApi({
  reducerPath: "apiAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/something/user/`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation({
      query: (formData) => ({
        url: "signup",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(loggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(
            "this error is from onquery started in createApi : ",
            error,
          );
        }
      },
    }),
    logInUser: builder.mutation({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(loggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(
            "this error is from onquery started in createApi : ",
            error,
          );
        }
      },
    }),
    getUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(loggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(
            "this error is from onquery started in createApi : ",
            error,
          );
        }
      },
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
    logOutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;

          dispatch(loggedOut());
        } catch (error) {
          console.log("Logout failed:", error);
        }
      },
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLogInUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLogOutUserMutation,
} = apiAuth;
