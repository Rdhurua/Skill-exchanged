import {useEffect, useState} from 'react'
import useConversation from "../zustand/useConversation.js";
import {toast} from 'react-hot-toast'

const useGetMessage = () => {
    const {messages,setMessages,selectedConversation,loggedId}=useConversation();
        const [loading,setLoading]=useState(false);

        useEffect(() => {
            const getMessages = async () => {
                setLoading(true);
                try {
                    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/messages/getMessage`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        participant1:loggedId, // Assuming `participant1` is a known variable or prop
                        participant2:selectedConversation._id,
                      }),
                    });
              
                    const data = await res.json();
                    if (data.error) {throw new Error(data.error)};

                    setMessages(data);
                } catch (error) {
                    toast.error(error.message);
                } finally {
                    setLoading(false);
                }
            };
    
          if(selectedConversation?._id) {getMessages();}
           


        }, [selectedConversation?._id,setMessages]);
    
        return {loading};
}

export default useGetMessage;
