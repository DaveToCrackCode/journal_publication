import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();

app.use(cors());
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(express.json({limit:"16kb"})); // agar form ka data json formate me aata he to use is middleware se use kiya jata he phle body-parser bhi use kiya jaat tha 
app.use(urlencoded({extended:true,limit:"16kb"})); // jab url me data aata he to bo diffrent diffrent charecter leta he use shi formate me change krta he 
app.use(express.static("public")) // agar hame koi cheej server pr store krna he to yha uska path dena hota he ye middleware usi kam me aata he 

app.use(cookieParser()) // iska use ham isiliye krte he ki jab ham client side pr store cookie pr server se read writew operation kr ske 

//import routes
import authorRouter from './routes/author.routes.js'
import adminRouter from './routes/admin.routes.js'
import reviewersRoute from './routes/reviewers.routes.js';
app.use("/api/v1/author",authorRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/reviewer",reviewersRoute);

export {app};