import { 
  getBattleOpponentService,
  removePokemonFromUserService,
  saveBattleHistoryService 
} from "../services/battleService.js";

export const startBattle = async (req, res) => {
  try {
    const currentUserId = req.user._id; 
    
    const { currentUser, opponent } = await getBattleOpponentService(currentUserId);
    
    if (!currentUser) {
      return res.status(400).json({ message: "No tienes Pokémon para batallar" });
    }
    
    if (!opponent) {
      return res.status(400).json({ message: "No hay oponentes disponibles" });
    }

    const myPokemon = { ...currentUser.pokemons[0], currentHp: currentUser.pokemons[0].hp };
    const enemyPokemon = { ...opponent.pokemons[0], currentHp: opponent.pokemons[0].hp };
    
    const fullLog = []; 
    
    fullLog.push(`${myPokemon.name} inicia con HP:${myPokemon.hp} ATK:${myPokemon.attack} DEF:${myPokemon.defense}`);
    fullLog.push(`${enemyPokemon.name} inicia con HP:${enemyPokemon.hp} ATK:${enemyPokemon.attack} DEF:${enemyPokemon.defense}`);
    
    let turn = 1;

    // Batalla
    while (myPokemon.currentHp > 0 && enemyPokemon.currentHp > 0) {

      const myDamage = Math.max(myPokemon.attack - enemyPokemon.defense, 1);
      enemyPokemon.currentHp = Math.max(enemyPokemon.currentHp - myDamage, 0);
      fullLog.push(`${myPokemon.name} ataco a ${enemyPokemon.name} con ${myDamage} de daño (DEF:${enemyPokemon.defense}) ${enemyPokemon.name} HP:${enemyPokemon.currentHp}`);
      
      if (enemyPokemon.currentHp <= 0) {
        fullLog.push(`${enemyPokemon.name} fue derrotado`);
        break;
      }
      
      const enemyDamage = Math.max(enemyPokemon.attack - myPokemon.defense, 1);
      myPokemon.currentHp = Math.max(myPokemon.currentHp - enemyDamage, 0);
      fullLog.push(`${enemyPokemon.name} ataco a ${myPokemon.name} con ${enemyDamage} de daño (DEF:${myPokemon.defense}) ${myPokemon.name} HP:${myPokemon.currentHp}`);
      
      if (myPokemon.currentHp <= 0) {
        fullLog.push(`${myPokemon.name} fue derrotado`);
        break;
      }

      turn++;
    }

    const iWon = myPokemon.currentHp > 0;
    const winner = iWon ? currentUser : opponent;
    const loser = iWon ? opponent : currentUser;
    const winnerPokemon = iWon ? myPokemon : enemyPokemon;
    const loserPokemon = iWon ? enemyPokemon : myPokemon;


    const lastEvents = fullLog.slice(-10);

    await removePokemonFromUserService(loser._id, loserPokemon._id);
    
    await saveBattleHistoryService({
      currentUserId,
      winner: { user: winner, pokemon: winnerPokemon },
      loser: { user: loser, pokemon: loserPokemon },
      log: fullLog, 
      date: new Date()
    });

    res.json({
      message: iWon ? "¡Ganaste!" : "Perdiste...",
      result: {
        victory: iWon,
        yourPokemon: myPokemon.name,
        opponentPokemon: enemyPokemon.name,
        opponent: opponent.username,
        summary: iWon ? 
          `Tu ${myPokemon.name} derrotó a ${enemyPokemon.name} de ${opponent.username}` :
          `Tu ${myPokemon.name} fue derrotado por ${enemyPokemon.name} de ${opponent.username}`,
        initialStats: {
          yourPokemon: {
            name: myPokemon.name,
            hp: currentUser.pokemons[0].hp,
            attack: myPokemon.attack,
            defense: myPokemon.defense
          },
          opponentPokemon: {
            name: enemyPokemon.name,
            hp: opponent.pokemons[0].hp,
            attack: enemyPokemon.attack,
            defense: enemyPokemon.defense
          }
        },
        lastEvents
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error en batalla", error: error.message });
  }
};