const moment = require('moment')
const {Employee, Schedule} = require('../models/index')

const createSchedule = async (req, res) => {
    const schedule = new Schedule(req.body)
    try {
        await schedule.save()
        res.status(201).send(schedule)
    } catch (e) {
        res.status(500).send()
    }
}

const readAllSchedules = async (req, res) => {
    const _id = req.params.id
    try {
        const schedules = await Schedule.find({_employeeId: _id})
        if (!schedules) {
            return res.status(404).send()
        }
        res.send(schedules)
    } catch (e) {
        res.status(500).send()
    }
}

const readSchedule = async (req, res) => {
    const _id = req.params.id
    try {
        const schedule = await Schedule.findById(_id)
        if (!schedule) {
            return res.status(404).send()
        }
        res.send(schedule)
    } catch (e) {
        res.status(500).send()
    }
}

const updateSchedule = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['planned', 'actual', 'isHoliday']
    const isAllowed = updates.every((update) => allowed.includes(update))

    if (!isAllowed) {
        return res.status(400).send()
    }

    const _id = req.params.id
    try {
        const schedule = await Schedule.findByIdAndUpdate(_id, req.body, {new: true, runValidator: true})
        if (!schedule) {
            return res.status(404).send()
        }
        res.send(schedule)
    } catch (e) {
        res.status(500).send()
    }
}

const deleteSchedule = async (req, res) => {
    const _id = req.params.id
    try {
        const schedule = await Schedule.findByIdAndDelete(_id)
        if (!schedule) {
            return res.status(404).send()
        }
        res.status(204).send(schedule)
    } catch (e) {
        res.status(500).send()
    }
}

const trackTime = async (req, res) => {
    const _id = req.params.id
    try {
        const date = moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + "Z"

        const schedule = await Schedule.findOne({employee: _id, date})
        await schedule.populate('employee').execPopulate()

        const updated = await schedule.logTracking(schedule.employee.isActive)

        //CHECK - Vielleicht kann man das anders lösen?
        await Employee.findByIdAndUpdate(_id, {isActive: !schedule.employee.isActive})
        await updated.save()
        res.send(updated)
    } catch (e) {
        res.status(400).send(e)
    }
}

const setHolidays = async (req, res) => {

}

module.exports = {
    createSchedule,
    readAllSchedules,
    readSchedule,
    updateSchedule,
    deleteSchedule,
    trackTime
}