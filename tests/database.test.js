

const { get } = require('http')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../App')

const db = supertest(app)


const Person = require('../models/person')

const initialRecords = [
  {
    name:"John",
    phoneNumber:"0289323242"
  },

]

beforeEach(async () => {
  await Person.deleteMany({})
  let personObject = new Person(initialRecords[0])
  await personObject.save()
})



test('phonebook entries are returned as json', async () =>{
  await db
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('phonebook entry exists', async () =>{
  const response = await db.get('/api/persons')

  const names = response.body.map( r => r.name)
  expect(names).toContain(
    'John'
  )
  console.log(names)
})
  
test('findbyid works', async () =>{
    const response = await db.get('/api/persons')
  
    const getById = await db.get(`/api/persons/${response.body[0].id}`)
   
    expect(getById.body.id).toContain(response.body[0].id)
  })
afterAll(() => {
  mongoose.connection.close()
})