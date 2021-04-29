const express = require('express')
const globalErrorHandler = require('./middlewares/errorHandler')

const userRoute = require('./routes/user')
//const authRoute = require('./routes/auth')

const app = express()

// MIDDLEWARES
app.use(express.json())

// Routes
app.use('/api/v1/users', userRoute)

//! Gloabal Error Middleware
app.use(globalErrorHandler)
module.exports = app
