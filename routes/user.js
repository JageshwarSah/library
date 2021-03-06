const router =  require('express').Router()

const userController = require('../controllers/user')

router.route('/').get(userController.getAllUsers).post(userController.createUser).patch(userController.updateUser)
router.route('/:id').get(userController.getUser).delete(userController.deleteUser)

module.exports = router
