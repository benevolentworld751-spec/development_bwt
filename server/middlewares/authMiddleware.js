import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ✅ 1. REQUIRE SIGN IN
export const requireSignIn = async (req, res, next) => {
  try {
    // 🚨 CRITICAL FIX: Must match the name in your Login Controller

    const token = req.cookies.X_TTMS_access_token;
    res.cookie("X_TTMS_access_token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 4 * 24 * 60 * 60 * 1000,
    });

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: No token provided!",
      });
    }

    // Verify using the Secret from .env
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          success: false,
          message: "Forbidden: Invalid Token",
        });
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: "Auth Failed" });
  }
};

// ✅ 2. IS ADMIN
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).send({ message: "User not found" });

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
    res.status(401).send({ message: "Error in admin middleware" });
  }
};
