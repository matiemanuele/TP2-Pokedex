const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonFromAPI = async (identifier) => {

  try {
    console.log(`🔍 Obteniendo Pokémon: ${identifier}`);
    
    const pokemonIdentifier = String(identifier).toLowerCase();
    const url = `${POKEAPI_BASE_URL}/pokemon/${pokemonIdentifier}`;
    console.log(`🌐 URL: ${url}`);
    const response = await fetch(url);
    console.log(`📡 Response status: ${response.status}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokémon "${identifier}" no encontrado`);
      }
      throw new Error(`Error de API: ${response.status}`);
    } 
    const pokemon = await response.json();
    console.log(`✅ Pokémon obtenido: ${pokemon.name}`);
    return formatPokemonData(pokemon);
  } catch (error) {
    console.error("❌ Error al obtener Pokémon de la API:", error);
    throw error;
  }
};

// Obtener Pokémon aleatorio
export const fetchRandomPokemon = async () => {
  try {
    console.log("🎲 Generando Pokémon aleatorio...");
    const randomId = Math.floor(Math.random() * 151) + 1;
    console.log(`🎯 ID aleatorio generado: ${randomId}`);
    return await fetchPokemonFromAPI(randomId);
  } catch (error) {
    console.error("❌ Error al obtener Pokémon aleatorio:", error);
    throw error;
  }
};

// Formatear datos del Pokemon 
const formatPokemonData = (apiPokemon) => {
  try {

    console.log(`🔧 Formateando datos de: ${apiPokemon.name}`);
    const stats = {};
    apiPokemon.stats.forEach(stat => {
      const statName = mapStatName(stat.stat.name);
      stats[statName] = stat.base_stat;
    });
    const formattedData = {
      apiId: apiPokemon.id,
      name: apiPokemon.name,
      hp: stats.hp,
       attack: stats.attack,
        defense: stats.defense,
      types: apiPokemon.types.map(type => type.type.name),
    //  sprites: {
    //  front_default: apiPokemon.sprites.front_default,
    //  official_artwork: apiPokemon.sprites.other?.["official-artwork"]?.front_default
    //  }
    };  
    console.log(`✅ Datos formateados correctamente`);
    return formattedData;
  } catch (error) {
    console.error("❌ Error al formatear datos:", error);
    throw error;
  }
};

const mapStatName = (apiStatName) => {
  const statMap = {
    "hp": "hp",
    "attack": "attack", 
    "defense": "defense"
  };
  
  return statMap[apiStatName] || apiStatName;
};