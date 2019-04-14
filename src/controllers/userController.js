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

const readProfile = async (req, res) => {
    res.send(req.user)
}

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password']
    const isAllowed = updates.every(update => allowed.includes(update))

    if(!isAllowed) {
        res.status(400).send()
    }

    try {
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = req.user
        await user.remove()
        res.send({user})
    } catch (e) {
        res.status(500).send()
    }
}

module.exports =  {
    createUser,
    readProfile,
    updateUser,
    deleteUser,

}