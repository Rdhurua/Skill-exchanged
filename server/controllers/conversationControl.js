import ConversationModel from "../model/conversation.model.js"

export  const conversationController =async(req,res)=>{

     const {participant2,participant1}=req.body;
     

     try{
        const query = { participants: { $all: [participant1, participant2] } };

        const Conversation=await ConversationModel.find(query);
        console.log(Conversation);
        res.status(200).json(Conversation);

     }
     catch(error){
        res.status(400).json({message:error.message});
     }

}