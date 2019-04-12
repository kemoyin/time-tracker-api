const express = require('express')
const app = express()

require('./microservices/employeeScheduler')
const {userRouter, employeeRouter, scheduleRouter} = require('./routes/index')


const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(employeeRouter)
app.use(scheduleRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})