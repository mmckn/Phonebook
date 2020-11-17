
const peopleRouter = require('express').Router()


const Person = require('../models/person')

let numberofentries = Person.length - 1
let date = new Date()

peopleRouter.get('/', async (request, response) => {

  const foundPerson = await Person.find({})
  response.json(foundPerson)

})


peopleRouter.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${numberofentries} people. <br>
<br>
${date} `)
})


//get an entry from the phonebook by id
peopleRouter.get('/:id', async (request, response) => {

  const records = await Person.findById(request.params.id)

  response.json(records)
})


//delete an entry from the phonebook
peopleRouter.delete('/:id', async (request, response) => {

  const result = await Person.findByIdAndDelete(request.params.id)

  response.status(204).end()


})


//add a new entry to the phonebook
peopleRouter.post('/', async (request, response) => {
  const body = request.body

  const person = new Person({

    name: body.name,
    phoneNumber: body.number
  })

  const savedPerson = await person.save()
  response.json(savedPerson.toJSON())

})


//Update an entry
peopleRouter.put('/:id', async (request, response) => {

  const body = request.body
  console.log(body)
  const person = {
    name: body.name,
    phoneNumber: body.number,
  }

  const updatedPerson = await Person.findByIdAndUpdate(request.params.id, person, { new: true })

  response.json(updatedPerson.toJSON())


})

module.exports = peopleRouter