import React, { useEffect } from 'react';
import { useSocketContext } from "../Authroute/SocketContext.jsx";
import useConversation from "../zustand/useConversation";
import notification from '../assets/notification.mp3';

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        // Create the audio object once
        const sound = new Audio(notification);

        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            
            // Attempt to play the sound
            sound.play().catch((error) => {
                console.warn("Audio playback failed:", error.message);
            });

            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);

    return null;
};

export default useListenMessages;
