const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		minLength: [4, 'username must have more than 4 chars'],
		maxLength: [24, 'username must have less than 24 chars']
	},
	password: {
		type: String,
		minLength: [8, 'password must have more than 8 chars'],
		maxLength: [128, 'username must have less than 128 chars']
	},
	role: {
		type: String,	
		enum: ['admin', 'user'],
		default :  'user'
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	profileImage: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	active: {
		type: Boolean,
		default: false
	},
	passwordModifiedAt: {
		type: Date
	},
})

module.exports = mongoose.model('User', userSchema)
