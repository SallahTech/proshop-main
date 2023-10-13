import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (payload) => ({
        url: `${USERS_URL}/auth`,
        body: payload,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: `${USERS_URL}`,
        body: payload,
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (payload) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
} = usersApiSlice;