const mongoose = require('mongoose')

const db = process.env.MONGODB_AUTH

const authDB = mongoose.createConnection(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

module.exports = authDB