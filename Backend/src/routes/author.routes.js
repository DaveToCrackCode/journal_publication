import { registerUser,loginUser,uplaodJournal,getJournal, getUserProfile } from "../controllers/user.controller.js";
import {upload} from '../middleware/multer.middleware.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
//import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";

import { Router } from "express";

const router =Router();

//public route for author
//console.log("rote me ");
router.route("/register").post(upload.single("degree_pdf"),registerUser);
router.route("/login").post(loginUser);

//privatte route for author 
router.route("/submit-journal").post(verifyJWT,upload.single("pdfFile"),uplaodJournal);
router.route("/getJournal").get(verifyJWT,getJournal);
router.route("/getUserProfile").get(verifyJWT,getUserProfile);


export default router;