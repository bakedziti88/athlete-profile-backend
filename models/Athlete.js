const mongoose = require('mongoose')
const SPORTS = require('../utils/sports')

/* 
 * In the interest of time, I'm going to make this schema very simple
 * It's just going to contain all the information about an athlete
 * I might consider splitting up the data into different collections/documents if I had more time
 */

const athleteSchema = new mongoose.Schema({

    //Basic information about athlete
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },

    //Sport information about athlete
    association: {
        type: String,
    },
    team: {
        type: String
    },
    sports: [{
        type: String,
        enum: SPORTS
    }],


    //Other optional background info on athlete
    location: {
        type: String
    },
    about: {
        type: String
    },
    interests: {
        type: String
    },
    charities: {
        type: String
    },
    social_medias: {
        type: Map,
        of: String
    },
})

athleteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = new mongoose.model('Athlete', athleteSchema)