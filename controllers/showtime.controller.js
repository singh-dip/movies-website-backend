const {createShowTime}=require("../services/showtime.service")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendResponse")


const showTimeCreate=async(req,res)=>{
    try{
        const order=req.body
        const showTime=await createShowTime(order)
        sendSuccessResponse(200, showTime,"showTime successfully created")

    }
    catch(error){
        sendErrorResponse(res, 400, error.message)

    };
    
} 
module.exports={
    showTimeCreate

}