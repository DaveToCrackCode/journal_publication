import { AdminverifyJWT } from "../middleware/adminAuth.middleware.js";
import { Router } from "express";
import {
    getAllReviewer, getAllAuthor, getAllJournals, getJournal, setReviewers,
    getAllReviewerRequest, acceptRequest, acceptPaper, rejectRequest,rejectPaper, getUsertDetails,getAllVolume,
    addVolume,
    addIssue, 
    addArchive,
    getAllFeedBackOfReviwer,
    sendRemindMail
}
    from '../controllers/admin.controler.js'
import { getCompleteDetailsOfJournal } from "../controllers/user.controller.js";
import {upload} from '../middleware/multer.middleware.js';


const router = Router();

//private routes for admin
router.route('/getAllReviewer').get(AdminverifyJWT, getAllReviewer);
router.route('/getAllAuthor').get(AdminverifyJWT, getAllAuthor);
router.route('/getAllJournals').get(AdminverifyJWT, getAllJournals);
router.route('/getJournal/:id').get(AdminverifyJWT, getJournal);
router.route('/setReviwer/:id').post(AdminverifyJWT, setReviewers);
router.route('/getReviewerRequest').get(AdminverifyJWT, getAllReviewerRequest);
router.route('/track_details/:id').get(AdminverifyJWT, getCompleteDetailsOfJournal);
router.route('/user_details/:id').get(AdminverifyJWT, getUsertDetails);
router.route('/acceptRequest/:id').delete(AdminverifyJWT, acceptRequest);
router.route('/rejectRequest/:id').delete(AdminverifyJWT, rejectRequest);
router.route('/acceptPaper/:id').post(AdminverifyJWT, acceptPaper);
router.route('/rejectPaper/:id').post(AdminverifyJWT, rejectPaper);
router.route('/getAllVolume').get(AdminverifyJWT,getAllVolume);
router.route('/addVolume').get(AdminverifyJWT,addVolume);
router.route('/addIssue/:volume').put(AdminverifyJWT,addIssue);
router.route('/submit-Archive').post(AdminverifyJWT,upload.single('pdfFile'),addArchive);
router.route('/getAllFeedBackOfReviwer').get(AdminverifyJWT, getAllFeedBackOfReviwer);
router.route('/send-remind-mail').post(AdminverifyJWT,sendRemindMail);
export default router;