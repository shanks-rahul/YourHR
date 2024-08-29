import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResume } from "../Redux/Slices/ResumeSlice";
import HomeLayout from "../layout/HomeLayout";

function HrPage() {
    const dispatch = useDispatch();
    const { resumeData } = useSelector((state) => state.resume);
    async function loadAllResume(){
        await dispatch(getResume());
    }
    useEffect(() => {
        loadAllResume();
    }, [])
    function showpdf(pdf) {
        window.open(`https://yourhr-4.onrender.com/files/${pdf}`, "_blank", "noreferror");
    }
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1>
                    Uploaded Resumes
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {resumeData != undefined &&
                        resumeData.map((resume, index) => {
                            return (
                                <div className="flex flex-wrap justify-around" key={index}>
                                    <div className="flex flex-col w-[25rem] justify-center px-4 py-3 space-y-2 shadow-[0_35px_60px_-15px_black]">
                                        <p>Name   : {resume.fullname}</p>
                                        <p>Email  : {resume.email}</p>
                                        <p>Number : {resume.number}</p>
                                        <button className="bg-blue-400 px-3 py-3 rounded-lg hover:bg-blue-500" onClick={() => showpdf(resume.resumePdf)}>View Resume</button>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </HomeLayout>
    )
}
export default HrPage;