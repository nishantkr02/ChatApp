import express from "express"
import {Server} from "socket.io" 
import http from "http"

import { app } from "../app.js"

//this server  will be exported and  used in the socektIO ::
const httpServer = http.createServer(app)
//Note  : to keep things clean i wrote all the soket.io code separetely

const io = new Server(httpServer,{
    cors:{
        origin:[process.env.CORS_ORIGIN],
    },
})

io.on("connection",(socket)=>{
    console.log("A user connected :",socket.id)

    socket.on("disconnect",()=>{
        console.log("A user disconneted  : ",socket.id)
    })
})

export  {httpServer}
