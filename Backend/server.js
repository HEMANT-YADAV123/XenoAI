const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const colors = require('colors');
const dotenv = require('dotenv'); 
const connecttoDb = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');

//routes
const authroutes = require('./routes/authRoutes');
const openaiRoutes = require("./routes/openaiRoutes");

//dotenv
dotenv.config() //after this we can load our env variables in app.js using process.env.

//calling mongoose connection
connecttoDb();



//Rest object.
const app = express();//we get all the functionalities of express.


//middlewares.
// middlewares are functions or modules that sit between the request and response cycle of an application. They act as intermediaries to process requests, modify responses, or handle various operations such as logging, authentication, or error handling.
app.use(cors());
app.use(express.json());//a middleware in Express that helps your app understand JSON data coming in from client requests.
app.use(bodyParser.urlencoded({extended:false})) //It helps your Express app read data sent from an HTML form (like a login form) so you can easily access it in your code.
app.use(morgan('dev'))// This tool logs requests to the console so you can see what’s happening on your server.
app.use(errorHandler);//to handle error and send response message and status code.
const PORT = process.env.PORT || 8081

//API routes.
app.use('/api/v1/auth',authroutes);
app.use("/api/v1/hugging", authMiddleware.protect, openaiRoutes);


app.listen(PORT,()=>{
    console.log(`server running in ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
    
})