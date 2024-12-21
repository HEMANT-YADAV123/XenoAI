import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
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
const JsConverter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [code, setcode] = useState("");
  const [error, setError] = useState("");
  const [loading,setLoading] = useState(false)//loading state.

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      // Send the English text to the backend API for conversion to JS code
      const { data } = await axios.post("https://xenoai-backend.onrender.com/api/v1/hugging/js-converter", { text });
      console.log(data);
      
      // Check if the backend response is successful
      if (data.success) {
        setcode(data.jsCode || "No JavaScript code generated.");
      } else {
        setError(data.message || "Error generating JavaScript code.");
      }
    } catch (err) {
      console.log(error);
      
      // Handle different types of errors
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      
      // Reset the error after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
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
      {/* Error Alert */}
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>

      {/* Form to input English text */}
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">English to JavaScript Converter</Typography>

        <TextField
          placeholder="Enter your English text here"
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
          disabled={loading} // Disable button while loading
        >
          { loading ? <CircularProgress size={24} sx={{ color: "white" }}/> : "Convert"}
          
        </Button>
        <Typography mt={2}>
          Not this tool? <Link to="/">Go Back</Link>
        </Typography>
      </form>

      {/* Display the generated JavaScript code */}
      { loading ?
        <Card
        sx={{
          mt: 4,
          border: 1,
          boxShadow: 0,
          height: "500px",
          overflowY: "auto",
          borderRadius: 5,
          borderColor: "natural.medium",
          bgcolor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      > 
        <CircularProgress/>
      </Card>
      
      : code ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            overflowY: "auto",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
          }}
        >
          <Typography p={2} component="pre" sx={{ whiteSpace: "pre-wrap" }}>
            {code}
          </Typography>
        </Card>
      ) : (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
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
              verticalAlign: "middle",
              lineHeight: "450px",
            }}
          >
            Your JavaScript code will appear here.
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default JsConverter;
