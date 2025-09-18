import express from "express";
import http from"http";
import {Server} from "socket.io";
import  cors from "cors";

const app=express();

const server=http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

  const userSocketMap={};

  io.on('connection', (socket) => {
    console.log("user connected:", socket.id);
  
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
      userSocketMap[userId] = socket.id;
    }
  
    // Emit the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log("user is disconnected:", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
  


export{io,server,app};