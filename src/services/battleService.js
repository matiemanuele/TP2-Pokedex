import {
  getRandomUserWithPokemon,
  removePokemonFromUser,
  saveBattleHistory,
} from "../data/battleData.js";

export const getRandomUserWithPokemonService = async () => {
  return await getRandomUserWithPokemon();
};

export const removePokemonFromUserService = async (userId, pokemonId) => {
  return await removePokemonFromUser(userId, pokemonId);
};

export const saveBattleHistoryService = async (battle) => {
  return await saveBattleHistory(battle);
};
