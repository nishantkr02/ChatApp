const asyncWrapper = (handlerFunction) =>{
    //Promise.resolve().catch() 

    return (req,res,next)=>{
        Promise
        .resolve(handlerFunction(req,res,next))
        .catch((err)=>next(err)) 

    }

}

export {asyncWrapper}





//Using Try catch ::
/* const asyncWrapper = (fn) => async (req,res,next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(error.code || 500).json({
            success :false ,
            message :error.message
        })
        
    }
} */









