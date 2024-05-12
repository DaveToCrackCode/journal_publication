import mongoose,{ Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        //trim: true, // Remove whitespace for better storage and queries
      },
      email: {
        type: String,
        required: true,
        unique: true, // Enforce unique Gmail addresses
        trim: true,
        validate: {
          validator: (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email),
          message: 'Invalid email format',
        },
      },
      password: {
        type: String,
        required: true,
        minlength: 7, // Enforce minimum password length
      },
      contact:{
        type:String,
        required:true
      },
      address:{
        type:String,
        required:true
      },
      city:{
        type:String,
        required:true
      },
      state:{
        type:String,
        required:true
      },
      country:{
        type:String,
        required:true
      },
      qualification: {
        type: String,
        required: true,
      },
      degree_pdf: {
        type: String,
        required: true,
      },
      isReviewer: {
        type: Boolean,
        default: false,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      specialistArea: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
},{timestamp:true});


userSchema.pre("save",async function(next){
    //phle ham check krege ki ahgar password phle hi encrypt hom chuka he to use dobara encrypt naa kare

    if(!this.isModified("password"))return next();

    this.password= await bcrypt.hash(this.password,10);
});

//upar hamne encrypt to kr diya pr user jab login karega to use asli password chahiye iske liye ham method banayenge 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);

}

//token genereate krne ke liye method

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            isReviewer:this.isReviewer,
            isAdmin:this.isAdmin
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema);