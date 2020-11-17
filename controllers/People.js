
const peopleRouter = require('express').Router()

const Person = require('../models/person')

let numberofentries = Person.length - 1
let date = new Date()

peopleRouter.get('/', (request, response) => {
  console.log('hello')
  Person.find({}).then(people => {
    response.json(people)
  })
})

peopleRouter.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${numberofentries} people. <br>
<br>
${date} `)
})

//get an entry from the phonebook by id
peopleRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }
      else{
        response.status(404).end()
      }
    }
    )
    .catch(error =>  next(error)
    )
}
)

//delete an entry from the phonebook
peopleRouter.delete('/:id', (request, response, next) => {


  Person.findByIdAndDelete(request.params.id).then( result => {

    response.status(204).end()
  })
    .catch(error => next(error))
})




//add a new entry to the phonebook
peopleRouter.post('/', (request, response, next) => {
  const body = request.body


  const person = new Person({

    name:body.name,
    phoneNumber: body.number
  })

  person.save()

    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch( error => next(error))
})

//Update an entry
peopleRouter.put('/:id', (request, response, next) => {
  const body = request.body
  console.log(body)
  const person = {
    name: body.name,
    phoneNumber: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

module.exports = peopleRouter