import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Card,
  CircularProgress,
} from "@mui/material";

// Set up Axios interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
const Paragraph = () => {
  const theme = useTheme();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [para, setPara] = useState("");
  const [loading,setLoading] = useState(false);

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://xenoai-backend.onrender.com/api/v1/hugging/generate-text", { question: text });

     // Check if the result is available
     if (data && data.result && data.result.parts && data.result.parts.length > 0) {
      const textContent = data.result.parts[0].text;  // Access the text inside the first part
      setPara(textContent);  // Set the generated text
    } else {
      toast.error("No content generated");
    }
    } catch (err) {
      console.log(err);
      if (err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else if (err.message) {
        toast.error(err.message);
      }
    }
    finally{
      setLoading(false);
    }
  };
  return (
    <Box
      width={isNotMobile ? "40%" : "80%"}
      p={"2rem"}
      m={"2rem auto"}
      borderRadius={5}
      sx={{ boxShadow: 5 }}
      backgroundColor={theme.palette.background.alt}
    >
    
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Generate Paragraph</Typography>

        <TextField
          placeholder="add your text"
          type="text"
          multiline={true}
          required
          margin="normal"
          fullWidth
          value={text}
          onChange={(e) => {
            settext(e.target.value);
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
          disabled={loading}//disable button while loading.
        >
          {loading ? <CircularProgress size={"24px"} sx={{ color: "white" }}/> : "Generate"}
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography>
      </form>

      {loading ?
        <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          height: "500px",
          maxHeight: "500px", // Ensures the height doesn't exceed 500px
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center" 
        }}
      >
        <CircularProgress/>
      </Card>
      : para ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            maxHeight: "500px", // Ensures the height doesn't exceed 500px
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            overflowY: "auto",
          }}
        >
          <Typography p={2}>{para}</Typography>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            maxHeight: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography
            variant="h5"
            color="natural.main"
            sx={{
              textAlign: "center",
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Your Paragraph Will Appear Here
          </Typography>
        </Card>
      )}
      <ToastContainer/>
    </Box>
  );
};

export default Paragraph;