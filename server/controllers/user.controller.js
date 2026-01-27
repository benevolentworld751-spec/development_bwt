import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//update user details
export const updateUser = async (req, res) => {
  // ✅ Safety Check: Ensure the logged-in user matches the ID in the URL
  if (req.user.id !== req.params.id) {
    return res.status(401).send({
      success: false,
      message: "You can only update your own account please login again!",
    });
  }

  try {
    const updatedFields = {
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    };

    // Check if a new avatar was uploaded via Multer
    if (req.file) {
      updatedFields.avatar = req.file.filename; 
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;

    res.status(201).send({
      success: true,
      message: "User Details Updated Successfully",
      user: rest,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(200).send({
        success: true, // sending true so frontend handles it gracefully
        message: "Email already taken, please login!",
      });
    }

    console.error(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating user",
    });
  }
};

// update user password
export const updateUserPassword = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(401).send({
        success: false,
        message: "You can only update your own password!",
      });
    }

    const validUser = await User.findById(req.params.id);

    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    // 🚫 Block Google users from changing password (they don't have one)
    if (validUser.authProvider === "google") {
      return res.status(400).send({
        success: false,
        message: "Google users cannot change password",
      });
    }

    const { oldpassword, newpassword } = req.body;

    const validPassword = bcryptjs.compareSync(
      oldpassword,
      validUser.password
    );

    if (!validPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid old password",
      });
    }

    const updatedHashedPassword = bcryptjs.hashSync(newpassword, 10);

    await User.findByIdAndUpdate(req.params.id, {
      $set: { password: updatedHashedPassword },
    });

    res.status(201).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error updating password" });
  }
};


//delete user
export const deleteUserAccount = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return res.status(401).send({
      success: false,
      message: "You can only delete your account!",
    });
  try {
    await User.findByIdAndDelete(req.params.id);

    // ✅ FIXED: Clear the CORRECT cookie name (X_TTMS_access_token)
    res.clearCookie("X_TTMS_access_token", {
      secure: process.env.NODE_ENV_CUSTOM === "production",
      sameSite: process.env.NODE_ENV_CUSTOM === "production" ? "none" : "lax",
    }); 
    
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error deleting account" });
  }
};

//get all users admin
export const getAllUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    // Regex search on multiple fields
    const users = await User.find({
      user_role: 0, // Only fetch normal users, not admins
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    });
    
    if (users && users.length > 0) {
      res.send(users);
    } else {
      res.status(200).send({
        success: false,
        message: "No Users Yet!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error fetching users" });
  }
};

//delete user admin
export const deleteUserAccountAdmin = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req?.params?.id);
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Error deleting user" });
  }
};