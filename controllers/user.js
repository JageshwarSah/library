const User = require('../models/user')
const database =  require('../services/database')
const { catchAsync } = require('../helpers/catchAsync')

exports.getAllUsers =  database.getAll(User)
exports.getUser = database.getOne(User)
exports.createUser = database.createOne(User)
exports.updateUser = database.updateOne(User)
exports.deleteUser = database.deleteOne(User)
