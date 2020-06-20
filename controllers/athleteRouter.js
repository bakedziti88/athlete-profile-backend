const athleteRouter = require('express').Router()
const Athlete = require('../models/Athlete')

athleteRouter.get('/', async (request, response, next) => {
    try {
        const athletes = await Athlete.find({})
        response.status(200).send(athletes.map(athlete => athlete.toJSON()))
    } catch (e) {
        next(e)
    }
})

//Probably won't ever need this for the frontend at this level.. but just in case
athleteRouter.get('/:id', async (request, response, next) => {
    try {
        const athlete = await Athlete.findById(request.params.id)
        response.status(200).json(athlete.toJSON())
    } catch (e) {
        response.status(404).send({error: 'Cannot find athlete in database'})
    }
})

athleteRouter.post('/', async (request, response, next) => {
    const body = request.body
    const athlete = new Athlete({
        ...body
    })
    console.log('attempting to create user with fields: ', athlete)

    try {
        const savedAthlete = await athlete.save()
        console.log('successful creation of athlete: ', savedAthlete)
        response.status(201).json(savedAthlete.toJSON())
    } catch (e) {
        next(e)
    }
})

/*
 * 
 */
athleteRouter.put('/:id', async (request, response, next) => {
    try {
        console.log('Attempting to update with: ', request.body)
        await Athlete.update({_id: request.params.id}, request.body)
        const updatedAthlete = await Athlete.findById(request.params.id)

        response.status(200).json(updatedAthlete.toJSON())
    } catch (e) {
        response.status(400).send({error: 'Problem finding document. Make sure the ID is correct.'})
    }
})

module.exports = athleteRouter