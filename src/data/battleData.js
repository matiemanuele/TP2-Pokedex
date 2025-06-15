import { getDb } from "../data/connection.js";
import { ObjectId } from "mongodb";

// Obtener un usuario aleatorio que tenga Pokémon (excluyendo al usuario actual)
export const getRandomOpponent = async (currentUserId) => {
  const db = getDb();
  
  const opponents = await db.collection("users").aggregate([
    {
      $lookup: {
        from: "user_pokemon",
        localField: "_id",
        foreignField: "userId",
        as: "pokemons"
      }
    },
    { $match: { 
      "pokemons.0": { $exists: true },
      "_id": { $ne: new ObjectId(currentUserId) } // Excluir usuario actual
    }},
    { $sample: { size: 1 } }
  ]).toArray();

  return opponents.length > 0 ? opponents[0] : null;
};

// Obtener datos del usuario actual con sus Pokémon
export const getCurrentUserWithPokemon = async (userId) => {
  const db = getDb();
  
  const user = await db.collection("users").aggregate([
    { $match: { "_id": new ObjectId(userId) }},
    {
      $lookup: {
        from: "user_pokemon",
        localField: "_id",
        foreignField: "userId",
        as: "pokemons"
      }
    }
  ]).toArray();

  return user.length > 0 && user[0].pokemons.length > 0 ? user[0] : null;
};

export const removePokemonFromUser = async (userId, pokemonId) => {
  const db = getDb();
  await db.collection("user_pokemon").deleteOne({
    _id: new ObjectId(pokemonId),
    userId: new ObjectId(userId)
  });
};

export const saveBattleHistory = async (battle) => {
  const db = getDb();
  await db.collection("battle_history").insertOne({
    ...battle,
    timestamp: new Date()
  });
};
