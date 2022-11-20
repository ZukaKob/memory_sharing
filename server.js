// LIBRARIES
const express = require('express')
const mongoose = require('mongoose')
const cors  = require('cors')
// const { Refresh_Limit } = require('./utils/api_refresh_limiter')

// INITIALIZATIONS
require('dotenv').config()
const app = express() 

// MIDDLEWARES
// app.use(Refresh_Limit)
app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// ROUTES
app.use('/api/v1/auth', require('./routes/auth_routes'))
app.use('/api/v1/user', require('./routes/user_routes'))

// SERVER AND DATABASE
mongoose 
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started on port: ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })
