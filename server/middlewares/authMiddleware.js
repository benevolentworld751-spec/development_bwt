import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isProduction = process.env.NODE_ENV_CUSTOM === "production";

// ✅ REQUIRE SIGN IN
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.cookies.X_TTMS_access_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.user = decoded; // { id, email, role }
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Auth failed" });
  }
};

// ✅ ADMIN CHECK
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.user_role === 1) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin only",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Admin middleware error" });
  }
};
