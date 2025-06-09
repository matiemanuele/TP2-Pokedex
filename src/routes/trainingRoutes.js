import express from "express";
import {getTrainingTypes,trainPokemon,getTrainingHistory,getTrainingStats} from "../controllers/trainingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET /api/training/types - Obtener tipos de entrenamiento disponibles
router.get("/types", getTrainingTypes);

router.use(authMiddleware);

// POST /api/training/train - Entrenar un Pokémon
router.post("/train", trainPokemon);

// GET /api/training/history - Obtener historial de entrenamiento
// GET /api/training/history?pokemonId=xxx - Historial de un Pokémon específico
router.get("/history", getTrainingHistory);

// GET /api/training/stats - Obtener estadísticas de entrenamiento
router.get("/stats", getTrainingStats);

export default router;