import {Server} from "socket.io" 
import http from "http"
import { app } from "../app.js"


const httpServer = http.createServer(app)

const io = new Server(httpServer,{
    cors:{
        origin:[process.env.CORS_ORIGIN],//frontend url
    },
})


//Helper function for the realtime chat app :::
export const getReceiverSocketId=(userId)=>{
return onlineUsers[userId];
}

//Storing online users {userId :socketId} , userId from the db and the socketId from the socket instance
const onlineUsers ={}




io.on("connection",(socket)=>{
    console.log("A user connected :",socket.id)

    //this is the accesing the data  on the server side (Node.js + Socket.IO):
    const userId = socket.handshake.query.userId ;


    if(userId) onlineUsers[userId]=socket.id //storing the user to the online user list

    //io.emit :: used to send event to all connected user
    io.emit("checkOnlineUsers",Object.keys(onlineUsers))

    socket.on("disconnect",()=>{
        console.log("A user disconneted  : ",socket.id)

        delete onlineUsers[userId]

        io.emit("checkOnlineUser",Object.keys(onlineUsers))
    })
})

export  {httpServer,io}
 