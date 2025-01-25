import { configureStore } from "@reduxjs/toolkit";

import { userApi } from "./api/userApi";
// import { adminSlice } from "./slice/adminSlice";

import userSlice from "./slice/userSlice";


const reduxStore = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        user: userSlice,
    },
    middleware: def =>
        [...def(),
        userApi.middleware]
})

export default reduxStore