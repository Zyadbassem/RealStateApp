import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";

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
// Create Express app
const app = express();
app.use("/api/user", userRouter);

app.listen(3000, () => {
  return console.log("Server is running on http://localhost:3000");
});
