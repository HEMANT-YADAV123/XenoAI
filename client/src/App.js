import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Paragraph from "./pages/Paragraph";
import Summary from "./pages/Summary";
import ChatBot from "./pages/ChatBot";
import JsConverter from "./pages/JsConverter";
import ScifiImages from "./pages/ScifiImages";

function App() {
  const theme = useMemo(() => createTheme(themeSettings(), []));
  useEffect(() => {
    document.title = "XenoAI"; // Set your desired title here.
  }, []);

  const navigate = useNavigate();
  //check if the token is not expired.
  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token expired. Logging out.");
        localStorage.removeItem("authToken");
        navigate("/login"); // Redirect to login page.
      }
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route
            path="/summary"
            element={<PrivateRoute element={<Summary />} />}
          />
          <Route
            path="/text-generation"
            element={<PrivateRoute element={<Paragraph />} />}
          />
          <Route
            path="/chatbot"
            element={<PrivateRoute element={<ChatBot />} />}
          />
          <Route
            path="/js-converter"
            element={<PrivateRoute element={<JsConverter />} />}
          />
          <Route
            path="/scifi-image"
            element={<PrivateRoute element={<ScifiImages />} />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
