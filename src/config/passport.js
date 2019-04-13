const passport = require('passport/lib')
const bcrypt = require('bcryptjs')
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const {Strategy: LocalStrategy} = require('passport-local')

const {User} = require('../models')

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    async (username, password, done) => {
        try {
            const user = await User.findOne({email: username})
            if (!user) {
                return done(null, false, {message: 'Incorrect email or password'})
            }

            const isMatched = await bcrypt.compare(password, user.password)
            if (!isMatched) {
                return done(null, false, {message: 'Incorrect email or password'})
            }

            return done(null, user)
        } catch (e) {
            return done(e)
        }
    }
))

passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('JWT'),
        secretOrKey: process.env.JWT_SECRET
    },
    async (payload, done) => {

        try {
            const user = await User.findById({_id: payload._id})

            if (!user) {
                return done(null, false, {message: 'An error has occurred. Please login.'})
            }
            return done(null, user)
        } catch (e) {
            return done(e, false)
        }

    }
))
