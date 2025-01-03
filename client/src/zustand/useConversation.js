import {create} from 'zustand'

const useConversation = create((set)=>({
      me:null,
      setMe:(me)=>set({me}),
     loggedId:null,
     setLoggedId:(loggedId)=>set({loggedId}),
     selectedConversation:null,
     setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
     messages:[],
     setMessages:(messages)=>set({messages}),

}));

export default useConversation;
