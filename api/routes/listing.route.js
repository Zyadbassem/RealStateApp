import express from "express";
import {
  createListing,
  uploadMultibleMiddleware,
} from "../controllers/listing.controller.js";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.json({ test: true });
});
router.post("/add", uploadMultibleMiddleware, createListing);
export default router;
