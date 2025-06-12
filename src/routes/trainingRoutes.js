import express from "express";
import {getTrainingTypes,trainPokemon,getTrainingHistory,getTrainingStats} from "../controllers/trainingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/types", getTrainingTypes);
router.use(authMiddleware);
router.post("/train", trainPokemon);
router.get("/history", getTrainingHistory);
router.get("/stats", getTrainingStats);

export default router;