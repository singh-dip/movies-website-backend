const {showTimeCreate}=require("../controllers/showtime.controller")

const showTime=(app)=>{
    app.post('/mba/api/v1/showTime', showTimeCreate)
}
module.exports={
    showTime
}