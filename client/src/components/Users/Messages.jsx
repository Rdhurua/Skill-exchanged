import React, { useRef, useEffect, useState } from 'react';
import Message from './Message';
import useConversation from '../../zustand/useConversation.js';

const Messages = () => {
  const { messages } = useConversation();
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const containerRef = useRef();
  const lastMessageRef = useRef();

  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (!container) return;

      const atBottom =
        container.scrollHeight - container.scrollTop <= container.clientHeight + 10; // 10px threshold

      setIsUserScrolling(!atBottom);
    };

    const debouncedHandleScroll = debounce(handleScroll, 100);

    if (container) {
      container.addEventListener('scroll', debouncedHandleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', debouncedHandleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!isUserScrolling) {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isUserScrolling]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full bg-gray-50 rounded-lg shadow-md overflow-y-auto p-4"
    >
      {messages.map((message, idx) => (
        <div
          key={message._id}
          ref={idx === messages.length - 1 ? lastMessageRef : null}
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default Messages;


function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
