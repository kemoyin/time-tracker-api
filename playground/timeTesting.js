const moment = require('moment')
const testtime = () => {
    const test = new Date('2019-04-08T21:34:03.000Z')
    let date = moment(new Date()).format("YYYY-MM-DDT00:00:00.000") + "Z"
    const wasd = new Date(date)
    const bla = new Date( wasd.setDate( wasd.getDate() - 1) )
    console.log(new Date().toLocaleString("en-US", {timeZone: "Europe/Berlin"}))
}

testtime()