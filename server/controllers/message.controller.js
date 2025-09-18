
import Conversation from '../model/conversation.model.js'
import Message from '../model/message.model.js'
import { getReceiverSocketId } from '../socket.js';
import {io} from '../socket.js';


export const  sendMessage=async (req,res)=>{
  try{
    const {message,receiverId,senderId}=req.body
    //  const {id: receiverId}=req.params;
    //  const senderId=req.user._id;
    if(!message ||!receiverId || !senderId){
      return res.status(400).json({message:"all fields are required"});
    }
      let conversation=await Conversation.findOne({
        participants:{$all:[senderId, receiverId]},
      });

      if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,receiverId],

        });
      }
      let newMessage=new Message({
         senderId,
         receiverId,
         message,
      });

       
      if(newMessage){
        conversation.messages.push(newMessage._id);
      }
      // await conversation.save();
      // await newMessage.save();

      await Promise.all([conversation.save(),newMessage.save()]);

      const receiverSocketId=getReceiverSocketId(receiverId);
      io.to(receiverSocketId).emit("newMessage",newMessage);
      
      return res.status(201).json(newMessage);


  }
  catch(error){
    console.log("error in message controller 5 : ",error.message)
     return res.status(400).json({
         error:"internal server error",
     });
  }
 
}

export const getMessage=async(req,res)=>{
  try{
     const {participant2,participant1}=req.body;
    //  const senderId= req.user._id;

     const conversation=await Conversation.findOne({
      participants:{$all:[participant1,participant2]},
     }).populate("messages");

     if(!conversation){
      res.status(200).json([]);
     }
     else{
       const messages=conversation.messages;
       return res.status(201).json(messages);

     }
  }
  catch(error){
    console.log("error in message controller : ",error.message)
     return res.status(400).json({
         error:"internal server error",
     });
  }
}
