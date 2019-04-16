const express = require('express')
const authController = require('../controllers/authController')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/login', authController.login)
router.post('/refresh', authController.refresh)

router.post('/logout', auth, authController.logout)



module.exports = router