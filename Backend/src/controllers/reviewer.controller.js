import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Journal } from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { FeedBack } from "../models/feedback.model.js";
import { sendEmail } from "../utils/nodemailer.js";

const getAllJournalsForReview = asyncHandler(async(req,res)=>{
    try {
        const reviewer = req.user._id;
        //console.log("here");
        const journals = await Journal.find({'reviewers._id':new mongoose.Types.ObjectId(reviewer)});
        if(journals.length === 0){
           return res.status(200).json(
            new ApiResponse(200,[],"Not Any paper present for reviewing")
           );
        }

        return res.status(200).json(
            new ApiResponse(200,journals,"All Journal Fetched Successfully")
        );

    } catch (error) {
        console.log("error in  fetching journal in reviewer side ",error);
       throw new ApiError(500, "Some internal Server Error while fetching journal for reviewer side");
    }
});

const getReviewJournal = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const journalsWithUserInfo = await Journal.find({_id:id})
            .populate({
                path: "author",
                model: User,
                select: "name email qualification", // Select only the 'name' and 'email' fields from the User model
            })
            .exec();

            // if(journalsWithUserInfo.length === 0){
            //     console.log("no data present ");
            //     // res.status(403).json(new ApiError(403,"Not any Journal present in database"));
            //     throw new ApiError(403,"Not any Journal present in database");
            // }
            res.status(200)
            .json(
                new ApiResponse(200,journalsWithUserInfo[0],"All Journal Fetched Successfully")
            );
    } catch (error) {
        console.log("error while fetching journal from admin side", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});

const AcceptHandler = asyncHandler(async(req,res)=>{
    try {
        const { userId, journalId } = req.body;

        // Find the journal by its ID
        const journal = await Journal.findById(journalId);

        if (!journal) {
            return res.status(404).json({ error: 'Journal not found' });
        }

        // Find the index of the reviewer with matching user ID
        const reviewerIndex = journal.reviewers.findIndex(reviewer => reviewer._id.toString() === userId);
        //console.log(reviewerIndex);
        if (reviewerIndex === -1) {
            return res.status(404).json({ error: 'Reviewer not found' });
        }

        // Update the status of the reviewer to 'accept'
        const emailHtml = `
        <p>Dear Dr. ${req.user.name},</p>
        <p>Thank you for agreeing to review the above manuscript.</p>
        <p><strong>Manuscript Number:</strong> ${journal.paper_id}</p>
        <p><strong>Title:</strong> ${journal.title}</p>
        <p>You can submit your review by logging in with your username and password at: <a href="'https://www.ijesacbt.com">'https://www.ijesacbt.com</a></p>
        <p>Your username is: ${req.user.email}</p>
        <p>If you forgot your password, you can click the 'forgot Password' link in the Login page at <a href="https://www.ijesacbt.com">https://www.ijesacbt.com</a>. For security reasons, we are not sending any passwords in mail. Sorry for the inconvenience.</p>
        <p>We look forward to receiving your review by 10 dec 2024.</p>
        <p>If you have any questions, please do not hesitate to contact us. We appreciate your assistance.</p>
        <p>With kind regards,</p>
        <p>Dr. R. Ponalagusamy<br />
        Editor-in-Chief<br />
        IJESACBT</p>
      `;
       
      const emailRes = sendEmail(req.user.email,emailHtml,"Thanks Letter for agreeing to review ");
      if(!emailRes){
        throw ApiError(405,"errro in sending mail");
      }
        journal.reviewers[reviewerIndex].status = 'accept';
        console.log(journal.reviewers[reviewerIndex].status)
        // // Save the changes
        await journal.save();
        res.status(200)
            .json(
                new ApiResponse(200,"Status Change succesFully")
            );
        
    } catch (error) {
        console.log("error while accepthandler", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});


const RejectHandler = asyncHandler(async(req,res)=>{
    try {
        const { userId, journalId } = req.body;

        // Find the journal by its ID
        const journal = await Journal.findById(journalId);

        if (!journal) {
            return res.status(404).json({ error: 'Journal not found' });
        }

        // Find the index of the reviewer with matching user ID
        const reviewerIndex = journal.reviewers.findIndex(reviewer => reviewer._id.toString() === userId);
        //console.log(reviewerIndex);
        if (reviewerIndex === -1) {
            return res.status(404).json({ error: 'Reviewer not found' });
        }

        // Update the status of the reviewer to 'accept'
        journal.reviewers[reviewerIndex].status = 'reject';
        console.log(journal.reviewers[reviewerIndex].status)
        // // Save the changes
        await journal.save();
        res.status(200)
            .json(
                new ApiResponse(200,"Status Change succesFully")
            );
        
    } catch (error) {
        console.log("error while accepthandler", error);
        throw new ApiError(500, "Some internal Server Error");
    }
})

const SetFeedBack = asyncHandler(async(req,res)=>{
    try {
        const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11,q12, feedback, journalId } = req.body;
        let user = req.user._id;
        let journalData = await Journal.findById({_id:journalId});
        //console.log(journalData);
        if(!journalData){
            throw new ApiError(201, "Journal is not present ");
        }

        const ReviewerStatus = journalData.reviewers.filter(function(reviewer) {
            // console.log(reviewer._id)
            return reviewer._id.toString() === user.toString();
          });
         // console.log(ReviewerStatus);
        const isReviewAdded = ReviewerStatus[0].status =='feedbackGiven';
        if (isReviewAdded) {
            return res.status(201).json(
                "Feedback Allready aded by this user");
            
        }
        const savedFeedback = await FeedBack.create({
            author: journalData.author, // Populate author field with req.user._id
            remarks: feedback, // Assuming remarks field is not provided in the request body
            feedbackAnswer: {
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                q9,
                q10,
                q11,
                q12
            },
            reviewer: req.user._id, // Assuming reviewer field is not provided in the request body
            journal: journalData._id // Assuming journalId is provided in the request body
        });

       if(!savedFeedback)
       {
        throw new ApiError(500, "Error while saving data into database ");
       }
       if(journalData.status != 'minor' ||  journalData.status != 'major'){
        console.log(q12);
        journalData.status = q12;
       }
        const filteredReviewer = journalData.reviewers.filter(function(reviewer) {
         // console.log(reviewer._id)
         return reviewer._id.toString() === user.toString();
       });
       console.log(filteredReviewer)
       if (filteredReviewer.length > 0) {
         filteredReviewer[0].journalStatus = q12;
         filteredReviewer[0].status = 'feedbackGiven';
      }
       await journalData.save();

       res.status(200).json(
        new ApiResponse(200,"Feedback Set Successfully")
       )
    } catch (error) {
        console.log("error while  guven feedback", error);
        throw new ApiError(500, "Some internal Server Error");
    }
})


export{
    getAllJournalsForReview,
    getReviewJournal,
    AcceptHandler,
    RejectHandler,
    SetFeedBack
}