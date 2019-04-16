const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const { authDB } = require('../db/index')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8,
        validate(value) {
            // Hier muss ein RegEx validieren
        }
    },
    emailValidated: {
        type: Boolean,
        required: true,
        default: false
    },
    hash: {
        type: String
    }
}, {
    timestamps: true
})

userSchema.virtual('employee', {
    ref: 'Employee',
    localField: '_id',
    foreignField: '_employerId'
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})

userSchema.index({"email": 1}, {"unique": true})

const User = authDB.model('User', userSchema)

module.exports = User