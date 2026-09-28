const mongoose= require("mongoose")

const TheatersModel=new mongoose.Schema({
    name:{type:String,required:true },
    city:{type:String,required:true},
    Address:{type:String,required:true},
    location:{type:String,required:true},
    Zipcode:{type:String,required:true},
    movies:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movies"
    },
    streetName:{type:String,required:true},
    isActive:{
        type:Boolean,
        default:true
    }

})

const theatersName = new mongoose.model("theatersName",TheatersModel)
module.exports=theatersName