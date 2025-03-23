import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { errorHandler } from "./error.js";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const addImageInSupaBase = async (filePath, bufferFile, mimetype) => {
  try {
    /** Save the image */
    const { data, error } = await supabase.storage
      .from("mern-estate")
      .upload(filePath, bufferFile, { contentType: mimetype });
    if (error) {
      throw error;
    }

    /** Get the url */
    const { data: urlData } = supabase.storage
      .from("mern-estate")
      .getPublicUrl(filePath);
    const url = urlData.publicUrl;
    return url;
  } catch (error) {
    errorHandler();
  }
};

export const deleteAvatarInSupaBase = async (fileLink) => {
  try {
    // create a url so i can extract the file path
    const urlParts = new URL(fileLink);
    const filePath = urlParts.pathname.split(
      "/storage/v1/object/public/mern-estate/"
    )[1];
    if (!filePath) {
      errorHandler(404, "previous file not fount");
    }
    const { error } = await supabase.storage
      .from("mern-estate")
      .remove(filePath);
    if (error) throw error;
  } catch (error) {
    errorHandler(error.statusCode, error.message);
  }
};
export default supabase;
