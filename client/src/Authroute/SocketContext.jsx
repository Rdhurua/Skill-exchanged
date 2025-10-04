import { useEffect, useContext, createContext, useState } from "react";
import { useAuthContext } from "./AuthContext.jsx";
import io from "socket.io-client";

export const SocketContext = createContext();
export const useSocketContext = () => useContext(SocketContext);

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const userId = authUser?._id;

  useEffect(() => {
    if (!userId) return;

    // Avoid multiple socket instances
    const socketInstance = io(import.meta.env.VITE_BASE_URL, {
      query: { userId },
      reconnectionAttempts: 3,
      timeout: 5000,
    });

    setSocket(socketInstance);
    socketInstance.on("getOnlineUsers", setOnlineUsers);

    return () => {
      socketInstance.disconnect();
      setSocket(null);
    };
  }, [userId]); // only depends on primitive userId

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
