const validation =(req,res,next)=>{
    if(!name){
        res.status(400).json({
            success:false,
            err:"name of the movies required",

        }) 
        if(!description){
            res.status(400).json({
                 success:false,
            err:"description be required"

            })
        }



    }  
    next()
}
module.exports=validation