//import { verifyJWT } from "../middleware/auth.middleware.js";
import { ReviewerverifyJWT } from "../middleware/reviewerAuth.middleware.js";
import { getAllJournalsForReview,getReviewJournal,AcceptHandler,RejectHandler} from '../controllers/reviewer.controller.js';
import { Router } from "express";

const router =Router();

router.route('/getReviewerJournal').get(ReviewerverifyJWT,getAllJournalsForReview);
router.route('/getReviewJournal/:id').get(ReviewerverifyJWT,getReviewJournal);
router.route('/accept').post(ReviewerverifyJWT,AcceptHandler);
router.route('/reject').post(ReviewerverifyJWT,RejectHandler);
export default router;