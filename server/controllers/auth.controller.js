import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const isProduction = process.env.NODE_ENV_CUSTOM === "production" ? true : false;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// test controller
export const test = (req, res) => {
  return res.send("Hello From Test!");
};

// signup controller (UNCHANGED)
export const signupController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;

    if (!username || !email || !password || !address || !phone) {
      return res.status(200).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(200).send({
        success: false,
        message: "User already exists please login",
      });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
      authProvider: "local",
    });

    await newUser.save();

    return res.status(201).send({
      message: "User Created Successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in server!",
    });
  }
};

// login controller (UPDATED SAFELY)
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "All fields are required!",
      });
    }

    const validUser = await User.findOne({ email });
    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User not found!",
      });
    }

    if (validUser.authProvider === "google") {
      return res.status(400).send({
        success: false,
        message: "Please login using Google",
      });
    }

    const validPassword = bcryptjs.compareSync(
      password,
      validUser.password
    );

    if (!validPassword) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );

    const { password: pass, ...rest } = validUser._doc;

    res
      .cookie("X_TTMS_access_token", token, {
        httpOnly: true,
        maxAge: 4 * 24 * 60 * 60 * 1000,
         secure: isProduction,
         sameSite: isProduction ? "none" : "lax",
      })
      .status(200)
      .send({
        success: true,
        message: "Login Success",
        user: rest,
      });
  } catch (error) {
    console.log(error);
  }
};

// ✅ GOOGLE LOGIN CONTROLLER
export const googleAuthController = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        avatar: picture,
        authProvider: "google",
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "4d" }
    );

    const { password, ...rest } = user._doc;

    res
      .cookie("X_TTMS_access_token", jwtToken, {
        httpOnly: true,
        maxAge: 4 * 24 * 60 * 60 * 1000,
         secure: isProduction,
         sameSite: isProduction ? "none" : "lax",
      })
      .status(200)
      .send({
        success: true,
        message: "Google Login Successful",
        user: rest,
      });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      success: false,
      message: "Google authentication failed",
    });
  }
};

// logout controller (UNCHANGED)

export const logOutController = (req, res) => {
  try {
    res.clearCookie("X_TTMS_access_token", {
      httpOnly: true,
      secure: isProduction, // ✅ Fixed: Matches login logic
      sameSite: isProduction ? "none" : "lax", // ✅ Fixed: Matches login logic
    });
    
    res.status(200).send({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Logout failed" });
  }
};
