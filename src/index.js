const express = require('express')
const passport = require('passport')
const cors = require('cors')

const {userRouter, employeeRouter, scheduleRouter, authRouter} = require('./routes/index')

const app = express()
const port = process.env.PORT


require('./microservices/nightScheduler')

app.use(express.json())
app.use(cors())

app.use(passport.initialize())
require('./config/passport')

app.use(userRouter)
app.use(employeeRouter)
app.use(scheduleRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})