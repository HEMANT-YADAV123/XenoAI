import React from 'react'
import { useState } from 'react'
import {Box,Typography,useMediaQuery,useTheme,TextField,Button,Alert,Collapse} from '@mui/material'
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
  const theme = useTheme();//to use the theme in from material ui.
  const navigate = useNavigate();
  //states
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  //media query
  const isNotMobile = useMediaQuery("(min-width: 1000px)")

  //register function.
  const handleSubmit = async(e)=>{
      e.preventDefault();
      try {
        await axios.post('https://xenoai-backend.onrender.com/api/v1/auth/register',{username,email,password});
        //if data is done successfully then set success notification.
        toast.success('User Registered Successfully');
        //then we naviagte user to login page.
        navigate('/login');

      } catch (err) {
          console.log(err);

          if(err.response && err.response.data && err.response.data.error)//The code checks if there is a specific error message in err.response.data.error (which would be returned by the backend if there is a problem with the request). If so, it calls setError(err.response.data.error) to update the state and display the error message to the user.
          {
            setError(err.response.data.error);//show error from backend
          }
          else if(err.message)////The code checks if there is a specific error message in err.response.data.error (which would be returned by the backend if there is a problem with the request). If so, it calls setError(err.response.data.error) to update the state and display the error message to the user.
          {
              setError(err.message);//show error from backend
          }
          else 
          {
            // If no message is available, provide a default message
            setError("An unexpected error occurred. Please try again.");
          }
          setTimeout( () =>{setError("")},5000)
      }
  }
  return (
    <Box width={isNotMobile ? '40%':'80%'} 
    p={'2rem'} 
    m={'2rem auto'} 
    borderRadius={5} 
    sx={{boxShadow:5}} 
    backgroundColor={theme.palette.background.alt}
    >
      <Collapse in={error}>
        <Alert severity='error' sx={{mb:2}}>{error}</Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
          <Typography variant='h3'>
            Sign Up
          </Typography>

          <TextField 
          label="username atleast 5 characters" 
          required
          margin='normal' 
          fullWidth  
          value={username} 
          onChange={(e)=>{setUsername(e.target.value)}}
          >
          </TextField>
          <TextField 
          label="enter a valid email" 
          type='email'
          required
          margin='normal' 
          fullWidth  
          value={email} 
          onChange={(e)=>{setEmail(e.target.value)}}
          >
          </TextField>
          <TextField 
          label="password atleast 6 characters" 
          type='password'
          required
          margin='normal' 
          fullWidth  
          value={password} 
          onChange={(e)=>{setPassword(e.target.value)}}
          >
          </TextField>

          <Button type='submit'
          fullWidth
          variant='contained'
          size='large'
          sx={{color:'white',mt:2}}
          >
            Sign Up
          </Button>
          <Typography mt={2} >Already have a account ? <Link to="/login">Please Login</Link></Typography>
      </form>
    </Box>
  )
}

export default Register