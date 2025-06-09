import {fetchPokemonFromAPI,fetchRandomPokemon} from "../services/pokeAPIService.js";

import {getUserPokemonService,addPokemonToUserService, releasePokemonService} from "../services/pokemonService.js";

// Obtener Pokémon aleatorio de la API
export const getRandomPokemon = async (req, res) => {
  try {
    const pokemon = await fetchRandomPokemon();
    res.json({
      message: "Pokémon aleatorio obtenido",
      pokemon: pokemon
    });
  } catch (error) {
    console.error("Error al obtener Pokémon aleatorio:", error);
    res.status(500).json({ message: "Error al obtener Pokémon aleatorio" });
  }
};

// Obtener Pokémon específico de la API
export const getPokemonFromAPI = async (req, res) => {
  try {
    const { id } = req.params;
    const pokemon = await fetchPokemonFromAPI(id);
    
    res.json({
      message: "Pokémon obtenido de la API",
      pokemon: pokemon
    });
  } catch (error) {
    console.error("Error al obtener Pokémon de API:", error);
    if (error.message.includes("no encontrado")) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Error al obtener Pokémon" });
  }
};

// Obtener mis Pokémon
export const getMyPokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const pokemon = await getUserPokemonService(userId);
    
    res.json({
      message: "Tus Pokémon obtenidos",
      count: pokemon.length,
      pokemon: pokemon
    });
  } catch (error) {
    console.error("Error al obtener Pokémon del usuario:", error);
    res.status(500).json({ message: "Error al obtener tus Pokémon" });
  }
};

// Capturar Pokémon 
export const catchPokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pokemonId } = req.body; // Solo ID, sin apodo
    
    if (!pokemonId) {
      return res.status(400).json({ message: "El ID del Pokémon es requerido" });
    }
    
    // Obtener datos de la API
    const pokemonData = await fetchPokemonFromAPI(pokemonId);
    
    // Agregar a la colección del usuario 
    const result = await addPokemonToUserService(userId, pokemonData);
    
    res.status(201).json({
      message: `¡Has capturado a ${pokemonData.name}!`,
      pokemon: result
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

// Liberar Pokémon
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