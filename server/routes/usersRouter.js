const express=require("express");
const userModel=require("../model/user-model");
const router=express.Router();
 const {registeredUser}=require("../controllers/authController")
 router.get("/",function(req,res){
     res.send("hey we are users don't ,just do the interest");
 });

 router.post("/register",registeredUser)

module.exports=router