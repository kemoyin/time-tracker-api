const userRouter = require('./user')
const employeeRouter = require('./employee')
const scheduleRouter = require('./schedule')
const authRouter = require('./auth')

module.exports = {
    userRouter,
    employeeRouter,
    scheduleRouter,
    authRouter
}