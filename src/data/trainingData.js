import { ObjectId } from "mongodb";
import { getDb } from "./connection.js";

const COLLECTION_NAME = "training_sessions";

export const createTrainingSession = async (trainingData) => {
  try {
    const db = getDb();
    
    const session = {
      ...trainingData,
      userId: new ObjectId(trainingData.userId),
      pokemonId: new ObjectId(trainingData.pokemonId),
      createdAt: new Date()
    };
    
    const result = await db.collection(COLLECTION_NAME).insertOne(session);
    return result;
  } catch (error) {
    console.error("Error al crear sesión de entrenamiento:", error);
    throw new Error("Error al guardar sesión de entrenamiento");
  }
};

export const findTrainingHistory = async (userId, limit = 20) => {
  try {
    const db = getDb();
    
    const history = await db.collection(COLLECTION_NAME)
      .find({ userId: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return history;
  } catch (error) {
    console.error("Error al obtener historial de entrenamiento:", error);
    throw new Error("Error al buscar historial de entrenamiento");
  }
};

export const findPokemonTrainingHistory = async (userId, pokemonId, limit = 10) => {
  try {
    const db = getDb();
    
    if (!ObjectId.isValid(pokemonId)) {
      throw new Error("ID de Pokémon inválido");
    }
    
    const history = await db.collection(COLLECTION_NAME)
      .find({ 
        userId: new ObjectId(userId),
        pokemonId: new ObjectId(pokemonId)
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
    
    return history;
  } catch (error) {
    console.error("Error al obtener historial de Pokémon:", error);
    throw new Error("Error al buscar historial del Pokémon");
  }
};

export const getUserTrainingStats = async (userId) => {
  try {
    const db = getDb();
    
    const pipeline = [
      { $match: { userId: new ObjectId(userId) } },
      {
        $group: {
          _id: "$trainingType",
          totalSessions: { $sum: 1 },
          lastSession: { $max: "$createdAt" }
        }
      },
      { $sort: { totalSessions: -1 } }
    ];
    
    const stats = await db.collection(COLLECTION_NAME).aggregate(pipeline).toArray();
    return stats;
  } catch (error) {
    console.error("Error al obtener estadísticas de entrenamiento:", error);
    throw new Error("Error al calcular estadísticas de entrenamiento");
  }
};