import {Router} from "express";
import { createResume, getAllResume } from "../controllers/resume.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { authorizedRoles, isLoggedIn } from '../middlewares/auth.middleware.js';
const router=Router();

router.get("/get/AllResume",isLoggedIn,authorizedRoles("HR"),getAllResume);
router.post("/create",isLoggedIn,upload.single("resumePdf"),createResume);
export default router;