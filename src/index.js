const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')

const {userRouter, employeeRouter, scheduleRouter, authRouter} = require('./routes/index')

const app = express()
const port = process.env.PORT


require('./microservices/employeeScheduler')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//app.use(session({secret: 'anything'}))
app.use(passport.initialize())
app.use(passport.session())

require('./config/passport')

app.use(userRouter)
app.use(employeeRouter)
app.use(scheduleRouter)
app.use(authRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})