const { model } = require("mongoose");
const modelServices=require("../models/movies-model")

const createMovies= async(MoviesData)=>{
    const data= await modelServices.create(MoviesData);
    if(!data){
        throw new Error("something wrong")

    }
    return data;
}
//delete movies
const deleteMovies = async (id) => {
    const result = await modelServices.findByIdAndDelete(id);
    if (!result) {
        throw new Error("USER_NOT_FOUND")
    }
    return result;
}

// get movies data list 
const getId = async (id) => {
    const userId = await modelServices.findById(id)
    if (!userId) {
        throw new Error("User not found")
    }
    return userId
}

const updateData = async (id, load) => {
    if (!id) {
        throw new Error("userId not be found")
    }
    const result = await modelServices.findByIdAndUpdate(id, load, { new: true })
    return result
}
const multiFieldSearch = async (searchTerm) => {
    const regex = new RegExp(searchTerm, 'i');

    const movies = await modelServices.find({
        $or: [
            { name: regex },
            { director: regex },
            { casts: regex },
            { description: regex }
        ]
    });

    return movies;
};




module.exports={
    createMovies,
    deleteMovies,
    getId,
    updateData,
    multiFieldSearch 


}    