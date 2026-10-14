const { isValidObjectId } = require('mongoose');
const ShowTime=require('../models/showtime.model')

const createShowTime=async(showTimeData)=>{
    // validation of theaterId and movies_id
    const showDateTime= req.body.showDateTime
    
    if(isValidObjectId(movies_id)||isValidObjectId(theaters_Id))
         return(400, 'Invalid ID format for movie or cinema hall')

    const movies_Id= await ShowTime.find(moviesId)
    if(movies_Id==null){
        return(404, "Movie not found. Please check the movieId.")
    }
    const theater_Id= await ShowTime.find(theaterId)
    if(theater_Id==null){
        return(404, "theaterId not found. Please check the theaterId .")

    } 
    const screen_Id=await ShowTime.find(screenId)
    if(screen_Id==null){
        return(404,"screenId not found.please check the screenId")
    }
        // validation of time
        currentTime=now()
        if(showDateTime <=! currentTime){
            return(400, "Showtime cannot be scheduled in the past.")
        }
        endDateTime= showDateTime + movie.durationInMinutes
       
        


    
    
    const result = await ShowTime.create(showTimeData)
    if(!result){
        throw new Error(" invalid show")
    }
    return result

}

module.exports={createShowTime}
     