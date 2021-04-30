const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const apiError = require('../helpers/apiError')
const { catchAsync } = require('../helpers/catchAsync')

//createToken
const createToken = (payload) => {
  jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

// Register new user
exports.register = catchAsync(async (req, res, next) => {
  const { username, password } = { ...req.body }
  // Check if login info is provided
  if (!username || !password) {
    return next(new apiError('Please provide username and password', 400))
  }

  const newUser = await User.create(req.body)

  res.status(201).json({
    status: 'ok',
    token: createToken,
    data: {
      user: newUser,
    },
  })
})

// Authentication
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = { ...req.body }
  // Check if login info is provided
  if (!username || !password) {
    return next(new apiError('Please provide username and password', 400))
  }

  // Find user associated with the provided information
  const user = await User.findOne({ username }).select('+password')

  // Check if user exist  and valid password is provided
  if (!user || !(await user.validPassword(password, user.password))) {
    return next(new apiError('Please provide valid username and password', 400))
  }

  // // Send access token
  // const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
  //   expiresIn: process.env.JWT_EXPIRES_IN,
  // })

  res.status(200).json({
    status: 'ok',
    token: createToken(user.id),
    data: {
      user,
    },
  })
})

// Authorization
exports.protect = catchAsync(async (req, res, next) => {
  // Steps :
  // 1 - Check for access token
  // 2 - Verify access token
  // 3 - Find user associated with the token
  // 4 - Check if user has changed their password after issuing token
  // 5 - Attach user to request object
  // 6 - Grant Access

  let token
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new Error('You are not logged in, please login', 401))
  }
  token = req.headers.authorization.split(' ')[1]
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_PRIVATE_KEY
  )

  const currentUser = await User.findById(decoded.id)

  req.user = currentUser
  next()
})

// Restricted Authorization
exports.restrictTo = (...roles) => (req, res, next) => {
  roles = [...roles]
  if (!roles.includes(req.user.role)) {
    return next(new Error('You are not authorized', 403))
  }

  next()
}
