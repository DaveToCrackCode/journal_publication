import mongoose,{Schema} from "mongoose";

const revisionSchema = new Schema({
 journalId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal',
    required:true
 },
 journalPdf:[{
    type:String,
    required:true
 }],
 

},{timestamp:true});

export const Revision = mongoose.model("Revision",revisionSchema);