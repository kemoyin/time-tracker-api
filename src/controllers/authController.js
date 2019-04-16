const passport = require('passport')
const jwt = require('jsonwebtoken')
const { Session } = require('../models/index')

/**
 * Controller method for logging in a user.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    passport.authenticate('login',
        (err, user, info) => {
            if (err || !user) {
                return res.status(400).send({
                    message: info ? info.message : 'Login failed.'
                })
            }

            req.login(user, {session: false}, async (err) => {
                if (err) {
                    return res.status(400).send(err)
                }

                const session = new Session({version: 1, _userId: user._id.toString()})

                try {
                    await session.save()
                } catch (e) {
                    throw new Error('An Error Occurred.')
                }

                const token = jwt.sign({
                    _sessionId: session._id.toString(),
                    version: session.version
                }, process.env.JWT_SECRET, {expiresIn: '12h'})

                return res.send({token})

            })
        })(req, res)
}

/**
 * Controller method for refreshing an expired Json Web Token.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const refresh = async (req, res) => {
    passport.authenticate('refresh',
        async (err, session, info) => {
            if (err || !session) {
                return res.status(400).send({
                    message: info ? info.message : 'Unauthorized. Please login.'
                })
            }
            session.version += 1
            try {
                await session.save()

            } catch (e) {
                throw new Error('An Error Occurred.')
            }

            const token = jwt.sign({
                _sessionId: session._id.toString(),
                version: session.version
            }, process.env.JWT_SECRET, {expiresIn: '12h'})

            return res.send({token})
        })(req, res)
}

/**
 * Controller method for logging out a user. Actual Session of the Token will be deleted.
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const logout = async (req, res) => {
    await req.session.delete()
    res.send('Logout successful.')
}

module.exports = {
    login,
    refresh,
    logout
}
