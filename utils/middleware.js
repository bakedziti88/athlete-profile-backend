const SPORTS = require('./sports')

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'Unknown Endpoint'})
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        response.status(403).json({
            error: 'Incorrect fields or missing fields. Check logs for fields sent through request',
            required: ['name','DOB','gender'],
            enumTypes: {
                gender: ['Male', 'Female', 'Other'],
                sports: SPORTS
            }
        })
    }
    next(error)
}

module.exports = { unknownEndpoint, errorHandler }