const { model } = require("mongoose");
const modelServices=require("../models/movies-model")

const createMovies= async(MoviesData)=>{
    const data= await modelServices.create(MoviesData);
    if(!data){
        throw new Error("something wrong")

    }
    return data;
}
const deleteMovies = async (id) => {
    const result = await modelServices.findByIdAndDelete(id);
    if (!result) {
        throw new Error("USER_NOT_FOUND")
    }
    return result;
}


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

    // $or means: match if ANY of these conditions are true
    const movies = await Movie.find({
        $or: [
            { title: regex },       // Does the title contain "nolan"?
            { director: regex },    // Does the director name contain "nolan"?
            { genre: regex },       // Does the genre contain "nolan"?
            { description: regex }  // Does the description contain "nolan"?
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