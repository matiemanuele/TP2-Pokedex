import express from "express";
import {getRandomPokemon,getPokemonFromAPI, getMyPokemon, catchPokemon, releasePokemon} from "../controllers/pokemonController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/random", getRandomPokemon);

router.get("/api/:id", getPokemonFromAPI);

router.use(authMiddleware);

router.get("/my", getMyPokemon);

router.post("/catch", catchPokemon);

router.delete("/my/:id", releasePokemon);

export default router;