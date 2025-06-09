 **Pokédex**

Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB que simula una Pokédex personalizada para cada usuario. Permite registrarse, iniciar sesión, gestionar una lista de Pokémon favoritos y acceder a funcionalidades especiales como entrenar Pokémon y participar en batallas.

**Funcionalidad**

✅ Autenticación y Usuarios

Registro de usuario: creación de cuenta con email y contraseña (hash con bcrypt).

Login: inicio de sesión con JWT.

Protección de rutas: middleware de autenticación usando tokens.

Gestión de Pokémon favoritos

GET/DELETE Pokémon de favoritos.

Listar favoritos del usuario autenticado.


**Funcionalidades estrella**

🏋️ Entrenamiento de Pokémon

Entrena a tus Pokémon para subirles el nivel y mejorar sus estadísticas (por ejemplo, experiencia, fuerza o velocidad). La lógica se aplica de forma acumulativa, y se guarda por usuario.

⚔️ Batalla Pokémon

Enfrenta a tus Pokémon favoritos con los de otro usuario:

Se simula una batalla basada en estadísticas (ataque, defensa, velocidad).

Se determina un ganador y el perdedor se borra el usuario 

Puede registrar un historial de batallas si se desea.



🛠 Tecnologías utilizadas

Node.js

Express

MongoDB + Mongoose

JWT (jsonwebtoken)

Bcrypt

dotenv

PokeAPI (para obtener datos reales de los Pokémon)

**Endpoints principales**

POST /api/users/register - Registrar usuario
POST /api/users/login - Iniciar sesión
GET /api/pokemon/getfavorites - Obtener Pokémon favoritos
POST /api/pokemon/addfavorites - Agregar Pokémon a favoritos
DELETE /api/pokemon/favorites/:id - Eliminar un Pokémon de favoritos
POST /api/pokemon/train/:id - Entrenar un Pokémon
POST /api/pokemon/battle - Iniciar una batalla Pokémon
