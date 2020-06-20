const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')

const config = require('./utils/config')

const app = express()

const connect = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
        console.log('Connection to MongoDB: athlete-form successful')
    } catch (e) {
        console.error('Failed to connect with error: ', e.message)
    }
}

connect()

app.use(express.json())
app.use(morgan('tiny'))

module.exports = app