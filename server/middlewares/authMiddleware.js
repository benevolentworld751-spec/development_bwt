import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ✅ 1. SignIn Middleware
export const requireSignIn = async (req, res, next) => {
  try {
    // CRITICAL FIX: Read the exact cookie name used in your controller
    const token = req.cookies.X_TTMS_access_token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided!",
      });
    }

    // CRITICAL FIX: Use the environment variable, NOT a hardcoded string
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Forbidden: Invalid Token",
        });
      }

      // Attach decoded payload (contains { id: ... }) to request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Auth Failed" });
  }
};

// ✅ 2. Admin Middleware
export const isAdmin = async (req, res, next) => {
  try {
    // Fetch the full user because the token only contains the ID
    const user = await User.findById(req.user.id);
    
    if (!user) {
         return res.status(401).send({ success: false, message: "User not found" });
    }

    // Check Role (1 = Admin)
    if (user.user_role === 1) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access: Admin only",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};