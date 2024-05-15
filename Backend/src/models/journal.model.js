import mongoose,{Schema} from "mongoose";

// const User = require('./User'); // Assuming your User schema is in a separate file

const journalSchema = new mongoose.Schema({
  paper_id:{
    type:Number,
    required:true
  },
  title: {
    type: String,
    required: true,
    // trim: true,
  },
  keyword:{
    type:String,
    required:true
  },
  abstract: {
    type: String,
    required: true,
    // trim: true,
  },
  journal_pdf: {
    type: String,
   required: true,
    
  },
  status: {
    type: String,
    enum: ['pending', 'UnderReview', 'minor','minorRaised','major','minorRaised','accepted', 'published'],
    default: 'pending',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  journalType: {
    type: String,
    required: true,
  },
  reviewers: [{
    journalStatus:{
      type: String,
      enum: ['none','minor','major','UnderReview','Accepted'],
      default:  'none'

    },
    status: {
      type: String,
      enum: ['none', 'accept', 'reject','feedbackGiven'],
      default: 'none'
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
  
  // Optional fields can be added here (e.g., author notes, reviewers, etc.)
},{timestamp:true});

export const Journal = mongoose.model("Journal",journalSchema);