const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const {authDB} = require('../db')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
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

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error('An error occured')
    }
    const isMatched = await bcrypt.compare(password, user.password)

    if(!isMatched) {
        throw new Error('An error occured')
    }

    return user
}

userSchema.virtual('employee', {
    ref: 'Employee',
    localField: '_id',
    foreignField: 'employerId'
})

const User = authDB.model('User', userSchema)

module.exports = User