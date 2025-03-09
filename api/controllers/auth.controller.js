import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { signupFormCheker, signinFormChecker } from "../utils/formChecker.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    // Access the form data and check them
    const { username, email, password } = req.body;
    await signupFormCheker(email, username, password);
    // Hash the password and create the user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    // Access the form data and check them
    const { username, password: userPassword } = req.body;
    const user = await signinFormChecker(username, userPassword);
    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password, ...userWithoutPassowrd } = user._doc;
    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        message: "Logged in successfully",
        success: true,
        user: userWithoutPassowrd,
      });
  } catch (error) {
    next(error);
  }
};
