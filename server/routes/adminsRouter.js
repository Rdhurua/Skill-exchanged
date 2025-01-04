import express from "express";
import adminModel from "../model/admin-model.js";
import adminAuth from "../middleware/adminAuth.js"

import {loginAdmin,registeredAdmin,logoutAdmin} from "../controllers/authController.js";
import {updateUser, deleteUser,getAllUsers,Statistics } from "../controllers/adminController.js";

const router=express.Router();

 router.get("/",(req,res)=>{
     res.send("hey here admin it is");
 })

router.post("/login",loginAdmin);
router.post("/register",registeredAdmin);
router.get("/logout",logoutAdmin);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/statistics',Statistics);
export default router;