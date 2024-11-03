const express=require("express");
const adminModel=require("../model/admin-model");
const router=express.Router();
const {loginAdmin,registeredAdmin}=require("../controllers/authController");

 router.get("/",(req,res)=>{
     res.send("hey here admin it is");
 })

router.post("/login",loginAdmin);
router.post("/register",registeredAdmin);
module.exports=router;