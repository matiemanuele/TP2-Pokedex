import {
  fetchPokemonFromAPI,
  fetchRandomPokemon,
} from "../services/pokeAPIService.js";

import {
  getUserPokemonService,
  addPokemonToUserService,
  releasePokemonService,
  removePokemonFromUserService,
  updatePokemonForUserService,
} from "../services/pokemonService.js";

export const getRandomPokemon = async (req, res) => {
  try {
    const pokemon = await fetchRandomPokemon();
    res.json({
      message: "Pokémon aleatorio obtenido",
      pokemon: pokemon,
    });
  } catch (error) {
    console.error("Error al obtener Pokémon aleatorio:", error);
    res.status(500).json({ message: "Error al obtener Pokémon aleatorio" });
  }
};

export const getPokemonFromAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await fetchPokemonFromAPI(id);

    res.json({
      message: "Pokémon obtenido de la API",
      pokemon: pokemon,
    });
  } catch (error) {
    console.error("Error al obtener Pokémon de API:", error);
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al obtener Pokémon" });
  }
};

export const getMyPokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const pokemon = await getUserPokemonService(userId);

    res.json({
      message: "Tus Pokémon obtenidos",
      count: pokemon.length,
      pokemon: pokemon,
    });
  } catch (error) {
    console.error("Error al obtener Pokémon del usuario:", error);
    res.status(500).json({ message: "Error al obtener tus Pokémon" });
  }
};

export const catchPokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pokemonId } = req.body;

    if (!pokemonId) {
      return res
        .status(400)
        .json({ message: "El ID del Pokémon es requerido" });
    }
    //No token
    const pokemonData = await fetchPokemonFromAPI(pokemonId);
    const result = await addPokemonToUserService(userId, pokemonData);
    res.status(201).json({
      message: `¡Has capturado a ${pokemonData.name}!`,
      pokemon: result,
    });
  } catch (error) {
    console.error("Error al capturar Pokémon:", error);
    if (error.message.includes("ya tienes")) {
      return res.status(409).json({ message: error.message });
    }
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al capturar Pokémon" });
  }
};

export const releasePokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const result = await releasePokemonService(userId, id);

    if (!result) {
      return res.status(404).json({ message: "Pokémon no encontrado" });
    }

    res.json({ message: "Pokémon liberado exitosamente" });
  } catch (error) {
    console.error("Error al liberar Pokémon:", error);
    res.status(500).json({ message: "Error al liberar Pokémon" });
  }
};

export const deletePokemonFromUser = async (req, res) => {
  const { userId, pokeId } = req.params;

  try {
    const result = await removePokemonFromUserService(userId, pokeId);
    res.json({ message: "Pokémon eliminado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando Pokémon" });
  }
};

export const updatePokemonFromUser = async (req, res) => {
  const { userId, pokeId } = req.params;
  const updateData = req.body;
  try {
    const result = await updatePokemonForUserService(
      userId,
      pokeId,
      updateData
    );
    res.json({ message: "Pokémon actualizado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando Pokémon" });
  }
};
