const screenHall=require('../models/screen-model')

const screenCreate=async(screenData)=>{
    const result=await screenHall.create(screenData)
    if(!result){
        throw new Error('screen invalid')
        }
        return screenCreate




}
