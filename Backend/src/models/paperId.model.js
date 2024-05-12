import mongoose,{Schema} from "mongoose";

const paperIdSchema = new Schema({
    pId:{
       type:Number,
    }

   },{timestamp:true});

   export const PaperId = mongoose.model("PaperId",paperIdSchema);