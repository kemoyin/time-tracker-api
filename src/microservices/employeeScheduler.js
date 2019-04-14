const moment = require('moment')
const CronJob = require('cron').CronJob
const { Employee, Schedule } = require('../models/index')

const midnightScheduler = () => {
    const MS_PER_HOUR = 1000 * 60 * 60
    new CronJob('00 00 00 * * *', async () => {
        try {

            const now = new Date(moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + "Z")
            const yesterday = new Date(new Date(now).setDate(now.getDate() - 1))

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

                const timestamp = new Date()

                if(scheduleNow.startTime.length == 0) {
                    scheduleNow.startTime = scheduleNow.startTime.concat({start: timestamp})
                    scheduleBefore.stopTime = scheduleBefore.stopTime.concat({stop: new Date(timestamp - 1000)})

                    const start = scheduleBefore.startTime[scheduleBefore.startTime.length - 1].start
                    const stop = scheduleBefore.stopTime[scheduleBefore.stopTime.length - 1].stop

                    scheduleBefore.actual += Math.round(((stop - start) / MS_PER_HOUR) * 1e2) / 1e2

                    scheduleNow.save()
                    scheduleBefore.save()
                }
            })

        } catch (e) {
            throw new Error(e)
        }
    }).start()


}

midnightScheduler()
