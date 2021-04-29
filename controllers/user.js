const User = require('../models/user')

exports.getAllUsers = async (req, res, next) => {
	const users = await User.find({})

	res.status(200).json({
		status: 'ok',
		results: users.length,
		data: {
			users
		}
	})
}

exports.getUser = async (req, res, next) => {
	const user = await User.findById(req.params.id)

	res.status(200).json({
		status: 'ok',
		data: {
			user
		}
	})
}

exports.createUser = async (req, res, next) => {
	const user = await User.create(req.body)

	res.status(200).json({
		status: 'ok',
		data: {
			user
		}
	})
}

exports.updateUser = async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.body.params, req.body, {new: true})

	res.status(200).json({
		status: 'ok',
		data: {
			user
		}
	})
}

exports.deleteUser = async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id)

	res.status(200).json({
		status: 'ok',
		data: null
	})
}

