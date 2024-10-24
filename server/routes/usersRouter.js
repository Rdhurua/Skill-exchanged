const express=require("express");
const userModel=require("../model/user-model");
const router=express.Router();

 router.get("/",function(req,res){
     res.send("hey we are users don't ,just do the interest");
 });

 router.post("/register",async(req,res)=>{
    let{name,email,password}=req.body;
    let user=await userModel.create({
        name,
        email,
        password,
    })
    res.send(user);
     
 })

module.exports=router