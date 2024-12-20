import React from 'react'
import {Box,Typography,useTheme,Link} from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
const Navbar = () => {
    const theme = useTheme();
    const loggedIn = localStorage.getItem("authToken");//if authToken is present means we have login.
    const navigate = useNavigate();
    //handle logout.
    const handleLogout = async()=>{
        try {
          await axios.post('/api/v1/auth/logout');//call the backend logout controller.
          //clear the token from localstorage.
          localStorage.removeItem("authToken")
          //give notification
          toast.success('Logged Out Successfully');
          //redirect it to login page.
          navigate('/login');
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
              <Link href="/" p={1}>
                Home
              </Link>
              <Link href="/login" onClick={handleLogout} p={1}>
                Logout
              </Link>
          </>  
        ) 
          : 
          (
            <>
            <Link href="/register" p={1}>
                Sign Up
            </Link>
            <Link href="/login" p={1}>
                Sign In
            </Link>
            </>
          )
        }
        
      </Box>
    </div>
  )
}

export default Navbar
