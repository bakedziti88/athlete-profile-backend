const sportsRouter = require('express').Router()
const SPORTS = require('../utils/sports')

sportsRouter.get('/', (request, response, next) => {
    response.status(200).send(SPORTS)
})

module.exports = sportsRouter