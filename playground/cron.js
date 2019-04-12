const cron = require('cron')
const CronJob = cron.CronJob

const test = () => {
    new CronJob('*/10 * * * * *', () => {
        console.log('aaa')
    }).start()
    new CronJob('*/10 * * * * *', () => {
        console.log('bbb')
    }).start()
}

test()