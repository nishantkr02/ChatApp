import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN ,
    credentials :true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))

app.use(cookieParser())


//user Route
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user",userRouter)


//message Route
import messageRouter from "./routes/message.routes.js";
app.use("/api/v1/chat",messageRouter)

app.get("/",(req,res)=>{
    res.send("Hi there ..")
})
export default app ;