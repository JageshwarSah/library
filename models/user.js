const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		unique: [true, 'username is not available, try another'],
		minLength: [4, 'username must have more than 4 chars'],
		maxLength: [24, 'username must have less than 24 chars'],
		required: true
	},
	password: {
		type: String,
		required: true,
		minLength: [8, 'password must have more than 8 chars'],
		maxLength: [128, 'username must have less than 128 chars']
	},
	role: {
		type: String,
		enum: ['admin', 'user'],
		default :  'user'
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: [true, 'Email already registered']
	},
	profileImage: String,
	createdAt: {
		type: Date,
		default: Date.now()
	},
	active: {
		type: Boolean,
		default: true
	},
	passwordModifiedAt: {
		type: Date
	},
})

//userSchema.index({email: 1}, {unique: true})
//userSchema.index({username: 1}, {unique: true})

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

module.exports = mongoose.model('User', userSchema)
