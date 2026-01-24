// ✅ FILE: api/utils/verifyToken.js (or middleware/authMiddleware.js)
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. READ THE CORRECT COOKIE NAME (Matches your Login Controller)
  const token = req.cookies.X_TTMS_access_token;

  if (!token) {
    // This is exactly why you get the 401 error in the console
    return res.status(401).json({ 
      success: false, 
      message: "You are not authenticated! Token not found." 
    });
  }

  // 2. VERIFY WITH ENV SECRET
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: "Token is not valid!" 
      });
    }
    
    req.user = user;
    next();
  });
};