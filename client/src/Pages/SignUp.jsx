import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { useState } from "react";
import toast from "react-hot-toast";

function SignUp(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [signupData,setSignupData]=useState({
        fullName:"",
        email:"",
        password:"",
    });
    function handleInput(e){
        e.preventDefault();
        const {name,value}=e.target;
        setSignupData({
            ...signupData,
            [name]:value
        })
    }

    async function createNewAccount(e){
        e.preventDefault();
        if(!signupData.fullName || !signupData.email || !signupData.password){
            toast.error("All Field Are Required");
        }
        const res=await dispatch(createAccount(signupData));
        console.log(res);
        if(res?.payload?.success){
            setSignupData({
                fullName:"",
                email:"",
                password:"",
            })
            navigate("/");
        }
        
    }
    return(
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh]">
                <form noValidate onSubmit={createNewAccount} className="flex flex-col justify-center px-3 py-6 rounded-lg w-96 text-white shadow-[0_35px_60px_-15px_black]">
                    <h1 className="text-center font-bold text-2xl mb-2">Signup Page</h1>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="fullName" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullName"
                            id="fullName"
                            placeholder="enter your name"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signupData.fullName}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="email" className="font-semibold">
                            Email
                        </label>
                        <input

                            type="email"
                            required
                            name="email"
                            id="email"
                            placeholder="enter your email"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signupData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="password" className="font-semibold">
                            Password
                        </label>
                        <input

                            type="password"
                            required
                            name="password"
                            id="password"
                            placeholder="enter your Password"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={signupData.password}
                        />
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 transition-all ease-in-out cursor-pointer py-2 mt-2 rounded-lg">Create Account
                    </button>
                    <p className="text-center mt-2">
                        Already Have An Account? <Link to="/login" className="link text-accent cursor-pointer">Login</Link>
                    </p>
                </form>
            </div>
        </HomeLayout>
    )
}
export default SignUp;