import React,{useRef,useEffect,useState}from 'react'
import Message from './Message'
import useConversation from '../../zustand/useConversation.js';
const Messages = () => {
  const{messages}=useConversation();
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const containerRef = useRef();
  const lastMessageRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const atBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;

      setIsUserScrolling(!atBottom); 
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isUserScrolling) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  }, [messages, isUserScrolling]);


  return (
    <div ref={containerRef} className='flex flex-col h-full bg-gray-50 rounded-lg shadow-md overflow-y-auto p-4'>

      {messages.map((message,idx)=>(
        <div key={message._id} ref={idx === messages.length - 1 ? lastMessageRef : null}>
          <Message message={message}/>
        </div>
      ))
      }
    </div>
  

  )
}

export default Messages
