const errorHandler = require('../middlewares/errorMiddleware');
const userModel = require('../models/userModel');
const errorResponse = require('../utils/errorResponse');

//Generating the token and then sending token , status in the form of response.
exports.sendToken = (user,statusCode,res)=>{
    const token = user.getSignedToken(res);//generate the token 

    res.status(statusCode).json({//send the response along with success status and token.
        success: true,
        token,//The generated JWT token, used for authentication in subsequent requests.
    });
}

//REGISTER
exports.registerController = async (req,res,next) => {
    try {
        const {username,email,password} = req.body //we expect from the user to enter these details in the body.
        //after getting above information we perform validation.
        // Validate that the required fields are provided
        if (!username || !email || !password) {
            return next(new errorResponse('Please provide all fields', 400));
        }
        //1. exixting user.
        const existingEmail = await userModel.findOne({email});//we check if we get the same email already registered.
        if(existingEmail)
        {
            return next(new errorResponse('Email is already registered',400))//move to next middleware.
        }

        //if email is not existing Email then create user and generate the token and send the token and status in the form of response.
        const user = await userModel.create({username,email,password})
        this.sendToken(user,201,res)//pass the created user in it.

    } catch (error) {
        console.log(error);//if error occurs it will log the error and
        next(error);//After next(erro->this error is an object) is called, Express skips all subsequent route handlers or middleware and looks for an error-handling middleware (errorHandler).
    }
};

//LOGIN
exports.loginController = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        console.log('Email:', email);
        console.log('Password:', password);
        //validation
        if(!email || !password)
        {
            return next(new errorResponse('please provide email/password',400)) //400 for bad request.
        }
        const user = await userModel.findOne({email})
        if(!user)//means user is not found then we can't login.
        {
            return next(new errorResponse('Invalid credentials',401));//401 for unauthorized user.
        }
        //if the user is present then we will check the password.
        const isMatch = await user.matchPassword(password)
        if(!isMatch)
        {
            return next(new errorResponse('Invalid Credentials',401));
        }

        //if all things are correct then send response.
        this.sendToken(user,200,res);

    } catch (error) {
        console.log(error);
        next(error);
    }
};

//LOGOUT
exports.logoutController = async (req,res) => {
    res.clearCookie('refreshToken');//clear the refresh token sended by sendToken.
    return res.status(200).json({
        success:true,
        message:"Logout Successfully"
    });
};