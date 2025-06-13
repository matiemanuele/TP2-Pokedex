import express from "express";
import {getRandomPokemon,getPokemonFromAPI, getMyPokemon, catchPokemon, releasePokemon,deletePokemonFromUser,updatePokemonFromUser} from "../controllers/pokemonController.js";
import { authMiddleware,isAdmin} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/random", getRandomPokemon);

router.get("/api/:id", getPokemonFromAPI);

router.use(authMiddleware);

router.get("/my", getMyPokemon);

router.post("/catch", catchPokemon);

router.delete("/my/:id", releasePokemon);

router.delete("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, deletePokemonFromUser);

router.put("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, updatePokemonFromUser);

export default router;