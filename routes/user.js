const router =  require('express').Router()

const userController = require('../controllers/user')
const authController = require('../controllers/auth')

router.post('/login', authController.login)

router.route('/').get(authController.protect, authController.restrictTo('admin'), userController.getAllUsers).post(userController.createUser).patch(userController.updateUser)
router.route('/:id').get(userController.getUser).delete(userController.deleteUser)

module.exports = router
