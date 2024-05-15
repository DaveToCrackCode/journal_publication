import { registerUser,loginUser,uplaodJournal,getJournal, getUserProfile, getCompleteDetailsOfJournal} from "../controllers/user.controller.js";
import {upload} from '../middleware/multer.middleware.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
//import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";

import { Router } from "express";

const router =Router();


router.route("/register").post(upload.fields([
    { name: 'degree_pdf', maxCount: 1 }, 
    { name: 'image', maxCount: 1 }]), 
    registerUser);
router.route("/login").post(loginUser);

router.route("/submit-journal").post(verifyJWT,upload.single("pdfFile"),uplaodJournal);
router.route("/getJournal").get(verifyJWT,getJournal);
router.route("/getUserProfile").get(verifyJWT,getUserProfile);
router.route('/getCompleteDetailsOfJournal/:id').get(verifyJWT,getCompleteDetailsOfJournal);


export default router;