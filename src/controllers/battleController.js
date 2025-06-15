import { getRandomUserWithPokemon, removePokemonFromUser, saveBattleHistory } from "../services/battleService.js";

export const startBattle = async (req, res) => {
  try {
    // Obtener dos usuarios distintos con al menos un Pokémon cada uno
    const [user1, user2] = await getRandomUserWithPokemon();
    if (!user1 || !user2) {
      return res.status(400).json({ message: "No hay suficientes usuarios con Pokémon para batallar" });
    }

    const pokemon1 = user1.pokemons[0];
    const pokemon2 = user2.pokemons[0];

    const log = [];
    log.push(`Batalla entre ${pokemon1.name} (Usuario ${user1._id}) vs ${pokemon2.name} (Usuario ${user2._id})`);

    // Clonar stats iniciales
    let p1 = { ...pokemon1 };
    let p2 = { ...pokemon2 };

    // Batalla por turnos hasta que uno muere (hp <= 0)
    while (p1.hp > 0 && p2.hp > 0) {
      // p1 ataca a p2
      const damageToP2 = Math.max(p1.attack - p2.defense, 1);
      p2.hp -= damageToP2;
      log.push(`${p1.name} ataca a ${p2.name} y le causa ${damageToP2} de daño (HP restante: ${p2.hp})`);
      if (p2.hp <= 0) break;

      // p2 ataca a p1
      const damageToP1 = Math.max(p2.attack - p1.defense, 1);
      p1.hp -= damageToP1;
      log.push(`${p2.name} ataca a ${p1.name} y le causa ${damageToP1} de daño (HP restante: ${p1.hp})`);
    }

    const winner = p1.hp > 0 ? pokemon1 : pokemon2;
    const loser = p1.hp <= 0 ? { userId: user1._id, pokemon: pokemon1 } : { userId: user2._id, pokemon: pokemon2 };

    await removePokemonFromUser(loser.userId, loser.pokemon._id);
    await saveBattleHistory({
      winner: { userId: winner.ownerId, pokemon: winner },
      loser,
      log,
      date: new Date()
    });

    res.json({ message: `Ganó ${winner.name}`, log });

  } catch (error) {
    console.error("Error al iniciar la batalla:", error);
    res.status(500).json({ message: "Error al iniciar la batalla" });
  }
};
