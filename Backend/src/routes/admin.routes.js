import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import {getAllReviewer,getAllAuthor,getAllJournals,getJournal,setReviewers,getAllReviewerRequest,acceptRequest, rejectRequest} from '../controllers/admin.controler.js'
import {getCompleteDetailsOfJournal} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router =Router();

//private routes for admin
router.route('/getAllReviewer').get(verifyJWT,getAllReviewer);
router.route('/getAllAuthor').get(verifyJWT,getAllAuthor);
router.route('/getAllJournals').get(verifyJWT,getAllJournals);
router.route('/getJournal/:id').get(verifyJWT,getJournal);
router.route('/setReviwer/:id').post(verifyJWT,setReviewers);
router.route('/getReviewerRequest').get(AdminverifyJWT,getAllReviewerRequest);
router.route('/track_details/:id').get(getCompleteDetailsOfJournal);
router.route('/acceptRequest/:id').delete(AdminverifyJWT,acceptRequest)
router.route('/rejectRequest/:id').delete(AdminverifyJWT,rejectRequest);
export default router;