import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

//update uset details
export const updateUser = async (req, res) => {
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

    // Check if a new avatar was uploaded
    if (req.file) {
      updatedFields.avatar = req.file.filename; // Or `req.file.path` depending on your multer config
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
        success: true,
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

    // 🚫 Block Google users
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
    res.clearCookie("access_token", {
      secure: process.env.NODE_ENV_CUSTOM === "production",
      sameSite: process.env.NODE_ENV_CUSTOM === "production" ? "none" : "lax",
    }); //clear cookie before sending json
    res.status(200).send({
      success: true,
      message: "User account has been deleted!",
    });
  } catch (error) {
    console.log(error);
  }
};

//get all users admin
export const getAllUsers = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || "";
    const users = await User.find({
      user_role: 0,
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
  }
};
