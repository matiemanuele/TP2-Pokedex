import express from "express";
import {getRandomPokemon,getPokemonFromAPI, getMyPokemon, catchPokemon, releasePokemon} from "../controllers/pokemonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/pokemon/random - Pokémon aleatorio
router.get("/random", getRandomPokemon);

// GET /api/pokemon/api/:id - Pokémon específico de la API
router.get("/api/:id", getPokemonFromAPI);

// ===== RUTAS PRIVADAS (Requieren autenticación) =====
router.use(authMiddleware);

// GET /api/pokemon/my - Mis Pokémon
router.get("/my", getMyPokemon);

// POST /api/pokemon/catch - Capturar Pokémon (sin apodo)
router.post("/catch", catchPokemon);

// DELETE /api/pokemon/:id - Liberar Pokémon
router.delete("/:id", releasePokemon);

export default router;