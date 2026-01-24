import express from "express";
import {
  logOutController,
  loginController,
  signupController,
  googleAuthController, // ✅ add this
} from "../controllers/auth.controller.js";

const router = express.Router();

// signup
router.post("/signup", signupController);

// login
router.post("/login", loginController);

// google login
router.post("/google", googleAuthController); // ✅ NEW

// logout
router.get("/logout", logOutController);

export default router;
