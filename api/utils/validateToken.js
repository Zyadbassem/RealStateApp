import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const validateToken = (token) => {
  if (!token) {
    return errorHandler(401, "Unauthorized");
  }
  const tokenIsValid = jwt.verify(token, process.env.JWT_SECRET);
  if (!tokenIsValid) return errorHandler(401, "Unauthorized");
  return tokenIsValid;
};
