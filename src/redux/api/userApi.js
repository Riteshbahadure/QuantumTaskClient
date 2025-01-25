import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" , credentials:"include"   }),
    
    endpoints: (builder) => {
        return {
            registerUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/registerUser",
                        method: "POST",
                        body: userData
                    }
                },
            }),
            loginUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/loginUser",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutUser: builder.mutation({
                query: userData => {
                    return {
                        url: "/logoutUser",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                }
            }),
            GetUser: builder.query({
                query: () => {
                    return {
                        url: "/getUser",
                        method: "GET"
                    }
                },
                providesTags: ["users"],
                transformResponse: data => data.result
            }),

        }
    }
})

export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery } = userApi
