const crypto = require('crypto');

crypto.randomBytes(256, function(ex, buf) {
    if (ex)
        throw ex
    console.log(buf.toString('base64'))
})