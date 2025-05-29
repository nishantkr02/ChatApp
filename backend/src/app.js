import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express"
import path from "path";




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
app.use("/api/v1/chats",messageRouter)


// ✅ Serve frontend in production
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")))

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
  })
}

export {app} ;