const { CustomAPIError } = require("../error/customAPIError");

const errorHandler=(err,req,res,next)=>{
    if(err instanceof CustomAPIError){
        return res.status(res.statusCode).json({msg:err.message})
    }    
    res.status(500).json({msg:`Something went wrong, try again later`})
}
module.exports=errorHandler;