import {httpServer} from "./utils/socket.js"

dotenv.config({
    path:'./.env'
})
import dotenv from "dotenv"
import connectDb from './db/connectDb.js'




connectDb()
.then(()=>{

    httpServer.on("Error",(error)=>{
        console.log("Error Occured While connecting to the DataBase .. :",error)
    })
    httpServer.listen(process.env.PORT || 8000 ,()=>console.log("Server is listening on port : ",process.env.PORT))
})
.catch((error)=>{
    console.log("Mongoose Connection Error",error);
}
)
    

 
