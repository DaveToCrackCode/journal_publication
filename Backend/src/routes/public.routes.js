import { Router } from "express";
import { getArchiveData,getArchivePaperData,getIssueData,getArchieveJournaltDetails } from "../controllers/public.controller.js";
import { getJournal } from "../controllers/admin.controler.js";
const router =Router();

router.route('/get-archive-data').get(getArchiveData);
router.route('/get-issue-data/:vol').get(getIssueData);
router.route('/get-archive-paper').get(getArchivePaperData);
router.route('/getCompleteDetailsOfJournal/:id').get(getArchieveJournaltDetails);
export default router;