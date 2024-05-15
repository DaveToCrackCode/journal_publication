import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Journal } from "../models/journal.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/nodemailer.js";
import { ReviewerRequest } from "../models/reviewerRequest.model.js";
import { ArchiveVolumeHelper } from "../models/archiveVolumeHelper.model.js";
import { ArchiveVolume } from "../models/archiveVolume.model.js";
const getAllReviewer = asyncHandler(async (req, res) => {
    try {
        const reviewer = await User.find({ isReviewer: true });
        if (!reviewer) {
            throw new ApiError(500, "Reviewer is not find");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, reviewer, "All Reviewer are fetched successfully")
            );
    } catch (error) {
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getAllAuthor = asyncHandler(async (req, res) => {
    try {
        const author = await User.find({ isReviewer: false , isAdmin: false });
        if (!author) {
            throw new ApiError(500, "Authors is not find");
        }

        return res
            .status(200)
            .json(
                new ApiResponse(200, author, "All Authors are fetched successfully")
            );
    } catch (error) {
        throw new ApiError(500, "Some internal Server Error");
    }
});


const getAllJournals = asyncHandler(async (req, res) => {
    try {
        const journalsWithUserInfo = await Journal.find()
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
                new ApiResponse(200,journalsWithUserInfo,"All Journal Fetched Successfully")
            );
    } catch (error) {
        console.log("error while fetching journal from admin side", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getJournal = asyncHandler(async (req, res) => {
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

const setReviewers = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        let reviewers = req.body
        // console.log(reviewers);

        const journalData = await Journal.findOne({_id:id});


        if(!journalData){
            console.log("journal data is not present");
            throw new ApiError(400,"Journal data is not find in database")
        }

        console.log(reviewers[0]._id);

        // const existingReviewerIds = new Set(journalData.reviewers.map(reviewer => reviewer._id));

        // // Filter out reviewers that are not included in the new array
        // const updatedReviewers = existingReviewers.filter(reviewer => existingReviewerIds.has(reviewer._id));
    
        // // Add new reviewers to the existing array
        // newReviewers.forEach(newReviewer => {
        //     if (!existingReviewerIds.has(newReviewer._id)) {
        //         updatedReviewers.push(newReviewer);
        //     }
        // });

         for(let i=0;i<journalData.reviewers.length;i++){
            let flag= false;

            for(let j=0;j<reviewers.length;j++){
                if(journalData.reviewers[i]._id==reviewers[j]._id){
                    flag= true;
                }
            }
            if(flag== false){
                console.log(journalData.reviewers[i])
                journalData.reviewers.splice(i,1);
                i--;
            }
            
         }

         for(let j=0;j<reviewers.length;j++){
             let flag= false;
             
             for(let i=0;i<journalData.reviewers.length;i++){
                if(journalData.reviewers[i]._id==reviewers[j]._id){
                    flag= true;
                }
            }
            if(flag== false){
                journalData.reviewers.push(reviewers[j]._id);
                
            }
            
         }

        
        // for(let i=0;i<reviewers.length;i++){
        //     journalData.reviewers.push(reviewers[i]._id);
        //     // const mailRes= await sendEmail(reviewers[i].email);
        //     // if(!mailRes){
        //     //   console.log("some error while sending mail to Reviewer");
        //     //   throw new ApiError(405,"error while sending mail");
        //     // }
        //     // console.log("mail send");
        // }

        journalData.status = "UnderReview";

        const updateInfo = await journalData.save();

        if(!updateInfo){
            console.log("error while update the document ");
            throw new ApiError(501,"some error while saving the document into database");
        }

        res.status(200).json(
            new ApiResponse(100,"Reviewer Added Successfully")
        );

    } catch (error) {
        console.log("Error while adding the reviewer server side",error);
        throw new ApiError(500, "Some internal Server Error while adding reviewer");
    }
});

const getAllReviewerRequest = asyncHandler(async(req,res)=>{
    try {
        const data = await ReviewerRequest.find({}).populate({
            path: 'reviewerId',
            select: 'name email qualification degree_pdf specialistArea',
        });

        if(!data){
            return res.status(200)
            .json(
                new ApiResponse(203,"Not any New request are present")
            ); 
        }

        res.status(200)
        .json(
            new ApiResponse(200,data,"All Requests are  Fetched Successfully")
        );

    } catch (error) {
        console.log("Error while fetching reviwer request from database",error);
        throw new ApiError(500, "Error while fetching reviwer request from database");
    }
});

const acceptRequest = asyncHandler(async(req,res)=>{
     try {
        const id = req.params.id;

        const data = await ReviewerRequest.findById({_id:id});
        
        const deleteItem = await ReviewerRequest.findByIdAndDelete({_id:id});
        if(!deleteItem){
            return res.status(200)
            .json(
                new ApiResponse(203,"Some error occur while accepting the request")
            );  
        }
        //console.log(data.reviewerId.toString());
        const userId = data.reviewerId.toString();

        let userData = await User.findById({_id:userId});

        if(!userData){
            return res.status(200)
            .json(
                new ApiResponse(203,"Some error occur while accepting the request")
            );  
        }

        userData.isReviewer=true;
        await userData.save();
        res.status(200)
        .json(
            new ApiResponse(200,"Request Accept Succesfully")
        );
     } catch (error) {
        console.log("Error while accepting the reviewer request",error);
        throw new ApiError(500, "Error while accepting the reviewer request");
     }
});

const acceptPaper = asyncHandler(async(req,res)=>{
    try {
        console.log("acceptPaper == ");
       const id = req.params.id;

       const journaldata = await Journal.findById({_id:id});
       journaldata.status = 'accepted';
       await journaldata.save();
       res.status(200)
       .json(
           new ApiResponse(200,"Journal Accepted Succesfully")
       );
    } catch (error) {
       console.log("Error while accepting the Journal",error);
       throw new ApiError(500, "Error while accepting the Journal");
    }
});

const getUsertDetails = asyncHandler(async(req,res)=>{
    try {
      
       const id = req.params.id;

       const userData = await User.findById({_id:id});
       
       if(!userData){
        throw new ApiError(400,"Some error when fetching User from database");
    }

    return res.status(200).json(
        new ApiResponse(200,{data:userData},"User data fetched successfully")
    );
    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }
});


const rejectRequest = asyncHandler(async(req,res)=>{
    try {
       const id = req.params.id;

       const data = await ReviewerRequest.findById({_id:id});
       
       const deleteItem = await ReviewerRequest.findByIdAndDelete({_id:id});
       if(!deleteItem){
           return res.status(200)
           .json(
               new ApiResponse(203,"Some error occur while rejecting  the request")
           );  
       }
       //console.log(data.reviewerId.toString());
    //    const userId = data.reviewerId.toString();

    //    let userData = await User.findById({_id:userId});

    //    if(!userData){
    //        return res.status(200)
    //        .json(
    //            new ApiResponse(203,"Some error occur while rejecting the request")
    //        );  
    //    }

    //    userData.isReviewer=false;
    //    await userData.save();
       res.status(200)
       .json(
           new ApiResponse(200,"Request Reject Succesfully")
       );
    } catch (error) {
       console.log("Error while rejecting  the reviewer request",error);
       throw new ApiError(500, "Error while  rejecting the reviewer request");
    }
});

const getAllVolume = asyncHandler(async(req,res)=>{
    try {
        const newData = await ArchiveVolumeHelper.find();

          return res.status(200)
           .json(
               new ApiResponse(200,newData,"Volume Data Fetched SuccesFully")
           );
    } catch (error) {
        console.log("Error while Fetching ALl Volume",error);
        throw new ApiError(500, "Error while Fetching ALl Volume"); 
    }
});

const addVolume = asyncHandler(async(req,res)=>{
    try {
        console.log("inside Add volume");
          const volumeData = await ArchiveVolumeHelper.find();
          let len = volumeData.length;
          const newVolume = await ArchiveVolumeHelper.create({
            volume:len+1,
            issue:[]
          });

          if(!newVolume){
            return res.status(203)
           .json(
               new ApiResponse(203,"Some error occur while Adding new Volume")
           ); 
          }

          const newData = await ArchiveVolumeHelper.find();

          return res.status(200)
           .json(
               new ApiResponse(200,newData,"Volume Added Succesfully")
           ); 

    } catch (error) {
        console.log("Error while Ading new Volume",error);
       throw new ApiError(500, "Error while Ading new Volumet");
    }
});

const addIssue = asyncHandler(async(req,res)=>{
    try {
        console.log("inside Add volume");
         const vol = parseInt(req.params.volume);
         console.log(typeof(vol));

         const volumeData = await ArchiveVolumeHelper.findOne({volume:vol});
         //console.log(volumeData);
         if(!volumeData){
            return res.status(203)
            .json(
                new ApiResponse(203,"Some error occur while Adding new Issue")
            ); 
         }
         const issueLen = volumeData.issue.length;
         volumeData.issue.push(issueLen+1);
         const finalData = await volumeData.save();

         if(!finalData){
            return res.status(203)
            .json(
                new ApiResponse(203,"Some error occur while Adding new Issue")
            ); 
         }

         return res.status(200)
         .json(
             new ApiResponse(200," New Issue Added SuccesFully")
         ); 
         
    } catch (error) {
        console.log("Error while Ading new Volume",error);
       throw new ApiError(500, "Error while Ading new Volumet");
    }
});

const addArchive = asyncHandler(async(req,res)=>{
    try {
        // console.log(req.file.path);
           const {vol,issu,title,author,pageNumber,date,abstract} = req.body;
           //console.log(req.body);
           //console.log(typeof(req.body.volume));
           const user = req.user;
           const volume = parseInt(vol);
           const issue= parseInt(issu);       
           console.log(vol);    
           if(
            [title,pageNumber,date,abstract].some((field)=> field?.trim() === "")
           )
           {
                throw  new ApiError(400,"All fields are required");
           }
           if (isNaN(vol) || isNaN(issu)) {
            throw new ApiError(400, "Invalid volume or issue number");
        }
         const localJournalPath = req.file?.path;
         console.log("localJournalPath",localJournalPath);
           if(!localJournalPath){
              throw new ApiError(400,"Journal  is required");
           }
           const journalUrl = await uploadOnCloudinary(localJournalPath,'Archive_pdf');
          console.log("journal clould url",journalUrl);
           if(!journalUrl){
              throw new ApiError(400,"Some error when upload the journal on server");
           }
            const data = await ArchiveVolume.create({
                 volume,
                 issue,
                 title,
                 author,
                 pageNumber,
                 date,
                 abstract,
                 paperDegree:journalUrl.url

            })
         
           if(!data){
              throw new ApiError(402,"error occured when saving the document into the database");
           }
        //   console.log(data);
           return res.status(200).json(
            new ApiResponse(
                200,{},
                "Journal Submit SuccessFully"
            )
           );

         
       } catch (error) {
        console.log(error);
           throw new ApiError(505,"server error when submitting the Archive");
       }
});

export { 
    getAllReviewer,
    getAllAuthor,
    getAllJournals,
    getJournal,
    setReviewers,
    getAllReviewerRequest,
    acceptRequest,
    acceptPaper,
    getUsertDetails,
    rejectRequest,
    getAllVolume,
    addVolume,
    addIssue, 
    addArchive
};