const { model } = require("mongoose");
const modelServices=require("../models/movies-model")

const createMovies= async(MoviesData)=>{
    const data= await modelServices.create(MoviesData);
    if(!data){
        throw new Error("something wrong")

    }
    return data;
}
const deleteMovies=async(_id)=>{
    const result = await modelServices.findByIdAndDelete(_id);
    if (!result){
        throw new Error("USER_NOT_FOUND")
   
}
return result;
}


const getId=async(MoviesId)=>{
    const userId=await modelServices.findById({_id:MoviesId})
    if(userId==0){
        throw new error("User not found")
    }
    return userId
}



module.exports={
    createMovies,
    deleteMovies,
    getId

}    