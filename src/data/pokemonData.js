import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

const COLLECTION_NAME = "user_pokemon";

export const findUserPokemon = async (userId) => {
  try {
    const db = getDb();
    
    const pokemon = await db.collection(COLLECTION_NAME)
      .find({ userId: new ObjectId(userId) })
      .sort({ capturedAt: -1 })
      .toArray();
    
    return pokemon;
  } catch (error) {
    console.error("Error al buscar Pokémon del usuario:", error);
    throw new Error("Error al buscar Pokémon en la base de datos");
  }
};

export const findUserPokemonById = async (userId, pokemonId) => {
  try {
    const db = getDb();
    
    if (!ObjectId.isValid(pokemonId)) {
      throw new Error("ID de Pokémon inválido");
    }
    
    const pokemon = await db.collection(COLLECTION_NAME).findOne({
      _id: new ObjectId(pokemonId),
      userId: new ObjectId(userId)
    });
    
    return pokemon;
  } catch (error) {
    console.error("Error al buscar Pokémon por ID:", error);
    throw new Error("Error al buscar Pokémon específico");
  }
};

export const addPokemonToUserData = async (pokemonData) => {
  try {
    const db = getDb();
    
    const pokemonToInsert = {
      ...pokemonData,
      userId: new ObjectId(pokemonData.userId)
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(pokemonToInsert);
    return result;
  } catch (error) {
    console.error("Error al agregar Pokémon al usuario:", error);
    throw new Error("Error al guardar Pokémon en la base de datos");
  }
};

export const updatePokemonData = async (userId, pokemonId, updates) => {
  
  try {
    const db = getDb();
    
    if (!ObjectId.isValid(pokemonId)) {
      throw new Error("ID de Pokémon inválido");
    }
    
    const result = await db.collection(COLLECTION_NAME).updateOne(
      { 
        _id: new ObjectId(pokemonId),
        userId: new ObjectId(userId)
      },
      { 
        $set: {
          ...updates,
          updatedAt: new Date()
        }
      }
    );
    
    return result;
  } catch (error) {
    console.error("Error al actualizar Pokémon:", error);
    throw new Error("Error al actualizar Pokémon en la base de datos");
  }
};

export const removePokemonFromUser = async (userId, pokemonId) => {
  try {
    const db = getDb();
    if (!ObjectId.isValid(pokemonId)) {
      throw new Error("ID de Pokémon inválido");
    }  
    const result = await db.collection(COLLECTION_NAME).deleteOne({
      _id: new ObjectId(pokemonId),
      userId: new ObjectId(userId)
    });
    
    return result;
  } catch (error) {
    console.error("Error al eliminar Pokémon:", error);
    throw new Error("Error al eliminar Pokémon de la base de datos");
  }
};

