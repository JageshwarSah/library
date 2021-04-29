const app = require('./app.js')

// Host
const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

process.on('uncaughtException', err => {
	console.log(err.name, err.message)
	process.exit(1)
})

const server = app.listen(port, host, () => {
	console.log(`App is running on port ${port}`)
})
