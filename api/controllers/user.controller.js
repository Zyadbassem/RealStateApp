import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { userUpdater } from "../utils/userUpdater.js";
import User from "../models/user.model.js";

export const update = async (req, res, next) => {
  try {
    /** Validate the token */
    const token = req.cookies.token;
    if (!token) errorHandler(401, "Unauthorized");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      errorHandler(403, "Invalid Token");
    }
    console.log(decoded);
    await userUpdater(decoded.id, req.body.formData);
    const user = await User.findOne({ _id: decoded.id });
    const { password, ...userWithoutPassword } = user._doc;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};
