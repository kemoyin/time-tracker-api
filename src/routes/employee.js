const express = require('express')
const employeeController = require('../controllers/employeeController')

const router = new express.Router()

router.post('/employees/create', employeeController.createEmployee)

router.get('/employees', employeeController.readAllEmployees)
router.get('/employees/:id', employeeController.readEmployee)

router.patch('/employees/:id', employeeController.updateEmployee)

router.delete('/employees/:id', employeeController.deleteEmployee)


module.exports = router