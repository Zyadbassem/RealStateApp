import { errorHandler } from "./error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signupFormCheker = async (email, username, password) => {
  // Check of any of them isn't there
  if (!email || !username || !password) {
    return errorHandler(400, "All fields are required");
  }
  // Check the email
  if (email.length < 8) {
    return errorHandler(400, "Email must be at least 8 characters");
  }
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  if (!emailRegex.test(email)) {
    return errorHandler(400, "Invalid email");
  }
  // Check the username
  const userAlreadyExists = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (userAlreadyExists) {
    return errorHandler(409, "User already exists");
  }
  // Check the username length
  if (username.length < 3) {
    return errorHandler(400, "Username must be at least 3 characters long");
  }
  // Check the passowrd Length
  if (password.length < 8) {
    return errorHandler(400, "Password must be at least 8 characters long");
  }
  // Check the password strength
  const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
  if (!passwordRegex.test(password)) {
    return errorHandler(
      400,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    );
  }
  return true;
};

export const signinFormChecker = async (username, password) => {
  // Check if any of them isn't there
  if (!username || !password) {
    return errorHandler(400, "All fields are required");
  }
  // Check the username
  const user = await User.findOne({ username });
  if (!user) {
    return errorHandler(404, "User not found");
  }
  // Check the password
  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    return errorHandler(401, "Invalid password or username");
  }
  return user;
};
