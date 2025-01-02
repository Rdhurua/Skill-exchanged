import express from "express";
import adminModel from "../model/admin-model.js";

import {loginAdmin,registeredAdmin} from "../controllers/authController.js";
const router=express.Router();

 router.get("/",(req,res)=>{
     res.send("hey here admin it is");
 })

router.post("/login",loginAdmin);
router.post("/register",registeredAdmin);
export default router;