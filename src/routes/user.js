const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

router.post('/users', userController.createUser)

router.get('/users/:id', userController.readUser)

router.patch('/users/:id', userController.updateUser)

router.delete('/users/:id', userController.deleteUser)
//router.post('/users/login', userController.loginUser)

//router.get('/users/me', userController.findUser)

module.exports = router