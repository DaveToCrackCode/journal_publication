import {v2 as cloudinary} from 'cloudinary';
import fs from "fs";

//ye clodinary ka congigration he 

cloudinary.config({ 
  cloud_name:"dc6tczoju", 
  api_key: 194667882311387, 
  api_secret: "DNc-a9L9f3z4FO5ggTrgcVMNR34" 
});

const uploadOnCloudinary =async (localFilePath,targetFolder)=>{
     try {
        // console.log("hhhhhhhh");
        if(!localFilePath)return null;
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto",
            folder:targetFolder
        });
      //   console.log("file upload on cloudinary",response.url);
        fs.unlinkSync(localFilePath);
        return response;

     } catch (error) {
        //agar koi problem aai to file ko local server se hata denge;
        console.log("cloudinary",error);
        fs.unlinkSync(localFilePath);
        return null;

     }
}

export {uploadOnCloudinary}