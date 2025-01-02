import express from 'express'
import { getMessage, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/isLoggin.js'
const router=express.Router();

  router.get("/",(req,res)=>{
   res.send("hello")
  })
router.post("/getMessage",getMessage);

router.post("/send/",sendMessage);


export default router;