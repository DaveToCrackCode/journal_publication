import mongoose,{Schema} from "mongoose";

const feedbackSchema = new Schema({
 author:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
 },
 remarks:{
    type:String,
 },
 feedbackAnswer:{
   type: Schema.Types.Mixed
 },
 reviewer:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true
 },
 journal:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal',
    required:true
 }

},{timestamp:true});

export const FeedBack = mongoose.model("FeedBack",feedbackSchema);