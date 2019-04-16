const express = require('express')

const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

const router = new express.Router()

/**
 * Router for all endpoints regarding to Authentication and Authorization
 */

/**
 * Route for logging in a user.
 */
router.post('/login', authController.login)

/**
 * Route for refreshing a token once it's expired.
 */
router.post('/refresh', authController.refresh)

/**
 * Route for logging out a user. Token session will be destroyed.
 */
router.post('/logout', auth, authController.logout)



module.exports = router