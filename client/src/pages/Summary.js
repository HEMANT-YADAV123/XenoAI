import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
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
const Summary = () => {
  const theme = useTheme();
  //media
  const isNotMobile = useMediaQuery("(min-width: 600px)");
  // states
  const [text, settext] = useState("");
  const [summary, setSummary] = useState("");
  const [loading,setLoading] = useState(false);
  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://xenoai-backend.onrender.com/api/v1/hugging/summary",{text});
      console.log(data);
      if (data.success) {
        setSummary(data.summary || "No summary generated.");
      } else {
        toast.error(data.message || "Error generating summary.");
      }
    } catch (err) {
      console.log(err);
      if (err.response.data?.error) {
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
        <Typography variant="h3">Summarize Text</Typography>

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
          disabled={loading}//disable button while loading
        >
          {loading ? <CircularProgress size={24} sx={{color: "white"}} /> : "Submit"}
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
      : summary ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            overflowY: "auto", // Enables vertical scrolling
            padding: 2, // Add padding for better readability
          }}
        >
          <Typography p={2}>{summary}</Typography>
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
              verticalAlign: "middel",
              lineHeight: "450px",
            }}
          >
            Summary Will Appear Here
          </Typography>
        </Card>
      )}

      <ToastContainer/>
    </Box>
  );
};

export default Summary;