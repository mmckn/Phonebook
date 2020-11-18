

const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}


//If user enters an unkown URL display this
const unknownEndpoint = ( request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
  

  
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  
  //if error is castError then it is an invalid object id for mongoDb
  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'id formatted incorrectly' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
  //if it is not then pass it to the default error handler
  next(error) 
}
  

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
  
  