

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
var fetch = require('node-fetch');


const url =''


app.use(express.static('build'))

app.use(express.json())


const Person = require('./models/person')

//allows our frontend app to access this server
const cors = require('cors');
const e = require('express');
const { nextTick } = require('process');
const { notEqual } = require('assert');
app.use(cors())

//If user enters an unkown URL display this
const unknownEndpoint = ( request, response) => {
  response.status(404).send({ error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  //if error is castError then it is an invalid object id for mongoDb
  if(error.name === 'CastError') {
    return response.status(400).send({error: "id formatted incorrectly"})
  }
  //if it is not then pass it to the default error handler
  next(error)
}

app.use(errorHandler)


//json parser takse JSON date of a request and converts it to JavaScript
//and attaches it to request.body


//create a new morgan token that gets the request.body
morgan.token('person', function (req, res) { return JSON.stringify(req.body) })








app.use(morgan(':person :method :url :response-time'))


  let numberofentries = Person.length - 1
  let date = new Date()

  app.get('/api/persons', (request, response) => {
    console.log('hello')
     Person.find({}).then(people =>{
       response.json(people)
     })
  })

  app.get('/api/persons/info', (request, response) => {
response.send(`Phonebook has info for ${numberofentries} people. <br>
<br>
${date} `)
  })

  //get an entry from the phonebook by id
  app.get('/api/persons/:id', (request, response, next) =>{
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
    .catch(error => 
      next(error)
    )
  }
  )

//delete an entry from the phonebook
  app.delete('/api/persons/:id', (request, response, next) => {
    
    
    Person.findByIdAndDelete(request.params.id).then( result => {
 
    response.status(204).end()
    })
    .catch(error => next(error))
  })




  //add a new entry to the phonebook
  app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body)
    if(body.name === undefined){
      return response.status(400).json({
        
        error: 'name missing'
      })
    }
    const person = new Person({
    
      name:body.name,
      phoneNumber: body.number
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })})

  
    /*if(persons.filter(p => p.name == body.name).length >0)
    {
      return response.status(400).json({
        error:"This person is already in the phonebook"
      })
    }*/

app.put('api/persons/:id', (request, response,next) => {
  const body = request.body

  const person = {
name: body.name,
phoneNumber: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson =>{
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})
    
  
  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
      console.log(`server running on ${PORT}`)
  })

