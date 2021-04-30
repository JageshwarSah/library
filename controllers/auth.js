const jwt = require('jsonwebtoken')
const User = require('../models/user')
const apiError = require('../helpers/apiError')
const { catchAsync } = require('../helpers/catchAsync')

exports.login =  catchAsync (async (req, res, next) => {
	const { username, password } = { ...req.body }
	// Check if login info is provided
	if(!username || !password) {
		return next(new apiError('Please provide username and password', 400))
	}

	// Find user associated with the provided information
	const user =  await User.findOne({username}).select('+password')

	// Check if user exist  and valid password is provided
	if(!user || !(await user.validPassword(password, user.password))) {
		return next(new apiError('Please provide valid username and password', 400))
	}

	// Send access token
	const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
		expiresIn: process.env.JWT_EXPIRES_IN
	})

	res.status(200).json({
		status: 'ok',
		token,
		data: {
			user
		}
	})
})
