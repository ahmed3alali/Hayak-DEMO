import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi';
const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl

        
    }),
    keepUnusedDataFor: 30,

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {

                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/login",
                method: "POST",
                body,
            }),

            async onQueryStarted(args, { dispatch, queryFulfilled }) {

                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error);
                }
            }

        }),

        logout: builder.query({

            query: () => "/logout",
        }),






    }),




});

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery } = authApi;
