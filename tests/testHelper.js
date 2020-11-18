const Person = require('../models/person')

const initialRecords = [
  {
    name: "John",
    phoneNumber: "0289323242"
  },
  {
    name: "Joeseph",
    phoneNumber: "028930983234"
  },
  {
    name: "Michael",
    phoneNumber: "028342123098"
  }

]


const entriesinDb = async () => {
  const people = await Person.find({})
  return people.map(person => person.toJSON())
}


module.exports = {
  initialRecords, entriesinDb
}