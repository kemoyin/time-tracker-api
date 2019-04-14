const express = require('express')
const scheduleController = require('../controllers/scheduleController')
const auth = require('../middlewares/auth')

const router = new express.Router()

router.post('/schedules', auth, scheduleController.createSchedule)

router.get('/schedules', auth, scheduleController.readAllSchedules)
router.get('/schedules/:id', auth, scheduleController.readSchedule)

router.patch('/schedules/:id', auth, scheduleController.updateSchedule)

router.delete('/schedules/:id', auth, scheduleController.deleteSchedule)

router.post('/schedules/log/:id', auth, scheduleController.logTime)

module.exports = router