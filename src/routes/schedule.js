const express = require('express')
const scheduleController = require('../controllers/scheduleController')

const router = new express.Router()

router.post('/schedules', scheduleController.createSchedule)

router.get('/schedules', scheduleController.readAllSchedules)
router.get('/schedules/:id', scheduleController.readSchedule)

router.patch('/schedules/:id', scheduleController.updateSchedule)

router.delete('/schedules/:id', scheduleController.deleteSchedule)

router.post('/schedules/log/:id', scheduleController.logTime)

module.exports = router