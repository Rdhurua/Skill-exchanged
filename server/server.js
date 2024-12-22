const express=require("express");
const app=express();
const cors=require("cors");
const db=require("./config/mongoose-connection");
const cookieParser=require("cookie-parser")
const usersRouter=require("./routes/usersRouter")
const adminRouter=require("./routes/adminsRouter");
const bodyParser=require("body-parser");
const path=require('path');
require("dotenv").config();

// const allowedOrigins = [process.env.FRONTEND_URL1 || "http://localhost:5173"];

const corsOptions = {
      origin: process.env.FRONTEND_URL, // Replace with your frontend URL
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
      credentials: true, // If you're using cookies/auth tokens
    };

app.use(cors(corsOptions));
// app.use(express.json());
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users",usersRouter);
app.use("/admins",adminRouter);

app.get("/",function(req,res){
     res.send("hey we are setting up");
});

app.listen(5900);