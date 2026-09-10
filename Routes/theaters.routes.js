const { 
    createTheater, 
    searchTheatersController, 
    updateTheater, 
    deleteTheater 
} = require("../controllers/theaters.controller")

const theaters = (app) => {
    app.post('/mba/api/v1/theaters', createTheater)
    app.get('/mba/api/v1/theaters', searchTheatersController)
    app.put('/mba/api/v1/theaters/:id', updateTheater)
    app.patch('/mba/api/v1/theaters/:id', updateTheater)
    app.delete('/mba/api/v1/theaters/:id', deleteTheater)
}

module.exports = theaters