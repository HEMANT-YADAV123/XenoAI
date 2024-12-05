const errorResponse = require("../utils/errorResponse");


const errorHandler = (err,req,res,next)=>{
    let error = {...err};//The line let error = { ...err }; creates a shallow copy of the error object to modify it without affecting the original.
    error.message = err.message;//ensures that the message property is available for the copied error object.


    //mongoose cast error
    //This handles cases where Mongoose throws a CastError (e.g., invalid ObjectId in MongoDB queries).
    if(err.name === 'CastError')
    {
        const message = 'Resources not found error'
        error = new errorResponse(message,404);
    }

    //duplicate key error (11000 is code for duplicate key)
    if(err.code === 11000)
    {
        const message = "Duplicate field value entered"
        error = new errorResponse(message,400)
    }

    //mongoose validation
    //Mongoose ValidationError occurs when schema validation fails (e.g., a required field is missing or an invalid value is provided).
    if(err.name === 'ValidationError')
    {
        const message = Object.values(err.errors).map(val => val.message)//This code extracts all error messages from the errors object using Object.values() and maps them into a single array of messages.
        error = new errorResponse(message,400)
    }

    //send the error response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
    
}; 

module.exports = errorHandler