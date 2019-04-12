const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

router.post('/users/register', userController.createUser)
//router.post('/users/login', userController.loginUser)

//router.get('/users/me', userController.findUser)

module.exports = router