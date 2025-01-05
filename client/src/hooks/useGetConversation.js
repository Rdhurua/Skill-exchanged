import { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { setSelectedConversation } = useConversation();

  const fetchConversations = async (participant2) => {
    if (!participant2) {
      toast.error("Participant ID is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/conversation`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ participant2 }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setSelectedConversation(data);
    
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { fetchConversations,loading };
};

export default useGetConversations;
