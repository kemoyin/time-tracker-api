const moment = require('moment')
const CronJob = require('cron').CronJob
const { Session } = require('../models/index')

const sessionCleaner = () => {
    new CronJob('00 00 00 * * *', async () => {
        try {


        } catch (e) {
            throw new Error(e)
        }
    }).start()


}
