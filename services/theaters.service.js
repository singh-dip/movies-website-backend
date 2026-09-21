const theaterServices=require('../models/Theaters.model')
const moviesService=require("../models/movies-model")


const createTheaters=async(data)=>{
    const result= await theaterServices.create(data)
    
    return result 
}

const DeleteTheatersId=async(id)=>{
    const theatersId = await theaterServices.findByIdAndDelete(id)
    if(!theatersId){
        throw new Error("TheatersId not be found")
    }
    return theatersId
} 
const searchTheaters = async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i');
    
    const theaters = await theaterServices.find({
        $or: [
            { name: regex },
            { city: regex },
            { Address: regex },
            {Zipcode:regex}
        ],
        isActive: true // Only show active theaters
    })
    
    return theaters;
}

const updateId=async(theatersId, updateData)=>{
    const result= await theaterServices.findByIdAndUpdate(theatersId,updateData,{new:true})
    if(!result){
        throw new Error("theatres not be found")
    }
    return result
}
const serviceTheaters= async(theaterId,moviesId)=>{
    const result= await theaterServices.findById(theaterId)
    if(!result){
        throw new Error("theatersId not be found")
    }
    const movie=movies.find({
        _id:{$in:moviesId}
    }).select(_id)
    const validMovies=movie.map(movies=>movies._id)

    result.movies=validMovies
    await result.save()
    return result
}
module.exports={
     createTheaters,
     DeleteTheatersId,
     searchTheaters,updateId,
     serviceTheaters

}