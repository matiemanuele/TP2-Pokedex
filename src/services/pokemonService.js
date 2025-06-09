import {findUserPokemon,addPokemonToUserData,updatePokemonData,removePokemonFromUser,findUserPokemonById} from "../data/pokemonData.js";

// Función local simple para calcular stats
const calculateStat = (baseStat, level) => {
  return Math.floor(baseStat + (level * 2));
};

// Obtener todos los Pokémon del usuario
export const getUserPokemonService = async (userId) => {
  try {
    const pokemon = await findUserPokemon(userId);
    return pokemon;
  } catch (error) {
    console.error("Error en getUserPokemonService:", error);
    throw new Error("Error al obtener Pokémon del usuario");
  }
};

// Agregar un nuevo Pokémon al usuario (SIN APODO)
export const addPokemonToUserService = async (userId, pokemonData) => {
  try {
    // Verificar si ya tiene este Pokémon
    const existingPokemon = await findUserPokemon(userId);
    const alreadyHas = existingPokemon.some(p => p.apiId === pokemonData.apiId);
    
    if (alreadyHas) {
      throw new Error(`Ya tienes a ${pokemonData.name} en tu colección`);
    }
    
    // Crear Pokémon simplificado 
    const newPokemon = {
      userId,
      apiId: pokemonData.apiId,
      name: pokemonData.name, 
      level: 1,
      attack: calculateStat(pokemonData.baseStats.attack, 1),
      defense: calculateStat(pokemonData.baseStats.defense, 1),
      hp: calculateStat(pokemonData.baseStats.hp, 1),
      types: pokemonData.types,
      sprite: pokemonData.sprites.front_default,
      capturedAt: new Date()
    };
    
    const result = await addPokemonToUserData(newPokemon);
    return { ...newPokemon, _id: result.insertedId };
  } catch (error) {
    console.error("Error en addPokemonToUserService:", error);
    throw error;
  }
};

// Obtener detalles de un Pokémon específico
export const getUserPokemonDetailsService = async (userId, pokemonId) => {
  try {
    const pokemon = await findUserPokemonById(userId, pokemonId);
    return pokemon;
  } catch (error) {
    console.error("Error en getUserPokemonDetailsService:", error);
    throw new Error("Error al obtener detalles del Pokémon");
  }
};

// Liberar Pokémon
export const releasePokemonService = async (userId, pokemonId) => {
  try {
    const result = await removePokemonFromUser(userId, pokemonId);
    return result.deletedCount > 0;
  } catch (error) {
    console.error("Error en releasePokemonService:", error);
    throw new Error("Error al liberar Pokémon");
  }
};