class  apiError extends Error {
     constructor (statusCode,message="" ,errors =[],stack=""){
         //overwriting the parent class message with our own
         super(message)

         this.statusCode= statusCode
         this.data= null 
         //This is not really necessary , but if we want to customize the message then it will be helpful
         this.message = message
         this.success = false
         this.errors = errors


         if(stack){
            this.stack = stack
         }
         else{
            Error.captureStackTrace(this,this.constructor)
         }

     }
}

export {apiError}