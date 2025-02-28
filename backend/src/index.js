import app from './app.js'
dotenv.config({
    path:'./.env'
})
import dotenv from "dotenv"
import connectDb from './db/connectDb.js'





connectDb()
.then(()=>{

    app.on("Error",(error)=>{
        console.log("Error Occured While connecting to the DataBase .. :",error)
    })
    app.listen(process.env.PORT || 8000 ,()=>console.log("Server is listening on port : ",process.env.PORT))
})
.catch((error)=>{
    console.log("Mongoose Connection Error",error);
}
)
    

 
