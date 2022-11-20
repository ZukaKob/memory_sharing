const express_limiter = require('express-rate-limit')

const Refresh_Limit = express_limiter({
    windowsMs: 15 * 60 * 1000,
    max: 5,
    message: `${process.env.API_MESSAGE}`
})

module.exports = {Refresh_Limit}