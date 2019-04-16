const mongoose = require('mongoose')
const validator = require('validator')
const moment = require('moment')
const { trackerDB } = require('../db/index')



const scheduleSchema = new mongoose.Schema({
    _employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    date: {
        type: Date,
        required: true,
        validate(value) {
            if (!validator.isISO8601(value.toISOString())) {
                throw new Error('Date is invalid!')
            }
        }
    },
    planned: {
        type: Number,
        default: 0,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Hours must be positive!')
            }
        }
    },
    actual: {
        type: Number,
        default: 0,
        required: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Hours must be positive!')
            }
        }
    },
    startTime: [{
        start: {
            type: Date,
            validate(value) {
                if (!validator.isISO8601(value.toISOString())) {
                    throw new Error('Date is invalid!')
                }
            }
        }
    }],
    stopTime: [{
        stop: {
            type: Date,
            validate(value) {
                if (!validator.isISO8601(value.toISOString())) {
                    throw new Error('Date is invalid!')
                }
            }
        }
    }],
    isHoliday: {
        type: Boolean,
        default: false
    }
})

scheduleSchema.methods.toJSON = function() {
    const schedule = this
    const scheduleObject = schedule.toObject()

    //delete scheduleObject._id
    delete scheduleObject.employee

    return scheduleObject
}

scheduleSchema.pre('save', async function (next) {
    const schedule = this

    if (schedule.isModified('date')) {
        schedule.date = moment(schedule.date).format("YYYY-MM-DDT00:00:00.000") + "Z"
    }
    next()
})

scheduleSchema.methods.logTracking = async function (isActive) {
    const MS_PER_HOUR = 1000 * 60 * 60
    const schedule = this
    const timestamp = new Date()

    if(isActive) {
        schedule.stopTime = schedule.stopTime.concat({stop: timestamp})

        const start = schedule.startTime[schedule.startTime.length - 1].start
        const stop = schedule.stopTime[schedule.stopTime.length - 1].stop


        schedule.actual += Math.round(((stop - start) / MS_PER_HOUR) * 1e2) / 1e2
    } else {
        schedule.startTime = schedule.startTime.concat({start: timestamp})
    }

    return schedule
}



scheduleSchema.index({"employee": 1, "date": 1}, {"unique": true})

const Schedule = trackerDB.model('Schedule', scheduleSchema)

module.exports = Schedule