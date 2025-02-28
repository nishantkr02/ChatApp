import mongoose from "mongoose"
import {DB_NAME} from '../constants.js'




const connectDb = async()=>{
    
   
    try {
        //console.log("MongoDb Url and Db Name : ",process.env.MONGODB_URI,DB_NAME)

       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       console.log(`\n MongoDb Connceted .. || \n DB Host : ${connectionInstance.connection.host}`)

        
        
    } catch (error) {
        console.log("MongoDB Connection Error Occured :",error) ;

         //NodeJs gives us the access of process : read about exit codes
         process.exit(1)
    }
}
export default connectDb ;


/* Basic Method :
const app = express()
 const connectDb = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/chatApp`)

        //there can be time when the express is not able to talk to the db , in that case this check will be used .
        app.on("error",(error)=>{
            console.log("Error from express :",error );
            throw error 
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is running on the port : ${process.env.PORT}`)
        })
        
    } catch (error) {
        console.log("MongoDB Connection Error Occured :",error) ;
        throw error 
    }
} */