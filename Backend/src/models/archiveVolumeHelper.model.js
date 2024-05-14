import mongoose,{Schema} from "mongoose";

const archiveVolumeHelperSchema = new Schema({
   volume:{
    type:Number,
    required:true
   },
   issue:{
    type:[Number]
   }
   
   },{timestamp:true});
   
   export const ArchiveVolumeHelper = mongoose.model("ArchiveVolumeHelper",archiveVolumeHelperSchema);