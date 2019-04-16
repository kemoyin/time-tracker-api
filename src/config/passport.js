const passport = require('passport')
const bcrypt = require('bcryptjs')
const {Strategy: JWTStrategy, ExtractJwt} = require('passport-jwt')
const {Strategy: LocalStrategy} = require('passport-local')

const {User, Session} = require('../models/index')

/**
 * Strategy for logging in with E-Mail an Password.
 */
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

/**
 * Strategy for verifying the Json Web Token by using the Auth Middleware
 */
passport.use('auth', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
        passReqToCallback: true,
        session: false
    },
    async (req, payload, done) => {
        try {
            const session = await Session.findById({_id: payload._sessionId})
            if (!session) {
                return done(null, false, {message: 'An error has occurred. Please login.'})
            }
            return done(null, session)
        } catch (e) {
            return done(e)
        }

    }
))

/**
 * Strategy for refreshing an expired Json Web Token. Session version in payload and
 * version in database has to be identical.
 */
passport.use('refresh', new JWTStrategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: true,
        secretOrKey: process.env.JWT_SECRET,
        passReqToCallback: true,
        session: false
    },
    async (req, payload, done) => {
        try {
            const session = await Session.findById({_id: payload._sessionId})
            if (!session || payload.version !== session.version) {
                return done(null, false, {message: 'An error has occurred. Please login.'})
            }
            return done(null, session)
        } catch (e) {
            return done(e)
        }

    }
))
