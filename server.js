const dotenv = require("dotenv")
const app = require("./app")
const MoviesRoutes = require("./Routes")
const theatersRoutes = require("./Routes/theaters.routes")

dotenv.config()

const PORT = process.env.PORT || 500

MoviesRoutes(app)
theatersRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
