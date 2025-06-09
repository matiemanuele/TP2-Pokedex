import {trainPokemonService,getTrainingHistoryService,getTrainingStatsService,getTrainingTypesService} from "../services/trainingService.js";

// Obtener tipos de entrenamiento disponibles
export const getTrainingTypes = async (req, res) => {
  try {
    const trainingTypes = getTrainingTypesService();
    res.json({
      message: "Tipos de entrenamiento disponibles",
      trainingTypes: trainingTypes
    });
  } catch (error) {
    console.error("Error al obtener tipos de entrenamiento:", error);
    res.status(500).json({
      message: "Error al obtener tipos de entrenamiento"
    });
  }
};

// Entrenar un Pokémon
export const trainPokemon = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pokemonId, trainingType } = req.body;
    
    // Validaciones
    if (!pokemonId) {
      return res.status(400).json({
        message: "El ID del Pokémon es requerido"
      });
    }
    
    if (!trainingType) {
      return res.status(400).json({
        message: "El tipo de entrenamiento es requerido"
      });
    }
    
    if (!["attack", "defense"].includes(trainingType)) {
      return res.status(400).json({
        message: "Tipo de entrenamiento inválido. Usa 'attack' o 'defense'"
      });
    }
    
    const result = await trainPokemonService(userId, pokemonId, trainingType);
    
    res.status(201).json({
      message: "¡Entrenamiento completado!",
      result: result
    });
  } catch (error) {
    console.error("Error al entrenar Pokémon:", error);
    
    if (error.message.includes("no encontrado") || 
        error.message.includes("inválido")) {
      return res.status(400).json({
        message: error.message
      });
    }
    
    res.status(500).json({
      message: "Error al procesar entrenamiento"
    });
  }
};

// Obtener historial de entrenamiento
export const getTrainingHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const { pokemonId } = req.query;
    const { limit = 20 } = req.query;
    
    const history = await getTrainingHistoryService(
      userId, 
      pokemonId || null, 
      parseInt(limit)
    );
    
    res.json({
      message: pokemonId ? 
        "Historial de entrenamiento del Pokémon" : 
        "Tu historial de entrenamiento",
      count: history.length,
      history: history
    });
  } catch (error) {
    console.error("Error al obtener historial:", error);
    res.status(500).json({
      message: "Error al obtener historial de entrenamiento"
    });
  }
};

// Obtener estadísticas de entrenamiento
export const getTrainingStats = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const stats = await getTrainingStatsService(userId);
    
    res.json({
      message: "Estadísticas de entrenamiento obtenidas",
      stats: stats
    });
  } catch (error) {
    console.error("Error al obtener estadísticas:", error);
    res.status(500).json({
      message: "Error al obtener estadísticas de entrenamiento"
    });
  }
};