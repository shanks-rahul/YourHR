import { Schema, model } from "mongoose";

const resumeSchema=new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    number:{
        type:Number,
        required:true
    },
    resumePdf:{
        type:String
    }
});
const Resume=model("Resume",resumeSchema);
export default Resume;