import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import {getAllReviewer,getAllJournals,getJournal,setReviewers} from '../controllers/admin.controler.js'
import { verifyJWT } from "../middleware/auth.middleware.js";


const router =Router();

//private routes for admin
router.route('/getAllReviewer').get(verifyJWT,getAllReviewer);
router.route('/getAllJournals').get(verifyJWT,getAllJournals);
router.route('/getJournal/:id').get(verifyJWT,getJournal);
router.route('/setReviwer/:id').post(verifyJWT,setReviewers)
export default router;