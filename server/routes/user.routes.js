import { Router } from "express";
import { getLoggedInUserDetails, login, logout, register } from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
const router=Router();

router.post("/signup",register);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",isLoggedIn,getLoggedInUserDetails);
export default router;