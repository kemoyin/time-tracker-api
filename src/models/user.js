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
    foreignField: 'employerId'
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

// userSchema.statics.verifyCredentials = async (email, password) => {
//     const user = await User.findOne({email})
//
//     if(!user) {
//         throw new Error('An error occured')
//     }
//     const isMatched = await bcrypt.compare(password, user.password)
//
//     if(!isMatched) {
//         throw new Error('An error occured')
//     }
//
//     return user
// }

userSchema.methods.generateJWT = async function () {
    const user = this
    const token = await jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '12h'})
    return token
}

userSchema.index({"email": 1}, {"unique": true})

const User = authDB.model('User', userSchema)

module.exports = User