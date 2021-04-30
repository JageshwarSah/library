const fs = require('fs')
const { promisify } = require('util')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/user')


mongoose.connect(process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD), {
	useCreateIndex :true,
	useUnifiedTopology: true,
	useNewUrlParser: true
}).then(() => console.log('DB: OK'))

async function readData () {
	try {
		const users = await promisify(fs.readFile)('./data/users.json', 'utf-8')
		await User.deleteMany({})
		JSON.parse(users).map(async el => await User.create(el))
		console.log('DB Synchronized')
	} catch(err) { console.log(err) }
}

readData()
