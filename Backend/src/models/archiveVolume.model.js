import mongoose,{Schema} from "mongoose";

const archiveVolumeSchema = new Schema({
   volume:{
    type:Number,
    
   },
   issue:{
    type:Number,
   
   },
  title:{
    type:String,
     required:true
  },
  author:{
    type:String,
    required:true
  },
  pageNumber:{
    type:String,
    required:true
  },
  date:{
    type:String,
    required:true
  },
  abstract:{
    type:String,
    required:true
  },
  paperDegree:{
    type:String,
    required:true
  }
   },{timestamp:true});
   
   export const ArchiveVolume = mongoose.model("ArchiveVolume",archiveVolumeSchema);