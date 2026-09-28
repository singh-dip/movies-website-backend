const { screenCreate,multiScreen ,getOneScreen,updateData } = require("../services/screenHall")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendResponse")

// ERROR FIXED: Import from service (../services/screenHall), not model
// The model exports a Mongoose class, not { screenCreate }.
// The service layer encapsulates business logic and is the correct dependency.

// ERROR FIXED: Import from correct path "../utils/sendResponse" (not "../utils")

const screenCreates = async (req, res) => {
    try {
        const screenData = req.body
        const result = await screenCreate(screenData)

        // ERROR FIXED: sendSuccessResponse signature is (res, statusCode, result, message)
        // OLD: sendSuccessResponse(200, res, result, "screenHall be created")
        sendSuccessResponse(res, 201, result, "Screen created successfully")

    } catch (error) {
        // ERROR FIXED: sendErrorResponse signature is (res, statusCode, error)
        // OLD: sendErrorResponse(res, 400, error.message)
        sendErrorResponse(res, 400, error)
    }
}



//multiple screen  get in theatersId
const multiScreens=async(req,res)=>{
    
    try{
        const theaterId=req.params.theaterId
        const result=await multiScreen(theaterId )
         sendSuccessResponse(res,200,result,"totalScreen")

    }
    catch(error){
         sendErrorResponse(res, 400, error)
    

    }
}

const getSCreen=async(req,res)=>{
    try{
        const _id= req.params.id
        const data= await  getOneScreen(_id)
         sendSuccessResponse(res,200,data)
    }
    catch(error){
         sendErrorResponse(res, 400, error)

    }
}

const update_Data=async(req,res)=>{
    try{
        const data=req.body;
        const dataId=req.params.id
        const result=await updateData(dataId, data)
        sendSuccessResponse(res,200,result,"update successfully") 

    }
    catch(error){
         sendErrorResponse(res, 400, error)

    }
}



module.exports = { screenCreates,multiScreens,getSCreen,update_Data}