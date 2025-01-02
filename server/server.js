import express from "express";
import cors from "cors";
import connectTodb from './config/mongoose-connection.js'
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRouter.js";
import adminRouter from "./routes/adminsRouter.js";
import messageRouter from "./routes/message.route.js"
import conversationRouter from "./routes/conversation.route.js"
import bodyParser from "body-parser";
import path from 'path';
import {app,io,server} from "./socket.js";
import dotenv from 'dotenv';
dotenv.config();

//  const app=express();
const PORT=5900;
const corsOptions = {
      origin: process.env.FRONTEND_URL, // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      credentials: true, // If you're using cookies/auth tokens
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/users",usersRouter);
app.use("/admins",adminRouter);
app.use("/messages",messageRouter);
app.use("/conversation",conversationRouter);

// app.get("/",function(req,res){
//      res.send("hey we are setting up");
// });


 server.listen(PORT,()=>{
  connectTodb();
  console.log("listening to port :",5900);
 });