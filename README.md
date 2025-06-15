Pokédex API - Proyecto Backend

Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB que simula una Pokédex personalizada. Permite a los usuarios registrarse, iniciar sesión, capturar y entrenar Pokémon, gestionar sus favoritos, y participar en batallas.

###Funcionalidad general###

-Autenticación y gestión de usuarios

-Registro con email y contraseña encriptada.

-Inicio de sesión con generación de token JWT.

-Middleware de autenticación para proteger rutas privadas.

-Captura de Pokémon

-Permite capturar un Pokémon real desde la PokeAPI utilizando su ID.

-Verifica si el Pokémon ya está capturado.

-Guarda la información en la colección del usuario.

-Entrenamiento de Pokémon  (Defensa-Fuerza, suben 5 hp por cada entrenamiento)

-La mejora se guarda de forma persistente por usuario.

-Batalla Pokémon

-Simula una batalla entre un Pokémon de dos usuarios random 

-Utiliza lógica basada en estadísticas (puntos de hp de ataque, defensa basada en el entrenamiento previo).


-Hacerlo luchar hasta que uno de los pokemones quede en 0 hp (depende del atque , defensa ganan o pierden)

-El Pokémon perdedor es eliminado de la colección del usuario.

-Historial de batallas.

Endpoints principales

###Usuarios###

POST /api/users/register - Registrar un nuevo usuario.

POST /api/users/login: Iniciar sesión.

###Pokémon###

GET /api/pokemon/getfavorites  - Obtener Pokémon favoritos del usuario autenticado.

POST /api/pokemon/addfavorites - Agregar un Pokémon a favoritos.

DELETE /api/pokemon/favorites/:id - Eliminar un Pokémon de favoritos.

POST /api/pokemon/catch - Capturar un Pokémon desde la PokeAPI.

POST /api/pokemon/train/:id - Entrenar un Pokémon capturado.

POST /api/pokemon/battle - Iniciar una batalla Pokémon.

GET /api/pokemon/random - Obtener un Pokémon aleatorio.

GET /api/pokemon/my - Obtener todos los Pokémon capturados por el usuario.

###Tecnologías utilizadas

Node.js

Express.js

MongoDB + Mongoose

JWT (jsonwebtoken)

Bcrypt

dotenv

PokeAPI (para obtener datos reales de Pokémon)
