import { getDb } from "../data/connection.js";
import { ObjectId } from "mongodb";

export const getRandomUserWithPokemon = async () => {
  const db = getDb();
  const users = await db
    .collection("users")
    .aggregate([
      { $match: { pokemons: { $exists: true, $not: { $size: 0 } } } },
      { $sample: { size: 2 } },
    ])
    .toArray();

  return users.length === 2 ? users : [null, null];
};

export const removePokemonFromUser = async (userId, pokemonId) => {
  const db = getDb();
  await db
    .collection("users")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { pokemons: { _id: new ObjectId(pokemonId) } } }
    );
};

export const saveBattleHistory = async (battle) => {
  const db = getDb();
  await db.collection("battle_history").insertOne(battle);
};
