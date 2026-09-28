const { screenCreates, multiScreens, getSCreen, update_Data } = require('../controllers/model.screenHall')
const { validateScreenCreate, validateScreenUpdate, validateObjectId } = require("../middleware/validate.screen")

const screens = (app) => {
    app.post('/mba/api/v1/screens', validateScreenCreate, screenCreates)
    app.get('/mba/api/v1/theaterId/:theaterId/screens', multiScreens)
    app.get('/mba/api/v1/screens/:id', validateObjectId(), getSCreen)
    app.patch('/mba/api/v1/screens/:id', validateObjectId(), validateScreenUpdate, update_Data)
}
module.exports = screens