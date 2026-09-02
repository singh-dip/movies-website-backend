const Movies = require("../controllers/movies_model")

const MoviesRoutes= (app)=>{
    app.post('/mb/api/v1/movies', Movies)
}
module.exports=MoviesRoutes
