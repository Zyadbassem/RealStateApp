import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { errorHandler } from "./error.js";
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const updateAvatarInSupaBase = async (
  filePath,
  bufferFile,
  mimetype
) => {
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

export default supabase;
