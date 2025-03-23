import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
import { handleFileName } from "../utils/handleFileParams.js";
import { validateToken } from "../utils/ValidateToken.js";
import multer from "multer";
import { addImageInSupaBase } from "../utils/supabase.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });
export const uploadMultibleMiddleware = upload.array("images");

export const createListing = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decoded = validateToken(token);
    if (!req.files || req.files.length === 0) {
      errorHandler(404, "no files uploaded");
    }
    let filesUrls = [];
    for (const file of req.files) {
      const filePath = handleFileName(file.originalname);
      const fileUrl = await addImageInSupaBase(
        filePath,
        file.buffer,
        file.mimetype
      );
      const imageObject = { url: fileUrl };
      filesUrls.push(imageObject);
    }
    const { title, price, description, size, type } = req.body;
    if (!title || !price || !description || !size || !type) {
      errorHandler(400, "missig fields");
    }
    const newListing = new Listing({
      owner: decoded.id,
      title,
      price,
      description,
      size,
      type,
      photos: filesUrls,
    });
    await newListing.save();
    return res.status(200).json(newListing);
  } catch (error) {
    next(error);
  }
};
