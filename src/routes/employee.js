const express = require('express')
const employeeController = require('../controllers/employeeController')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/employees', auth, employeeController.createEmployee)
router.get('/employees', auth, employeeController.readAllEmployees)
router.get('/employees/:id', auth, employeeController.readEmployee)
router.patch('/employees/:id', auth, employeeController.updateEmployee)
router.delete('/employees/:id', auth, employeeController.deleteEmployee)


module.exports = router