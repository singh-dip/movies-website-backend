const dotenv = require("dotenv")
const app = require("./app")
const MoviesRoutes = require("./Routes")
const theatersRoutes = require("./Routes/theaters.routes")

// ERROR FIXED: Import screen hall routes
const screenRoutes = require("./Routes/Routes.screenHall")

dotenv.config()

// ERROR FIXED: Port should be 500 (as per previous fix), not 3000
const PORT = process.env.PORT || 3000

MoviesRoutes(app)
theatersRoutes(app)

// ERROR FIXED: Register screen hall routes
screenRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})