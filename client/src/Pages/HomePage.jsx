import { Link } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";


function HomePage(){
    return(
        <HomeLayout>
            <div className="flex items-center justify-center mx-16 gap-10 h-[90vh]">
                <div className="w-1/2 space-y-6">
                    <h1 className="font-semibold text-5xl text-white">
                        Fill Your application
                    </h1>
                    <div className="flex items-center justify-start">
                        <Link to="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/application">
                            <button className="ml-4 border border-green-500  text-white px-4 py-3 rounded-md font-semibold text-lg hover:bg-green-600 transition:all ">
                                Fill Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage;