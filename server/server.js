const express=require("express");
const app=express();
const cors=require("cors");
const db=require("./config/mongoose-connection");
const usersRouter=require("./routes/usersRouter")
const bodyParser=require("body-parser");
require("dotenv").config();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/users",usersRouter);
// app.use("/admin",adminRouter);

app.get("/",function(req,res){
     res.send("hey we are setting up");
});
app.listen(5900);