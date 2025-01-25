import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {user: JSON.parse(localStorage.getItem("user"))},
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(userApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload
        })
        .addMatcher(userApi.endpoints.logoutUser.matchFulfilled, (state, { payload }) => {
            state.user = null
        })

})

export const { invalidate } = userSlice.actions
export default userSlice.reducer