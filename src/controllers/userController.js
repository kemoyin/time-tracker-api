const { User } = require('../models/index')

const createUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({user})

    } catch (e) {
        res.status(500).send()
    }
}

const loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findByCredentials(email, password)

        res.send({user})

    } catch (e) {
        res.status(400).send()
    }
}

module.exports =  {
    createUser,
    loginUser
}