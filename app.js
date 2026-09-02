const express = require("express")

const mongoose = require("mongoose")
const dotenv = require("dotenv")



const app = express()
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.DATABASE_URL)
.then(()=>console.log("MongoDB connected successfully"))
.catch((err)=>console.error("MongoDB connection error:", err))

module.exports = app
