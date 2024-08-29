import { Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import HomePage from "./Pages/HomePage"
import RequireAuth from "./Auth/RequireAuth"
import HrPage from "./Pages/HrPage"
import ApplicationPage from "./Pages/ApplicationPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/" element={<HomePage />} />
        <Route path="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/signup" element={<SignUp />} />
        <Route path="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/login" element={<Login />} />
        <Route element={<RequireAuth allowedRoles={["USER","HR"]} />}>
          <Route path="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/application" element={<ApplicationPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["HR"]} />}>
          <Route path="https://yourhr-op6oe7oxl-rahul-agarwallas-projects.vercel.app/dashboard" element={<HrPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
