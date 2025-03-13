import React from 'react'
import {Box,Typography,useTheme} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import {NavLink, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const theme = useTheme();
    const loggedIn = localStorage.getItem("authToken");//if authToken is present means are loggedIn.
    const navigate = useNavigate();
    //handle logout.
    const handleLogout = async()=>{
        try {
          await axios.post('https://xenoai-backend.onrender.com/api/v1/auth/logout');//call the backend logout controller.
          //clear the token from localstorage.
          localStorage.removeItem("authToken")
          //give notification
          toast.success('Logged Out Successfully');
          //redirect it to login page.
          setTimeout(()=>{
            navigate('/login')
          },1000)
          
        } catch (error) {
          console.log(error);
          
        }
    }
  return (
    <div>
      <Box 
      width={'100%'} 
      backgroundColor={theme.palette.background.alt}
      p='1rem 6%' 
      textAlign={'center'} 
      sx={{boxShadow:3, mb:2}}
      >
        <Typography variant="h2" 
        color={"primary"} 
        fontWeight={"bold"}
        >
                XenoAI
        </Typography>
        {
          loggedIn ? (
          <>
              <NavLink to="/" p={1}>
                Home
              </NavLink>
              <NavLink onClick={handleLogout} p={1}>
                Logout
              </NavLink>
          </>  
        ) 
          : 
          (
            <>
            <NavLink to="/register" p={1}>
                Sign Up
            </NavLink>
            <NavLink to="/login" p={1}>
                Sign In
            </NavLink>
            </>
          )
        }
        
      </Box>
    </div>
  )
}

export default Navbar
