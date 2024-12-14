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


app.use(cors({
      origin:"http://localhost:5173",
      credentials:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/users",usersRouter);
app.use("/admins",adminRouter);

app.get("/",function(req,res){
     res.send("hey we are setting up");
});

app.listen(5900);