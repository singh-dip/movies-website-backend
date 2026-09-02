const Movies = require("../models/movies-model")



const MoviesCreate=async(req,res)=>{
    try{
         const result=await Movies.create(req.body)
        res.status(200).json({
            result:result,
            success:true,
            message:"successfully created movies"
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:err.message
        })
        
    }
}
module.exports=MoviesCreate
