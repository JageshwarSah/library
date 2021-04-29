const express = require('express')

const userRoute = require('./routes/user')

const app = express()

// MIDDLEWARES
app.use(express.json())

// Routes
app.use('/api/v1/users', userRoute)

module.exports = app
