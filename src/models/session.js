const mongoose = require('mongoose')
const { authDB } = require('../db/index')

const sessionSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    version: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, {
    timestamps: true,
    versionKey: false
})

const Session = authDB.model('Session', sessionSchema)

module.exports = Session