import express from 'express';
import addmiddleware from "../middleware/isLoggin.js"
import {conversationController, conversationsAll} from "../controllers/conversationControl.js"
const router=express.Router();

router.post("/",conversationController);
router.get("/conv/:userId",conversationsAll);

export default router;