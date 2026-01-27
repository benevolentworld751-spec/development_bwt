import express from "express";
import {
  deleteUserAccount,
  deleteUserAccountAdmin,
  getAllUsers,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
// ✅ IMPORT FROM authMiddleware (Single Source of Truth)
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// ✅ FIX: User Auth Route (Fixes PrivateRoute 401 Error)
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

// ✅ FIX: Admin Auth Route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

// Other routes
router.post("/update/:id", requireSignIn, upload.single("avatar"), updateUser);
router.post("/update-password/:id", requireSignIn, updateUserPassword);
router.delete("/delete/:id", requireSignIn, deleteUserAccount);
router.get("/getAllUsers", requireSignIn, isAdmin, getAllUsers);
router.delete("/delete-user/:id", requireSignIn, isAdmin, deleteUserAccountAdmin);

export default router;