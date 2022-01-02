const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log(err)
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || `something went wrong , try again later`
  }


  if(err.name === 'ValidationError'){
    customError.msg = Object.values(err.errors).map(item=>item.message).join(',')
    customError.statusCode = StatusCodes.BAD_REQUEST
  }
 

  if(err.code && err.code ==11000){
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.msg = `duplicate value enter for ${Object.keys(err.keyValue)} field, please choose another value `
  }

   return res.status(customError.statusCode).json({ msg: customError.msg })

}

module.exports = errorHandlerMiddleware
