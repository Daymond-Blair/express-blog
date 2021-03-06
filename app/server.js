
// **********BASIC NODE.JS SERVER**********

// Require the library/framework Express and store it in variable
const express = require('express')
// Run express variable and store it in app variable
const app = express()

const DB = require('../database/connection.js')

// Use body-parser that i just installed
const bodyParser = require('body-parser')

// Run server on port 3000
const port = 3000

const routes = require("./routes.js")

// Using Body Parser for POST request data
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use("/", routes)

// Static Files Folder
app.use(express.static('public'))

// Template Engine
app.set('view engine', 'pug')

// Start Local Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})