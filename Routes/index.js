const { MoviesCreate, MoviesDelete, MoviesGet, update } = require("../controllers/movies_model")
// const validation=require("../middleware/validate_createModel")
const MoviesRoutes= (app)=>{
    app.post('/mba/api/v1/movies',MoviesCreate)
    app.delete('/mba/api/v1/movies/:id', MoviesDelete)
    app.get('/mba/api/v1/movies/:id', MoviesGet),
    app.put('/mba/api/v1/movies/:id',update),
    app.patch('/mba/api/v1/movies/:id',update)


}
module.exports=MoviesRoutes