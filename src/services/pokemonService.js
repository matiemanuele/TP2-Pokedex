import {
  findUserPokemon,
  addPokemonToUserData,
  removePokemonFromUser,
  findUserPokemonById,
  updatePokemonData,
} from "../data/pokemonData.js";

const calculateStat = (baseStat, level) => {
  return Math.floor(baseStat + level * 2);
};

export const getUserPokemonService = async (userId) => {
  try {
    const pokemon = await findUserPokemon(userId);
    return pokemon;
  } catch (error) {
    console.error("Error en getUserPokemonService:", error);
    throw new Error("Error al obtener Pokémon del usuario");
  }
};

// agrega Pokémon al usuario
export const addPokemonToUserService = async (userId, pokemonData) => {
  try {
    const existingPokemon = await findUserPokemon(userId);
    const alreadyHas = existingPokemon.some(
      (p) => p.apiId === pokemonData.apiId
    );

    if (alreadyHas) {
      throw new Error(`Ya tienes a ${pokemonData.name} en tu colección`);
    }
    const newPokemon = {
      userId,
      apiId: pokemonData.apiId,
      name: pokemonData.name,
      level: 1,
      attack: calculateStat(pokemonData.attack, 1),
      defense: calculateStat(pokemonData.defense, 1),
      hp: calculateStat(pokemonData.hp, 1),
      types: pokemonData.types,
      capturedAt: new Date(),
    };

    const result = await addPokemonToUserData(newPokemon);
    return { ...newPokemon, _id: result.insertedId };
  } catch (error) {
    console.error("Error en addPokemonToUserService:", error);
    throw error;
  }
};

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

export const removePokemonFromUserService = async (userId, pokemonId) => {
  try {
    return await removePokemonFromUser(userId, pokemonId);
  } catch {
    console.error("Error en borrar Pokemon", error);
    throw new Error("Error al eliminar Pokémon");
  }
};

export const updatePokemonForUserService = async (
  userId,
  pokemonId,
  updateData
) => {
  try {
    return await updatePokemonData(userId, pokemonId, updateData);
  } catch {
    console.error("Error en actualizar Pokemon del usuario", error);
    throw new Error("Error en actualizar Pokemon del usuario");
  }
};
