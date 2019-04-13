const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const Cors = require('cors')
const app = express()

const port = process.env.PORT

require('./microservices/employeeScheduler')
const {userRouter, employeeRouter, scheduleRouter, authRouter} = require('./routes/index')





require('./config/passport')


//app.use(Cors())
//app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())
app.use(userRouter)
app.use(employeeRouter)
app.use(scheduleRouter)
app.use(authRouter)

app.use(passport.initialize())

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})