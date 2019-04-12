const moment = require('moment')
const CronJob = require('cron').CronJob
const { Employee, Schedule } = require('../models/index')

const midnightScheduler = () => {

    new CronJob('00 00 00 * * *', async () => {
        try {
            const now = new Date(moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + "Z")
            const yesterday = new Date(now.setDate(now.getDate() - 1))
            const before = new Date(now - 1000)

            const employees = await Employee.find({isActive: true})

            employees.forEach(async employee => {
                let scheduleNow = await Schedule.findOne({employee: employee._id, date: now})
                let scheduleBefore = await Schedule.findOne({employee: employee._id, date: yesterday})

                if(!scheduleNow) {
                    scheduleNow = await new Schedule({
                        employee: employee._id,
                        date: now
                    }).save()
                }

                if(scheduleNow.startTime.length == 0) {
                    scheduleNow.startTime = scheduleNow.startTime.concat({start: now})
                    scheduleBefore.stopTime = scheduleBefore.stopTime.concat({stop: before})
                    scheduleNow.save()
                    scheduleBefore.save()
                }
            })

        } catch (e) {
            throw new Error(e)
        }
    })

}

midnightScheduler()