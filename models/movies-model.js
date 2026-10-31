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
    casts:{
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
    }, 
    durationInMinutes: {
    type: Number,
    required: true, // An admin MUST enter how long the movie is when creating it
    min: 1 // A movie cannot be 0 minutes long
  },
    
    
},{timestamps:true})

const Movies = new mongoose.model("Movies",moviesSchema)
module.exports=Movies