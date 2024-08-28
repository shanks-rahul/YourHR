import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../helpers/axiosInstance"

const initialState={
    resumeData:[]
}
export const createResume=createAsyncThunk("/create/resume",async(data)=>{
    try {
        let formData=new FormData();
        formData.append("fullname",data.fullname);
        formData.append("email",data.email);
        formData.append("number",data.number);
        formData.append("resumePdf",data.resumePdf);
        const res=axiosInstance.post("/resume/create",formData);
        toast.promise(res,{
            loading:"submiiting your application...",
            success:"application submitted successfully",
            error:(error)=>console.log(error)
        })
        return (await res).data;
    } catch (error) {
        console.log(error);
    }
});
export const getResume=createAsyncThunk("/get/resume",async()=>{
    try{
        const res=axiosInstance.get("/resume/get/AllResume");
        toast.promise(res,{
            loading:"fetching All Applications...",
            success:"All Applications fetched",
            error:"unable to fetch the applications"
        })
        return (await res).data.resumes;
    }catch(error){

    }
})
const resumeSlice=createSlice({
    name:"resume",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getResume.fulfilled,(state,action)=>{
            state.resumeData=[...action.payload]
        })
    }
})
export default resumeSlice.reducer;