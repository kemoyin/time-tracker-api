const express = require('express')
const authController = require('../controllers/authController')

const router = new express.Router()

router.post('/login', authController.login)

module.exports = router