const express = require('express')

const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

const router = new express.Router()

/**
 * Router for all Endpoints regarding to managing the user.
 */

/**
 * Route for creating a new user.
 */
router.post('/users', userController.createUser)

/**
 * Route for getting the user profile.
 */
router.get('/users/me', auth, userController.readProfile)

/**
 * Route for updating an user. Allowed options are 'name', 'email' and 'password'.
 */
router.patch('/users/me', auth, userController.updateUser)

/**
 * Route for deleting an user.
 */
router.delete('/users/me', auth, userController.deleteUser)

module.exports = router