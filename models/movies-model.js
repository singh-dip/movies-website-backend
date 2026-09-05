const mongoose=require("mongoose")
const  moviesSchema=new mongoose.Schema({
    name:{type:String, required:true},

    description:{
        type:String,required:true
    },
    director:{
        type:[String],
        required:true
    },
    cast:{
        type:[String],
        required:true
    },
    language:{
        type:[String],
        required:true,
        default:["english"]
    },
    releaseDate:{
        type:String,
        required:true
    },
    releaseStatus:{
        type:String,
        required:true
    }
    
    
},{timestamps:true})

const Movies = new mongoose.model("Movies",moviesSchema)
module.exports=Movies