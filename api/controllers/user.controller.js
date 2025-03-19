import { userUpdater } from "../utils/userUpdater.js";
import User from "../models/user.model.js";
import { validateToken } from "../utils/ValidateToken.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import supabase from "../utils/supabase.js";
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
    console.log("Request received");
    console.log("File:", req.file);
    const fileExt = req.file.originalname.split(".").pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { data, error } = await supabase.storage
      .from("mern-estate")
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
      });

    if (error) {
      throw error;
    }
    const { data: urlData } = supabase.storage
      .from("mern-estate")
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;
    await User.findByIdAndUpdate(decoded.id, { avatar: avatarUrl });

    // 6. Fetch updated user and return response
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
