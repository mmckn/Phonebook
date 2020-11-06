
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

//allows our frontend app to access this server
const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
//json parser takse JSON date of a request and converts it to JavaScript
//and attaches it to request.body
app.use(express.json())

//create a new morgan token that gets the request.body
morgan.token('person', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':person :method :url :response-time'))
let persons = [
    {
      id: 1,
      name: "Ada",
      number: "028392480",
      
    },
    {
      id: 2,
      name: "Jim Johnson",
      number: "02304328349",
     
    },
    {
      id: 3,
      name: "joe jimson",
      number: "32084423904",
      
    }
  ]

  let numberofentries = Person.length - 1
  let date = new Date()

  app.get('/', (request, response) =>{
      response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (request, response) => {
     Person.find({}).then(people =>{
       response.json(people)
     })
  })

  app.get('/info', (request, response) => {
response.send(`Phonebook has info for ${numberofentries} people. <br>
<br>
${date} `)
  })

  //get an entry from the phonebook by id
  app.get('/api/persons/:id', (request, response) =>{
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
  }
  )

//delete an entry from the phonebook
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })




  //add a new entry to the phonebook
  app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body)
    if(body.content === undefined){
      return response.status(400).json({
        
        error: 'content missing'
      })
    }


    /*if(persons.filter(p => p.name == body.name).length >0)
    {
      return response.status(400).json({
        error:"This person is already in the phonebook"
      })
    }*/


    
    const person = new Person({
     
      name: body.name,
       number:body.number,
        
    })

    
person.save().then(savedPerson => {
  response.json(savedPerson)
})
 

  })
  
  
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
      console.log(`server running on ${PORT}`)
  })

