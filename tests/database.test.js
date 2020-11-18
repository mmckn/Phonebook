

const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelper')
const app = require('../App')

const server = supertest(app)

const Person = require('../models/person')
const { response } = require('express')


beforeEach(async () => {
  await Person.deleteMany({})
  for (let person of helper.initialRecords) {
    let personObject = new Person(person)
    await personObject.save()
  }

})


test('phonebook entries are returned as json', async () => {
  await server
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('All notes are returned.', async () => {
  const response = await server.get('/api/persons')
  expect(response.body).toHaveLength(helper.initialRecords.length)
})


test('phonebook entry exists', async () => {
  const response = await server.get('/api/persons')

  const names = response.body.map(r => r.name)
  expect(names).toContain(
    'John'
  )

})


test('A new entry can be added', async () => {
  const newPerson = {
    name: "newEntry",
    number: "02832432454"
  }

  await server.post('/api/persons')
    .send(newPerson)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const people = await helper.entriesinDb()
  expect(people).toHaveLength(helper.initialRecords.length + 1)

  const names = people.map(p => p.name)
  expect(names).toContain('newEntry')
})


test('Entry without number cannot be added', async () => {
  const newPerson = {
    name: "newEntry",

  }

  await server.post('/api/persons')
    .send(newPerson)
    .expect(400)

})


test('Entry without name cannot be added', async () => {
  const newPerson = {
    number: "03423424332"

  }

  await server.post('/api/persons')
    .send(newPerson)
    .expect(400)

})


test('findbyid works with an id that exists', async () => {
  const response = await server.get('/api/persons')

  const getById = await server.get(`/api/persons/${response.body[0].id}`)

  expect(getById.body.id).toContain(response.body[0].id)
})
afterAll(() => {
  mongoose.connection.close()
})


test('findbyid does not work when id does not exist', async () => {
  const response = await server.get('/api/persons')

  const getById = await server.get(`/api/persons/5fa42c0d2f07dc3afcca0c24`)

    .expect(404)

})


test('delete a phonebook entry works.', async () => {
  const response = await server.get('/api/persons')

  const deletedPerson = await server.delete(`/api/persons/${response.body[0].id}`)
    .expect(204)
})


test('delete a phonebook entry does not work when entry does not exist.', async () => {

  const getById = await server.get(`/api/persons/5fa42c0d2f07dc3aaaca0c24`)
    .expect(404)

  const deletedPerson = await server.delete(`/api/persons/5fa42c0d2f07dc3aaaca0c24`)
    .expect(204)
})


afterAll(() => {
  mongoose.connection.close()
})

