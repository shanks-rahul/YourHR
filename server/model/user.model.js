import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema=new Schema({
    fullName:{
        required:[true,"FullName is required"],
        type:String,
        trim:true,
        lowercase:true,
        minlength: [5, 'Name must be at least 5 characters'],
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ],
    },
    password:{
        type: String,
        required:[true,"password is required"],
        select:false,
        minlength:[8,"password must be of atleast 8 characters"]
    },
    role:{
        type:String,
        enum:["USER","HR"],
        default:"USER"
    },
},
{
    timestamps:true,
});
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password=await bcrypt.hash(this.password,10);
})
UserSchema.methods = {
    comparePassword: async function(plainPassword){
        return await bcrypt.compare(plainPassword,this.password);
    },
    generateJWTtoken: async function(){
        return await jwt.sign(
            {id:this._id,role:this.role},
            process.env.SECRET,
            {
                expiresIn:'24h'
            }
        );
    },
}
const User=model("User",UserSchema);

export default User;