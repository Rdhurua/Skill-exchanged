import express from 'express';
import addmiddleware from "../middleware/isLoggin.js"
import {conversationController} from "../controllers/conversationControl.js"
const router=express.Router();

router.post("/",conversationController);

export default router;