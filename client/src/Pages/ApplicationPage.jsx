import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import toast from "react-hot-toast";
import { createResume } from "../Redux/Slices/ResumeSlice";

function ApplicationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [applicationData, setApplicationData] = useState({
        fullname: "",
        email: "",
        number:1234567890,
        resumePdf: "",
    })
    function handleInput(e) {
        const { name, value } = e.target;
        setApplicationData({
            ...applicationData,
            [name]: value
        })
    }
    function handleFile(e) {
        e.preventDefault();
        const file = e.target.files[0];
        applicationData.resumePdf=file;

    }
    async function onSubmitForm(e) {
        e.preventDefault();
        if (!applicationData.fullname || !applicationData.email || !applicationData.number || !applicationData.resumePdf) {
            toast.error("All Fields are required");
        }
        const res = await dispatch(createResume(applicationData));
        if (res?.payload?.success) {
            setApplicationData({
                fullname: "",
                email: "",
                number,
                resumePdf: "",
            })
            navigate("/")
        }

    }
    return (
        <HomeLayout>
            <div className="flex justify-center items-center h-[90vh]">
                <form noValidate onSubmit={onSubmitForm} className="flex flex-col justify-center px-3 py-6 rounded-lg w-96 text-white shadow-[0_35px_60px_-15px_black]">
                    <h1 className="text-center font-bold text-2xl mb-2">Application Page</h1>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="fullname" className="font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            required
                            name="fullname"
                            id="fullname"
                            placeholder="enter your name"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={applicationData.fullname}
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
                            value={applicationData.email}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="number" className="font-semibold">
                            Number
                        </label>
                        <input

                            type="tel"
                            required
                            name="number"
                            id="number"
                            placeholder="enter your Phone Number"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleInput}
                            value={applicationData.number}
                        />
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                        <label htmlFor="resumePdf" className="font-semibold">
                            Resume
                        </label>
                        <input

                            type="file"
                            accept=".pdf, .docx"
                            required
                            name="resumePdf"
                            id="resumePdf"
                            placeholder="Your Resume"
                            className="bg-slate-800 px-2 py-1 border"
                            onChange={handleFile}

                        />
                    </div>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 transition-all ease-in-out cursor-pointer py-2 mt-2 rounded-lg">Apply
                    </button>

                </form>
            </div>
        </HomeLayout>
    )
}
export default ApplicationPage;