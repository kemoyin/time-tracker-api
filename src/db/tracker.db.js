const mongoose = require('mongoose')

const db = process.env.MONGODB_DATA

const trackerDB = mongoose.createConnection(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})

module.exports = trackerDB