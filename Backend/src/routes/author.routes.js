import { registerUser,loginUser,uplaodJournal,getJournal, getUserProfile, getCompleteDetailsOfJournal,getFeedBack,uplaodUpdateJournal} from "../controllers/user.controller.js";
import {upload} from '../middleware/multer.middleware.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
//import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";

import { Router } from "express";

const router =Router();


router.route("/register").post(upload.single("degree_pdf"), 
    registerUser);
router.route("/login").post(loginUser);

router.route("/submit-journal").post(verifyJWT,upload.single("pdfFile"),uplaodJournal);

router.route("/getJournal").get(verifyJWT,getJournal);
router.route("/getUserProfile").get(verifyJWT,getUserProfile);
router.route('/getCompleteDetailsOfJournal/:id').get(verifyJWT,getCompleteDetailsOfJournal);
router.route('/getFeedBack/:id').get(verifyJWT,getFeedBack);
router.route("/submit-update-journal").post(verifyJWT,upload.single("journalFile"),uplaodUpdateJournal); 


export default router;