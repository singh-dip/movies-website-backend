const Screen = require('../models/screen-model')

// ERROR FIXED: Renamed import from 'screenHall' to 'Screen'
// The model exports a Mongoose model class, not a service object.
// Using 'Screen' follows standard naming convention for model classes.

const screenCreate = async (screenData) => {
    // ERROR FIXED: Removed unnecessary null check
    // Screen.create() never returns null — it either resolves with the created document
    // or throws a ValidationError / MongoError. The old check `if (!result)` was dead code.
    
    // ERROR FIXED: Use correct variable name 'Screen' (not 'screenHall')
    const result = await Screen.create(screenData)
    return result
}

// get one theaterId multiple screen

const multiScreen=async(theaterId)=>{
    if(!theaterId){
        throw new Error("theaterId invalid")
    }
    const theaterIds=await Screen.find({theaterId:theaterId}).populate("theaterId")
    return theaterIds

}
// get one screen
const getOneScreen=async(_id)=>{
    const result=await Screen.findById(_id).populate("theaterId")

    if(!result){
        throw new Error('invalid screen')
    }
    return result
}
//update be the screenName seatType,status,

const updateData=async(dataId, data)=>{
    const updateDataId=await Screen.findByIdAndUpdate(dataId, data, {new: true})
    if(!updateDataId){
        throw new Error("screen invalid")
    } 
    return updateDataId
}
 
module.exports = { screenCreate,multiScreen,getOneScreen,updateData }

// NOTE: The controller (controllers/screenHall.js) must also be updated to import from this service:
// OLD: const {screenCreate}populate(result)=require("../models/screen-model")
// NEW: const { screenCreate } = require("../services/screenHall")