import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Connect to MongoDB
dotenv.config();
const mongo_url = process.env.MONGO_URL;
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const app = express();
app.listen(3000, () => {
  return console.log("Server is running on http://localhost:3000");
});
