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

export const conversationsAll=async (req, res) => {
   const { userId } = req.params;  // Get userId from URL params

   try {
       const conversations = await ConversationModel.find({
           participants: { $in: [userId] }  // Find all conversations where user is a participant
       }).sort({ updatedAt: -1 });
        //  console.log(conversations);
       res.status(200).json(conversations);
   } catch (error) {
       res.status(500).json({ message: "Error fetching conversations", error: error.message });
   }
};