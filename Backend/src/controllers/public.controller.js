import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
import {ApiError} from  "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ArchiveVolume } from "../models/archiveVolume.model.js";
import { ArchiveVolumeHelper } from "../models/archiveVolumeHelper.model.js";
import { Journal } from "../models/journal.model.js";

const getArchiveData = asyncHandler(async(req,res)=>{
    try {
        //const user = req.user;
       // console.log(user);
        const data = await ArchiveVolumeHelper.find();
       // console.log(data);

        if(!data){
            throw new ApiError(400,"Some error when fetching Volume  from database");
        }

        return res.status(200).json(
            new ApiResponse(200,data,"All Volume are fetched successfully")
        );

    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }
});

const getIssueData = asyncHandler(async(req,res)=>{
    try {
        const vol =req.params.vol;
        console.log(vol);
        const volume = parseInt(vol,10);
        console.log(typeof(volume));
        const data = await ArchiveVolumeHelper.findOne({volume:volume});
        console.log(data.issue);

        if(!data){
            return res.status(201).json(
                   new ApiResponse(201,"Issue is not present here ")
                );
        }

        return res.status(200).json(
            new ApiResponse(200,data.issue,"All Volume are fetched successfully")
        );

    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }
});

const getArchivePaperData = asyncHandler(async(req,res)=>{
    try {
        const vol = req.query.vol;
        const issu = req.query.issu;

        const volume = parseInt(vol, 10);
        const issue = parseInt(issu, 10);

        const data = await ArchiveVolume.find({ volume: volume, issue: issue });
        //console.log(data);
        if(!data || data.length === 0) {
            return res.status(201).json(
                new ApiResponse(201, "Issue is not present here ")
            );
        }

        return res.status(200).json(
            new ApiResponse(200, data, "All Volume are fetched successfully")
        );

    } catch (error) {
        throw new ApiError(500, "Some internal Server Error");
    }
});

const getArchieveJournaltDetails = asyncHandler(async(req,res)=>{
    try {

       const id = req.params.id;

       const archieveJournal = await ArchiveVolume.findById({_id:id});

       if(!archieveJournal){
        throw new ApiError(400,"Some error when fetching Journal from database");
    }

    return res.status(200).json(
        new ApiResponse(200,{data:archieveJournal},"Journal data fetched successfully")
    );
    } catch (error) {
        throw new ApiError(500,"Some internal Server Error");
    }
});

export {
    getArchiveData,
    getIssueData ,
    getArchivePaperData,
    getArchieveJournaltDetails
}