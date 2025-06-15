import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { startBattle } from "../controllers/battleController.js";

const router = express.Router();
router.post("/", authMiddleware, startBattle);
export default router;