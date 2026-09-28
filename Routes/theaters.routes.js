const {
    createTheater,
    searchTheatersController,
    updateTheater,
    deleteTheater
    // ERROR FIXED: Removed 'serviceUpdate' — does not exist in theaters.controller.js
} = require("../controllers/theaters.controller")
const { validateId, validateTheaterCreate } = require("../middleware/validate_createModel")

const theaters = (app) => {
    app.post('/mba/api/v1/theaters', validateTheaterCreate, createTheater)
    app.get('/mba/api/v1/theaters', searchTheatersController)
    app.put('/mba/api/v1/theaters/:id', validateId, updateTheater)
    app.patch('/mba/api/v1/theaters/:id', validateId, updateTheater)
    // ERROR FIXED: Was using 'serviceUpdate' (undefined) for PATCH
    // Now correctly uses 'updateTheater' for both PUT and PATCH
    app.delete('/mba/api/v1/theaters/:id', validateId, deleteTheater)
}

module.exports = theaters