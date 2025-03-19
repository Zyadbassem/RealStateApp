import express from "express";
import {
  update,
  updateAvatar,
  uploadMiddleware,
} from "../controllers/user.controller.js";
const router = express.Router();

router.put("/update", update);
router.put("/update-avatar", uploadMiddleware, updateAvatar);

export default router;
