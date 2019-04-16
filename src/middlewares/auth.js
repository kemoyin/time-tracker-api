const passport = require('passport')
const { User } = require('../models/index')

const auth = (req, res, next) => {
    passport.authenticate('auth', {session: false}, async (err, session, info) => {
        if (err || !session) {
            return res.status(401).send({
                message: info ? info.message : 'Unauthorized. Please login.'
            })
        }
        try {
            const user = await User.findById({_id: session._userId})
            req.user = user
        } catch (e) {
            return res.status(401).send({
                message: info ? info.message : 'Unauthorized. Please login.'
            })
        }

        next()
    })(req, res, next)

}


module.exports = auth
