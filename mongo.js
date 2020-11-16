const mongoose = require('mongoose')

if(process.argv.length <3) {
    console.log('please provide the password as an argument : node mongo.js <password>')
    process.exit(1)
}
//argv is an array and contains the user entered info in the command line starting from position [2]
const password = process.argv[2]
const enteredName = process.argv[3]
const enteredPhoneNumber= process.argv[4]
const url = `mongodb+srv://fullstack:${password}@cluster0.bwvso.mongodb.net/Person-app?retryWrites=true&w=majority`

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false, useCreateIndex: true})


const personSchema = new mongoose.Schema({

name: {
    type: String,
    minlength: 1,
    required:true
},
phoneNumber:{
    type: String,
    minlength: 1,
    required: true
},

})

const Person = mongoose.model('Person',personSchema)
//if the user does not enter a name to add then print out the database
if(enteredName){

const person = new Person({
    name:enteredName,
    phoneNumber:enteredPhoneNumber
})

person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
})
}

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})



