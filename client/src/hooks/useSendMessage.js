import {useState} from 'react'
import useConversation from "../zustand/useConversation.js";
import {toast} from 'react-hot-toast'

const useSendMessage = () => {
  const[loading,setLoading]=useState(false);
  const {messages,setMessages,selectedConversation,loggedId}=useConversation();

    const sendMessage=async(message)=>{
        setLoading(true);
          try{
            const res=await fetch(`http://localhost:5900/messages/send`,{
                method:"POST",
                headers:{
                   "Content-Type":"application/json"
                   },
                body:JSON.stringify({message,
                  receiverId:selectedConversation._id,
                  senderId:loggedId,
                }),
            });

            const data=await res.json();

            if(data.error){
                throw new Error(data.error);
            }
            setMessages([...messages, data]);
            console.log(data);
          }
          catch(error){
             toast.error(error.message);
          }
          finally{
              setLoading(false);
             
          }
    }
    return {sendMessage,loading};
}

export default useSendMessage
