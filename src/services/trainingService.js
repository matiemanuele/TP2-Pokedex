import {createTrainingSession,findTrainingHistory,findPokemonTrainingHistory,getUserTrainingStats } from "../data/trainingData.js";
import { findUserPokemonById, updatePokemonData } from "../data/pokemonData.js";

export const trainPokemonService = async (userId, pokemonId, trainingType) => {
  try {
    
    const pokemon = await findUserPokemonById(userId, pokemonId);
    if (!pokemon) {
      throw new Error("Pokémon no encontrado en tu colección");
    }

    if (!["attack", "defense"].includes(trainingType)) {
      throw new Error("Tipo de entrenamiento inválido. Usa 'attack' o 'defense'");
    }
    
    // calcular mejoras
    let updates = {};
    let statsImproved = [];
    
    if (trainingType === "attack") {
      updates.attack = pokemon.attack + 5;
      statsImproved.push({
        stat: "attack",
        oldValue: pokemon.attack,
        newValue: updates.attack,
        improvement: 5
      });
    } else if (trainingType === "defense") {
      updates.defense = pokemon.defense + 5;
      statsImproved.push({
        stat: "defense",
        oldValue: pokemon.defense,
        newValue: updates.defense,
        improvement: 5
      });
    }
    
    // verificar si sube de nivel (cada 3 entrenamientos)
    const trainingHistory = await findPokemonTrainingHistory(userId, pokemonId);
    const totalTrainings = trainingHistory.length + 1; 
    
    let leveledUp = false;
    if (totalTrainings % 3 === 0 && pokemon.level < 100) {
      updates.level = pokemon.level + 1;
      updates.hp = pokemon.hp + 5;
      leveledUp = true;
      
      statsImproved.push({
        stat: "level",
        oldValue: pokemon.level,
        newValue: updates.level,
        improvement: 1
      });
      
      statsImproved.push({
        stat: "hp",
        oldValue: pokemon.hp,
        newValue: updates.hp,
        improvement: 5
      });
    }
    
    await updatePokemonData(userId, pokemonId, updates);
    
    //registro de entrenamiento
    const trainingSession = {
      userId: userId,
      pokemonId: pokemonId,
      pokemonName: pokemon.name,
      trainingType: trainingType,
      statsImproved: statsImproved,
      leveledUp: leveledUp,
      oldLevel: pokemon.level,
      newLevel: updates.level || pokemon.level
    };
    
    await createTrainingSession(trainingSession);
    
    //  respuesta
    let message = `${pokemon.name} completó el entrenamiento de ${trainingType}`;
    let improvements = [];
    
    statsImproved.forEach(stat => {
      if (stat.stat === "level") {
        improvements.push(`¡Subió al nivel ${stat.newValue}!`);
      } else {
        improvements.push(`${stat.stat.charAt(0).toUpperCase() + stat.stat.slice(1)}: ${stat.oldValue} → ${stat.newValue}`);
      }
    });
    
    return {
      pokemon: { ...pokemon, ...updates },
      training: {
        type: trainingType,
        statsImproved: statsImproved,
        leveledUp: leveledUp,
        improvements: improvements
      },
      message: message,
      sessionId: trainingSession._id
    };
  } catch (error) {
    console.error("Error en trainPokemonService:", error);
    throw error;
  }
};

export const getTrainingHistoryService = async (userId, pokemonId = null, limit = 20) => {
  try {
    let history;
    
    if (pokemonId) {
      history = await findPokemonTrainingHistory(userId, pokemonId, limit);
    } else {
      history = await findTrainingHistory(userId, limit);
    }
    
    return history;
  } catch (error) {
    console.error("Error en getTrainingHistoryService:", error);
    throw new Error("Error al obtener historial de entrenamiento");
  }
};

export const getTrainingStatsService = async (userId) => {
  try {
    const stats = await getUserTrainingStats(userId);
    const totalSessions = stats.reduce((sum, stat) => sum + stat.totalSessions, 0);
    const trainingStats = {
      totalSessions: totalSessions,
      byType: {},
      mostUsedType: null,
      lastActivity: null
    };
    
    stats.forEach(stat => {
      trainingStats.byType[stat._id] = {
        sessions: stat.totalSessions,
        lastSession: stat.lastSession
      };
      
      if (!trainingStats.mostUsedType || 
          stat.totalSessions > trainingStats.byType[trainingStats.mostUsedType].sessions) {
        trainingStats.mostUsedType = stat._id;
      }
      
      if (!trainingStats.lastActivity || 
          stat.lastSession > trainingStats.lastActivity) {
        trainingStats.lastActivity = stat.lastSession;
      }
    });
    
    return trainingStats;
  } catch (error) {
    console.error("Error en getTrainingStatsService:", error);
    throw new Error("Error al obtener estadísticas de entrenamiento");
  }
};

export const getTrainingTypesService = () => {
  return [
    {
      name: "attack",
      display: "Entrenamiento de Ataque",
      description: "Mejora el ataque de tu Pokémon (+5 puntos)",
      icon: "⚔️"
    },
    {
      name: "defense",
      display: "Entrenamiento de Defensa", 
      description: "Mejora la defensa de tu Pokémon (+5 puntos)",
      icon: "🛡️"
    }
  ];
};