import mongoose,{Schema} from "mongoose";

const reviewerRequestSchema = new Schema({
    reviewerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

   },{timestamp:true});

   export const ReviewerRequest = mongoose.model("ReviewerRequest",reviewerRequestSchema);