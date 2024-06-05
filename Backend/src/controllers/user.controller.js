import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {Journal} from "../models/journal.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ReviewerRequest } from "../models/reviewerRequest.model.js";
import { PaperId } from "../models/paperId.model.js";
import { FeedBack } from "../models/feedback.model.js";
import { Revision } from "../models/Revision.model.js";
import {sendEmail}  from "../utils/nodemailer.js"

//yha pr ham ek alag se access token or refresh token genarate krne ki method banayenge 

const  generateAccessAndRefereshTokens= async(userId)=>{
    try {
        console.log(userId);
        const user= await User.findById(userId);
        console.log(user);
        const aceesToken = user.generateAccessToken();
        console.log(aceesToken);
        return aceesToken;

    } catch (error) {
        throw new ApiError(500,"something went wrong while genarating refresh and access token");
    }
}

const registerUser =asyncHandler(async(req,res)=>{
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res
    
    //step1:
    try {
        const {name,email,password,qualification,contact,address,city,state,country,isReviewer, specialistArea} = req.body;
        console.log(req.body);
        //console.log( req.files);
        //console.log( req.files['image'][0].path);
        //step2:
        if(
            [name,email,password,qualification,contact,address,city,state,country,isReviewer, specialistArea].some((field)=> field?.trim() === "")
        )
        {
            throw  new ApiError(400,"All fields are required");
        }
    
        //step 3:
        const existedUser = await User.findOne({email});
        if(existedUser){
            throw new ApiError(409,"User with email or username already exists");
        }
        //console.log(req.files);
        //step 4:
        const degreeLocalPath =req.file?.path;
        //console.log(degreeLocalPath);
        
        if(!degreeLocalPath)
        {
            throw new ApiError(400,"degreeLocal file is required");
        }
        const degree= await uploadOnCloudinary(degreeLocalPath,"journal_degree");
        
    
        if(!degree)
        {
            console.log(degree);
            throw new ApiError(400,"degree file is required");
        }
         
        
        //step 5:
        // let flag=false;
        
        const user = await User.create({
            name,
            email,
            password,
            qualification,
            contact,
            address,
            city,
            state,
            country,
            degree_pdf:degree.url,
            isReviewer:false,
            specialistArea,
        });
    
        const createdUser = await User.findById(user._id).select(
            "-password"
        )
    
        if(!createdUser)
        {
            throw new ApiError(500,"Something went wrong while regestering the User");
        }
        if(isReviewer === "yes"){
            const ReviewerReq = await ReviewerRequest.create({
                reviewerId:createdUser._id
            });

        }
        return res.status(200).json(
            new ApiResponse(200,createdUser, "User registered Successfully")
        )
    } catch (error) {
        console.log(error);
        throw new ApiError(505,"Some error catch while registering the user");
    }

});

//login controller for user 

const loginUser =asyncHandler(async(req,res)=>{
     // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email,password }=req.body;
    //console.log(email);

    if(!email && !password){
        throw new ApiError(400,"password or email is required");
    }

    const user = await User.findOne({email
});

    if(!user){
        throw new ApiError(404,"user not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials");
    }
    console.log("here");
    const accessToken = await generateAccessAndRefereshTokens(user._id);
    console.log(accessToken);

    //yha ham response send karenge frontend pr but password or refresh token send nhi karenge 

    const loggedInUser = await User.findById(user._id).select("-password");

    // kuch secuirity purpose ke liye option bhi dalte he 

    const options ={
        httpOnly:true,
        secure:true
    }

    //ab response send kar denge 

    return res.
    status(200)
    .json(
        new ApiResponse(
            200,{
               user:loggedInUser,
               accessToken: accessToken
            },
            "User Logged In SuccessFully"
        )
    )
});

//upload journal of author
const uplaodJournal = asyncHandler(async(req,res)=>{
       try {
        // console.log(req.file.path);
        const {title,keyword, coAuthor1name, coAuthor1email, coAuthor2name, coAuthor2email, coAuthor3name, coAuthor3email,abstract,journalType} = req.body;
        //    console.log(req.body);
           const user = req.user;
           
           if(
            [title,keyword,abstract,journalType].some((field)=> field?.trim() === "")
           )
           {
                throw  new ApiError(400,"All fields are required");
           }
           if(coAuthor1email && coAuthor1name){
           const coauthor1= await User.find({email:coAuthor1email});
           if(!coauthor1){
            throw new ApiError(400,"Not Valid Co-Author");
           }
        }
        if(coAuthor2email && coAuthor2name){
           const coauthor2= await User.find({email:coAuthor2email});
           if(!coauthor2){
            throw new ApiError(400,"Not Valid Co-Author");
           }
        }
        if(coAuthor3email && coAuthor3name){
           const coauthor3= await User.find({email:coAuthor3email});
           if(!coauthor3){
            throw new ApiError(400,"Not Valid Co-Author");
           }
        }

           const localJournalPath = req.file?.path;
           //console.log("localJournalPath",localJournalPath);
           if(!localJournalPath){
              throw new ApiError(400,"Journal  is required");
           }
           const journalUrl = await uploadOnCloudinary(localJournalPath,'Journal_pdf');
        //    console.log("journal clould url",journalUrl);
           if(!journalUrl){
              throw new ApiError(400,"Some error when upload the journal on server");
           }
            
           let paper_id = await PaperId.findOne();
        // IF PAPER ID IS NULL 
           if(paper_id == null){
            const a= await PaperId.create({
                pId:999
            });
           }
          const journal_id = paper_id.pId+1;
          paper_id.pId = journal_id;
          await paper_id.save();
           const data =  await Journal.create({
              paper_id:journal_id,
              title,
              keyword,
              coAuthor1name,
              coAuthor1email,
              coAuthor2name,
              coAuthor2email,
              coAuthor3name,
              coAuthor3email,
              abstract,
              journal_pdf: journalUrl.url,
              author:user._id,
              journalType
           });

           if(!data){
              throw new ApiError(402,"error occured when saving the document into the database");
           }
          const author = await User.findById({_id:user._id});

          const authorMail =`<h3>Dear Mr. ${author.name},</h3>
          <p>Your submission entitled "<strong>${title}</strong>" has been received by The International Journal of Engineering Science, Advanced Computing and Bio-Technology (IJESACBT).</p>
          <p>You will be able to check on the progress of your paper by logging on to Editorial Manager as an author. The URL is <a href="www.ijesacbt.com">www.ijesacbt.com</a>.</p>
          <p>The submission id is: <strong>${journal_id}</strong></p>
          <p>Please refer to this number in any future correspondence.</p>
          <p>Thank you for submitting your work to our journal.</p>
          <p>Kind regards,</p>
          <p>Editorial Office<br/>
          IJESACBT</p>
        `;
        const mailSendData = sendEmail(author.email,authorMail,"Acknowledgement letter");
        if(!mailSendData){
            console.log("mail not send");
        }
           return res.status(200).json(
            new ApiResponse(
                200,{},
                "Journal Submit SuccessFully"
            )
           );

         
       } catch (error) {
        console.log(error);
           throw new ApiError(505,"server error when submitting the journal");
       }
});

//get all journal of the the author 

const getJournal = asyncHandler(async(req,res)=>{
    try {
        const user = req.user;
       // console.log(user);
        const journals = await Journal.find({ author: user._id});
        console.log(journals);

        if(!journals){
            throw new ApiError(400,"Some error when fetching journal from database");
        }

        return res.status(200).json(
            new ApiResponse(200,{data:journals},"All journal are fetched successfully")
        );

    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }
});

//get User Profile

const getUserProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    // Using MongoDB Aggregation Pipeline to get user profile details with journal counts
    const userProfile = await User.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(userId) } // Match user by ID
        },
      {
        $lookup: {
          from: 'Journal', //  your Journal model collection is named 'journals'
          localField: '_id',
          foreignField: 'author',
          as: 'journals',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          email: 1,
          image:1,
          qualification:1,
          isReviewer:1,
          specialistArea:1,
          // Include other user details as needed
          journalCounts: {
            totalJournals: { $size: '$journals' },
            pendingJournals: {
              $size: {
                $filter: {
                  input: '$journals',
                  as: 'journal',
                  cond: { $eq: ['$$journal.status', 'pending'] },
                },
              },
            },
            completedJournals: {
              $size: {
                $filter: {
                  input: '$journals',
                  as: 'journal',
                  cond: { $eq: ['$$journal.status', 'complete'] },
                },
              },
            },
          },
        },
      },
    ]);
    console.log("Hello ",userProfile);
    if (!userProfile || userProfile.length === 0) {
      throw new ApiError(400,"user profile doesn't exist ");
    }
  
    // Return user profile details along with journal counts
    return res.status(200).json(
        {
            message:"data fetch successfully",
            data:userProfile[0]
        }
    );
  });

  const getCompleteDetailsOfJournal = asyncHandler(async (req, res) => {
    try {
        const journalId = req.params.id;

        const journalDetails = await Journal.findById(journalId).populate('author', 'name email');
        if (!journalDetails) {
            throw new ApiError(400, "Journal not Found");
        }

        const totalReviewer = journalDetails.reviewers.length;
        let acceptedReviewers = 0;
        let rejectedReviewers = 0;
        let reviewerDetails = [];

        await Promise.all(journalDetails.reviewers.map(async reviewer => {
            const output = reviewer._id.toString();
            const data = await User.findById(output).select('name email');
            reviewerDetails.push({ status: reviewer.status, reviewerData: data });

            if (reviewer.status === 'accept' || reviewer.status === 'feedbackGiven') {
                acceptedReviewers++;
            } else if (reviewer.status === 'reject') {
                rejectedReviewers++;
            }
        }));

        return res.status(200).json({
            message: "Data fetched successfully",
            data: {
                reviewerDetails,
                journalDetails,
                acceptedReviewers,
                rejectedReviewers,
                totalReviewer
            }
        });
    } catch (error) {
        console.log("Error while fetching complete details of journal in userController:", error);
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getFeedBack = asyncHandler(async(req,res)=>{
    try {
        const user = req.user._id;
        //console.log(user);
        const journalId = req.params.id;
        const feedBackData = await FeedBack.find({author:user,latest:true,journal:journalId});
        //console.log(feedBackData);
        if(!feedBackData){
            return res.status(201).json(
                "There is Not any feedback");
        }

        res.status(200)
            .json(
                new ApiResponse(200,feedBackData,"All Journal Fetched Successfully")
            );
    } catch (error) {
        console.log("Error while fetching complete Feedback on paper author controller:", error);
        throw new ApiError(500, "Some internal Server Error"); 
    }
});

const uplaodUpdateJournal = asyncHandler(async(req,res)=>{
    try {
        //console.log(req.body);
        //console.log(req.file);

        let journalData = await Journal.findOne({_id:req.body.journalId});
        if(!journalData){
            return res.status(201).json(
                "Journal is not present ");
        }

        const previousPdf = journalData.journal_pdf;
        //console.log(previousPdf);
        const ReviewerStatus = journalData.reviewers.filter(function(reviewer) {
            // console.log(reviewer._id)
            return reviewer.journalStatus === "minor" || reviewer.journalStatus === "major";
          });
          for(let i=0;i<ReviewerStatus.length;i++)
            {
                ReviewerStatus[i].journalStatus = "UnderReview";
                ReviewerStatus[i].status= "accept";
            }

            let feedBackData = await FeedBack.findOne({journal:req.body.journalId, latest:true});
           // console.log(feedBackData);
           if(!feedBackData){
            return res.status(201).json(
                "Feedback is not present ");
           }

           const localJournalPath = req.file?.path;
           console.log("localJournalPath",localJournalPath);
           if(!localJournalPath){
              throw new ApiError(400,"Journal  is required");
           }
           const journalUrl = await uploadOnCloudinary(localJournalPath,'Journal_pdf');
            //console.log("journal clould url",journalUrl.url);
           if(!journalUrl){
              throw new ApiError(400,"Some error when upload the journal on server");
           }
           let revisionData = await Revision.findOne({journalId:req.body.journalId});

           if(revisionData === null){
            let revision = await Revision.create({
                journalId: req.body.journalId,
                journalPdf:[previousPdf]
            });
           }else{
            revisionData.journalPdf.push(previousPdf);
             await  revisionData.save();
           }
           console.log(revisionData);
           feedBackData.latest=false;
           journalData.status="UnderReview";
           journalData.journal_pdf = journalUrl.url;
           await journalData.save();
           await feedBackData.save();

           res.status(200)
            .json(
                new ApiResponse(200,[],"Paper update succesfully")
            );
    } catch (error) {
        console.log("Error while Submitting updated Paper author controller:", error);
        throw new ApiError(500, "Some internal Server Error");
    }
})

export {
    registerUser,
    loginUser,
    uplaodJournal,
    getJournal,
    getUserProfile,
    getCompleteDetailsOfJournal,
    getFeedBack,
    uplaodUpdateJournal
}