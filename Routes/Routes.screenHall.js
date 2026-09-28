const { screenCreates, multiScreens,getSCreen,update_Data} = require('../controllers/model.screenHall')

// ERROR FIXED: Import validation middleware from correct path
// OLD: const {screenCreationValidate}= require("../Routes/Routes.screenHall") ← circular self-import
const { screenCreationValidate } = require("../middleware/validate.screen")

const screens = (app) => {
    app.post('/mba/api/v1/screens', screenCreationValidate, screenCreates)
    app.get('/mba/api/v1/theaterId/:theaterId/screens',multiScreens)
    app.get('/mba/api/v1/screens/:id',getSCreen)
    app.put('/mba/api/v1/screens/:id', screenCreationValidate, update_Data)
}
module.exports = screens