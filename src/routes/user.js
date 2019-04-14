const express = require('express')
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/users', userController.createUser)

router.get('/users/me', auth, userController.readProfile)

router.patch('/users/me', auth, userController.updateUser)

router.delete('/users/me', auth, userController.deleteUser)

module.exports = router