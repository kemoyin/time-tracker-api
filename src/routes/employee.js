const express = require('express')

const employeeController = require('../controllers/employeeController')
const auth = require('../middlewares/auth')

const router = new express.Router()

/**
 * Router for all endpoints regarding to managing employees.
 */

/**
 * Route for creating a new employee.
 */
router.post('/employees', auth, employeeController.createEmployee)

/**
 * Route for getting a list of all employees.
 */
router.get('/employees', auth, employeeController.readAllEmployees)

/**
 * Route for getting an employee.
 */
router.get('/employees/:id', auth, employeeController.readEmployee)

/**
 * Route for updating an employee. Allowed options are 'employeeNumber', 'name', 'plannedHours', 'actualHours' and 'isActive'.
 */
router.patch('/employees/:id', auth, employeeController.updateEmployee)

/**
 * Route for deleting an employee.
 */
router.delete('/employees/:id', auth, employeeController.deleteEmployee)


module.exports = router