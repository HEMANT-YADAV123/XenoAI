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
  CircularProgress, // Import CircularProgress
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
const ChatBot = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [text, settext] = useState("");
  const [style, setStyle] = useState("yoda"); // Default chatbot style
  const [response, setresponse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    try {
      const { data } = await axios.post("https://xenoai-backend.onrender.com/api/v1/hugging/chatbot",{text , style});
      console.log(data);
      if (data.success) {
        setresponse(data.chatbotResponse || "No response available.");
      } else {
        setError(data.message || "Error generating message.");
      }
    } catch (err) {
      console.log(error);
      if (err.response.data?.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
    finally {
      setLoading(false); // Set loading to false
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
      <Collapse in={error}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Collapse>
      <form onSubmit={handleSubmit}>
        <Typography variant="h3">Ask the ChatBot</Typography>

        <TextField
          placeholder="type your question here"
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
         {/* Chat Style Selection */}
         <TextField
          select
          label="Response Style"
          value={style}
          fullWidth
          margin="normal"
          onChange={(e) => setStyle(e.target.value)}
          SelectProps={{ native: true }}
        >
          <option value="yoda">Yoda</option>
          <option value="default">Default</option>
        </TextField>


        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          sx={{ color: "white", mt: 2 }}
          disabled={loading} // Disable button while loading
        >
           {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Get Response"}
        </Button>
        <Typography mt={2}>
          not this tool ? <Link to="/">GO BACK</Link>
        </Typography>
      </form>

      {loading ? (
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
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Card>
      )
      : response ? (
        <Card
          sx={{
            mt: 4,
            border: 1,
            boxShadow: 0,
            height: "500px",
            borderRadius: 5,
            borderColor: "natural.medium",
            bgcolor: "background.default",
            overflowY: "auto", // Enable scroll
          }}
        >
          <Typography p={2}>{response}</Typography>
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
            Bot Response
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ChatBot;