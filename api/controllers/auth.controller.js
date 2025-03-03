import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { formCheker } from "../utils/formChecker.js";

export const signup = async (req, res, next) => {
  try {
    // Access the form data and check them
    const { username, email, password } = req.body;
    await formCheker(email, username, password);
    // Hash the password and create the user
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
