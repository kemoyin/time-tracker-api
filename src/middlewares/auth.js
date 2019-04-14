const passport = require('passport')

const auth = (req, res, next) => {
    passport.authenticate('auth', {session: true}, (err, user, info) => {
        if(err || !user) {
            return res.status(401).send({
                message: info ? info.message : 'Unauthorized'
            })
        }
        next()
    })(req, res, next)

}


module.exports = auth
