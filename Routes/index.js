const { MoviesCreate, MoviesDelete, MoviesGet } = require("../controllers/movies_model")

const MoviesRoutes= (app)=>{
    app.post('/mba/api/v1/movies', MoviesCreate)
    app.delete('/mba/api/v1/movies/:id', MoviesDelete)
    app.get('/mba/api/v1/movies/:id', MoviesGet)
}
module.exports=MoviesRoutes
