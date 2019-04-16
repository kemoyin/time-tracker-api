const mongoose = require('mongoose')
const { trackerDB } = require('../db/index')

const employeeSchema = new mongoose.Schema({
    _employerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    employeeNumber: {
        type: Number,
        min: 0,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    plannedHours: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    actualHours: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: false
    },
})

employeeSchema.virtual('schedules', {
    ref: 'Schedule',
    localField: '_id',
    foreignField: '_employeeId'
})

// employeeSchema.methods.toJSON = function() {
//     const employee = this
//     const employeeObject = employee.toObject()
//
//     delete employeeObject._id
//     delete employeeObject.employerId
//
//     return employeeObject
// }

employeeSchema.index({"_employerId": 1, "employeeNumber": 1}, {"unique": true})

const Employee = trackerDB.model('Employee', employeeSchema)

module.exports = Employee