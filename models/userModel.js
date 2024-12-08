const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const cookie = require('cookie');

//models

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require:[true,'username is required'],
        minlength: [5,'name must be at least 5 char'],
        maxlength: [50,'name must be less than 50 char'],
        trim: [true] 
    },
    email: {
        type: String,
        unique: [true,'email is already registered'],
        require: true,
        lowercase: true,
        
    },
    password:{
        type: String,
        required:true,
        select: true,// To enhance security by ensuring sensitive data (e.g., passwords) is not included in query results unintentionally in mongodb.
        minlength: [6,'name mus6t be at least  char']
    },
    customerId:{
        type:String,
        default:""
    },
    subscription:{
        type:String,
        default:""
    }
});

//hashing password.

//here we used userSchema.pre('save',async function) means we are doing hashing pre(before) saving.
//we use function keyword because we will use 'this' keyword which will points to the document being saved.
//if we use arrow function then this will not point to any document.
//if next(passed in function) is called then only our data will be saved.
userSchema.pre('save',async function(next){
    // `this` refers to the document being saved
    // It allows access to fields like this.password means document.password.
    //next is a function that tells Mongoose to move to the next middleware or save the document if there are no more middlewares.
    //below condition checks if the password is changed , if not changed then it will not hash the hashed password again as it is unecessary and will move to next middleware if there is any.
    if(!this.isModified('password'))
    {
        return next();
    }

    //if password is changes then hash it.
    const salt =await bcrypt.genSalt(10);//we passed 10 (number of rounds to use when generating salt more rounds==more expensive and secure salt) and bcrypt.genSalt is a lib to generate a random String called salt.

    //now hash the password using salt.
    this.password = await bcrypt.hash(this.password,salt);//as our function is async(non-blocking),so await keyword is used to make function wait until salt is generated and hasing is done.async function return promise function that resolve the salt.
    //A Promise in JavaScript is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
    //A Promise function is a function that returns a Promise. This Promise represents the eventual result of an asynchronous operation, which can either resolve with a successful value or reject with an error.
    //Promise is used in the bcrypt.genSalt() and bcrypt.hash() methods, both of which are asynchronous functions and return Promises.

    //after hashing the password move to next() middleware.
    next();
});
 
//match password.

//userSchema.methods.matchPassword defines a method called matchPassword on the userSchema (Mongoose schema). It means that this method can be called on any instance of the model (like a specific user document) to check if the password provided matches the one stored in the database.
userSchema.methods.matchPassword = async function(password) {
    console.log("Password from user input:", password); // Check the input password
    console.log("Hashed password from DB:", this.password); // Check the stored hashed                      password           
    
    if(!password || !this.password)
    {
        throw new Error("Password comparison failed due to undefined value");
    }
    return await bcrypt.compare(password,this.password);
}//return true if password is matched otherwise false.



//SIGN TOKEN
userSchema.methods.getSignedToken = function(res) {

    //generating access token.
    const accessToken = JWT.sign(//JWT.sign() is used to create a signed JWT token.
        {id:this._id},//this._id will refer to the _id of the current user document.
        process.env.JWT_ACCESS_SECRET,//variable holding the secret key used to sign the token.
        {expiresIn:process.env.JWT_ACCESS_EXPIREIN}//determines how long the access token is valid 
    );
    //generating refresh token.
    const refreshToken = JWT.sign(
        {id:this._id},
        process.env.JWT_REFRESH_TOKEN,
        {expiresIn:process.env.JWT_REFRESH_EXPIREIN}
    );
    //The access token is typically included in the response body (e.g., as JSON), while the refresh token is stored as an HTTP-only cookie to keep it secure.

    // Set the refresh token in the cookies of the response.(means sending the refresh token as a cookie in the response.)
    res.cookie('refreshToken',`${refreshToken}`,{
        maxAge:86400 * 7000,//it sets the expiry age.
        httpOnly:true//only accessible through http only through js.
    }
    );
    return accessToken;
    
}


const USER = mongoose.model('User',userSchema,'users');//to export the model we use mongoose.model
module.exports = USER;