const express = require('express')

const scheduleController = require('../controllers/scheduleController')
const auth = require('../middlewares/auth')

const router = new express.Router()

/**
 * Router for all endpoints regarding to managing the schedules.
 */

/**
 * Route for creating a new schedule.
 */
router.post('/schedules', auth, scheduleController.createSchedule)

/**
 * Route for getting a list of all schedules by EmployeeId
 */
router.get('/schedules/:id', auth, scheduleController.readAllSchedules)

/**
 * Route for getting a schedule.
 */
router.get('/schedules/:id', auth, scheduleController.readSchedule)

/**
 * Route for updating a schedule. Allowed options are 'planned', 'actual' and 'isHoliday'.
 */
router.patch('/schedules/:id', auth, scheduleController.updateSchedule)

/**
 * Route for deleting a schedule.
 */
router.delete('/schedules/:id', auth, scheduleController.deleteSchedule)

/**
 * Route for start and stop the time tracker by EmployeeId
 */
router.post('/schedules/tracking/:id', auth, scheduleController.trackTime)

router.post('/schedules/holidays/:id', auth, scheduleController.setHolidays)

module.exports = router