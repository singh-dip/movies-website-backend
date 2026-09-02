const dotenv = require("dotenv")
const app = require("./app")
const MoviesRoutes = require("./Routes")

dotenv.config()

const PORT = process.env.PORT || 3000

MoviesRoutes(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
