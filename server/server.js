import express from "express";
import cors from "cors";
import connectTodb from './config/mongoose-connection.js'
import cookieParser from "cookie-parser";
import usersRouter from "./routes/usersRouter.js";
import adminRouter from "./routes/adminsRouter.js";
import messageRouter from "./routes/message.route.js"
import conversationRouter from "./routes/conversation.route.js"
import User from './model/user-model.js'; 
import bodyParser from "body-parser";
import path from 'path';
import {app,io,server} from "./socket.js";
import dotenv from 'dotenv';
import cron from 'node-cron'


dotenv.config();


const PORT=5900;
const corsOptions = {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      credentials: true, 
    };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.use("/users",usersRouter);
app.use("/admin",adminRouter);
app.use("/messages",messageRouter);
app.use("/conversation",conversationRouter);


cron.schedule('0 0 * * *', async () => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await User.updateMany(
      { updatedAt: { $lt: sevenDaysAgo } },
      { isActive: false }
    );

    console.log(`${result.modifiedCount} users marked as inactive.`);
  } catch (error) {
    console.error('Error updating inactive users:', error);
  }
});


 server.listen(PORT,()=>{
  connectTodb();
  console.log("listening to port :",5900);
 });