import express from "express";
import {
  deleteUserAccount,
  deleteUserAccountAdmin,
  getAllUsers,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

// ✅ THIS IS THE ROUTE FAILING IN YOUR CONSOLE
router.get("/user-auth", verifyToken, (req, res) => {
  res.status(200).json({ ok: true });
});

// ✅ Admin Auth Route
router.get("/admin-auth", verifyToken, (req, res) => {
  if (req.user.user_role !== 1) {
    return res.status(403).json({ ok: false, message: "Unauthorized" });
  }
  res.status(200).json({ ok: true });
});

//update user details
router.post("/update/:id", requireSignIn, upload.single("avatar"), updateUser);

//update user password
router.post("/update-password/:id", requireSignIn, updateUserPassword);

//delete user account
router.delete("/delete/:id", requireSignIn, deleteUserAccount);

//get all users
router.get("/getAllUsers", requireSignIn, isAdmin, getAllUsers);

//admin delete user accounts
router.delete(
  "/delete-user/:id",
  requireSignIn,
  isAdmin,
  deleteUserAccountAdmin
);

export default router;
