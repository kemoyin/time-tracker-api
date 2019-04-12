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

const readUser = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user) {
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['name', 'email', 'password']
    const isAllowed = updates.every(update => allowed.includes(update))

    if(!isAllowed) {
        res.status(400).send()
    }

    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user) {
            res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}

const deleteUser = async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if(!user) {
            res.status(404).send()
        }
        res.send(user)
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

const logoutUser = async (req, res) => {

}

module.exports =  {
    createUser,
    readUser,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
}