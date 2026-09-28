const { MoviesCreate, MoviesDelete, MoviesGet, update, searchField } = require("../controllers/movies_model")
const { validateId, validateMovieCreate, validateMovieUpdate } = require("../middleware/validate_createModel")

const MoviesRoutes = (app) => {
    app.post('/mba/api/v1/movies', validateMovieCreate, MoviesCreate)
    app.delete('/mba/api/v1/movies/:id', validateId, MoviesDelete)
    app.get('/mba/api/v1/movies/:id', validateId, MoviesGet)
    app.put('/mba/api/v1/movies/:id', validateId, validateMovieUpdate, update)

    app.get('/mba/api/v1/movies/multi', searchField)
}
module.exports = MoviesRoutes
