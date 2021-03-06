const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const config = require('./utils/config')
const middleware = require('./utils/middleware')

const athleteRouter = require('./controllers/athleteRouter')
const sportsRouter = require('./controllers/sportsRouter')

const app = express()
app.use(express.static('app'))

const connect = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connection to MongoDB: athlete-form successful')
    } catch (e) {
        console.error('Failed to connect with error: ', e.message)
    }
}

connect()


app.use(cors())
app.use(express.json())

app.use('/api/athletes', athleteRouter)
app.use('/api/sports', sportsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app