const dotenv = require('dotenv')
const app = require('./app.js')
const mongoose = require('mongoose')

dotenv.config()

//! Handle Uncaught Exceptions
process.on('uncaughtException', err => {
	console.log(err.name, err.message)
	process.exit(1)
})

// Host
const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

// Database connection
const databaseUrl = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(databaseUrl, {useCreateIndex: true, useUnifiedTopology:true, useNewUrlParser: true})
	.then(() => {
		console.log('Databse connection: OK')
	})

const server = app.listen(port, host, () => {
	console.log(`App is running on port ${port}`)
})

process.on('unhandledRejection', err => {
	console.log(err)
	process.exit(1)
})
