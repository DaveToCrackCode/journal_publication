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
        const degreeLocalPath = req.files['degree_pdf'][0].path;
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
         
        const imageLocalPath = req.files['image'][0].path;
        if(!imageLocalPath){
            throw new ApiError(400,"Image file is required");
        }
        const image = await uploadOnCloudinary(imageLocalPath, "user_avtar");
        if (!image) {
            throw new ApiError(400, "Image file upload failed");
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
            image:image.url,
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
           const {title,keyword,abstract,journalType} = req.body;
           console.log(req.body);
           const user = req.user;
           
           if(
            [title,keyword,abstract,journalType].some((field)=> field?.trim() === "")
           )
           {
                throw  new ApiError(400,"All fields are required");
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
              abstract,
              journal_pdf: journalUrl.url,
              author:user._id,
              journalType
           });

           if(!data){
              throw new ApiError(402,"error occured when saving the document into the database");
           }
          console.log(data);
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

            if (reviewer.status === 'accept') {
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


export {
    registerUser,
    loginUser,
    uplaodJournal,
    getJournal,
    getUserProfile,
    getCompleteDetailsOfJournal
}