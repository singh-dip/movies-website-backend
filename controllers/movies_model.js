const { createMovies, deleteMovies, getId, updateData,multiFieldSearch } = require("../services/services")
const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendResponse")

const MoviesCreate = async (req, res) => {
    try {
        const result = await createMovies(req.body)
        sendSuccessResponse(res, 200, result, "successfully created movies")

    }
    catch (err) {
        console.log(err)
        sendErrorResponse(res, 500, err)
    }
}

const  MoviesDelete = async (req, res) => {
    try {
        const data = await deleteMovies(req.params.id)
        sendSuccessResponse(res, 200, data, "User deleted successfully")

    }
    catch (err) {
        sendErrorResponse(res, 500, err)
    }
} 

const MoviesGet = async (req, res) => {
    try {
        const result = await getId(req.params.id)
        sendSuccessResponse(res, 200, result, "successfully find movies")

    }
    catch (err) {
        if (err.message === "USER_NOT_FOUND") {
            return sendErrorResponse(res, 500, "The requested movies does not exist")
        }
        sendErrorResponse(res, 500, err)
    }
} 
const update=async(req,res)=>{
    try{ 
        const id=req.params.id
        const load=req.body

        const data= await updateData(id,load)
        sendSuccessResponse(res,200,data,"successfully update")
    }
    catch(err){
         if (err.message === "USER_NOT_FOUND") {
            return sendErrorResponse(res, 500, "The requested movies does not exist")
        }
        sendErrorResponse(res, 500, err)

    }
}
const  searchField = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query || query.trim() === '') {
            return res.status(400).json({ success: false, message: 'Search term required' });
        }

        const movies = await multiFieldSearch(query.trim());

        res.status(200).json({ success: true, count: movies.length, data: movies });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    MoviesCreate,
    MoviesDelete,
    MoviesGet,
    update,
    searchField
    
}
