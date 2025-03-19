import express from "express";
import {
  update,
  updateAvatar,
  uploadMiddleware,
  logout,
  deleteUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.put("/update", update);
router.put("/update-avatar", uploadMiddleware, updateAvatar);
router.post("/logout", logout);
router.delete("/delete", deleteUser);

export default router;
