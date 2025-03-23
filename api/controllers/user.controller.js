import { userUpdater } from "../utils/userUpdater.js";
import User from "../models/user.model.js";
import { validateToken } from "../utils/ValidateToken.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import {
  deleteAvatarInSupaBase,
  updateAvatarInSupaBase,
} from "../utils/supabase.js";
import { errorHandler } from "../utils/error.js";

export const update = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = validateToken(token);
    await userUpdater(decoded.id, req.body.form);
    const user = await User.findOne({ _id: decoded.id });
    const { password, ...userWithoutPassword } = user._doc;
    return res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMiddleware = upload.single("avatar");
export const updateAvatar = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = validateToken(token);
    if (!req.file) {
      errorHandler("no file uploaded");
    }
    const userBeforeUpdating = await User.findById(decoded.id);
    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    if (
      userBeforeUpdating.avatar !==
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    ) {
      await deleteAvatarInSupaBase(userBeforeUpdating.avatar);
    }
    const avatarUrl = await updateAvatarInSupaBase(
      filePath,
      req.file.buffer,
      req.file.mimetype
    );
    await User.findByIdAndUpdate(decoded.id, { avatar: avatarUrl });
    const user = await User.findById(decoded.id);
    const { password, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      message: "Avatar updated successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const decoded = validateToken(req.cookies.token);
    const user = await User.findById(decoded.id);
    if (
      user.avatar !==
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    ) {
      await deleteAvatarInSupaBase(user.avatar);
    }
    await User.findByIdAndDelete(decoded.id);
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: "deleted user successfully" });
  } catch (error) {
    next(error);
  }
};
