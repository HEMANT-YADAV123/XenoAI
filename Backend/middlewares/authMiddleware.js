const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

exports.protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from `Authorization` header
  
  if (!token) {
    return res.status(401).json({ error: "No token provided. Access denied." });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; // Attach user info from token to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid token. Access denied." });
  }
};
