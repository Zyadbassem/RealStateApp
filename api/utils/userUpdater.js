import { errorHandler } from "./error.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const userUpdater = async (userId, formData) => {
  // Get the user
  const user = await User.findOne({ _id: userId });
  if (!user) return errorHandler(403, "Invalid token0");

  if (
    user.email === formData.email &&
    user.username === formData.username &&
    !formData.password
  ) {
    return errorHandler(404, "nothing to change");
  }

  // validate the email and update it
  if (formData.email) {
    const emailRegex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email))
      return errorHandler(400, "please enter a valid email");

    if (formData.email !== user.email) {
      const emailExists = await User.findOne({ email: formData.email });
      if (!emailExists) {
        user.email = formData.email;
      } else {
        return errorHandler(409, "this email/username has an existing account");
      }
    }
  }

  // validate the username and update it
  if (formData.username) {
    if (formData.username.length < 3)
      return errorHandler(400, "please enter a valid username");
    if (formData.username !== user.username) {
      const usernameExists = await User.findOne({
        username: formData.username,
      });
      if (!usernameExists) {
        user.username = formData.username;
      } else {
        return errorHandler(409, "this email/username has an existing account");
      }
    }
  }

  // validate password and update it
  if (formData.password) {
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])");
    if (
      !passwordRegex.test(formData.password) ||
      formData.password.length < 8
    ) {
      return errorHandler(
        400,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }
    const hashedPassword = bcrypt.hashSync(formData.password, 10);
    user.password = hashedPassword;
  }
  await user.save();
};
