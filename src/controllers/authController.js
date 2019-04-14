const passport = require('passport')
const { User } = require('../models/index')

const login = (req, res) => {
    passport.authenticate('login',
        (err, user, info) => {
        if(err || !user) {
            return res.status(400).send({
                message: info ? info.message : 'Login failed'
            })
        }

        req.login(user, {session: false}, async  (err) => {
            if(err) {
                res.status(400).send(err)
            }

            const token = await user.generateJWT()

            return res.send({user, token})

        })
    })(req, res)
}

const logoutUser = async (req, res) => {

}
module.exports = {
    login
}
