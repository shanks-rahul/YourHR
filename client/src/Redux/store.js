import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slices/AuthSlice";
import resumeSliceReducer from "./Slices/ResumeSlice";
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        resume:resumeSliceReducer
    },
    devTools:true
})
export default store;