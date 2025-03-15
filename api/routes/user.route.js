import express from "express";
import { update } from "../controllers/user.controller.js";
const router = express.Router();

router.put("/update", update);

export default router;
