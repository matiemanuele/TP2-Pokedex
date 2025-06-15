import {
  getRandomOpponent,
  getCurrentUserWithPokemon,
  removePokemonFromUser,
  saveBattleHistory,
} from "../data/battleData.js";

export const getBattleOpponentService = async (currentUserId) => {
  const currentUser = await getCurrentUserWithPokemon(currentUserId);
  const opponent = await getRandomOpponent(currentUserId);
  
  return { currentUser, opponent };
};

export const removePokemonFromUserService = async (userId, pokemonId) => {
  return await removePokemonFromUser(userId, pokemonId);
};

export const saveBattleHistoryService = async (battle) => {
  return await saveBattleHistory(battle);
};
