const express = require("express")
const app = express()
const cors = require('cors')
const mainRouter = require("./router/main")
require("dotenv").config()

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_KEY)
    .then(() => {
        console.log("DB CONNECTION SUCCESS")
    }).catch(e => {
    console.log(e)
})

app.use(cors())
app.use(express.json())

app.use("/", mainRouter)

app.listen(3600)
