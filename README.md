Pokédex API - Proyecto Backend

una Pokédex personalizada. Permite a los usuarios registrarse, iniciar sesión, capturar y entrenar Pokémon, gestionar sus favoritos, y participar en batallas.Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB que simula 

###Funcionalidad general###

-Autenticación y gestión de usuarios

-Registro con email y contraseña encriptada.

-Inicio de sesión con generación de token JWT.

-Middleware de autenticación para proteger rutas privadas.

-Gestión de Pokémon favoritos

-Obtener la lista de favoritos del usuario autenticado.

-Agregar un Pokémon a favoritos.

-Eliminar un Pokémon de favoritos.

-Captura de Pokémon

-Permite capturar un Pokémon real desde la PokeAPI utilizando su ID.

-Verifica si el Pokémon ya está capturado.

-Guarda la información en la colección del usuario.

-Entrenamiento de Pokémon

-Incrementa estadísticas de los Pokémon capturados (por ejemplo, nivel, experiencia, fuerza).

-La mejora se guarda de forma persistente por usuario.

-Batalla Pokémon

-Simula una batalla entre un Pokémon del usuario y otro oponente.

-Utiliza lógica basada en estadísticas (ataque, defensa, velocidad).

-El Pokémon perdedor es eliminado de la colección del usuario.

(Opcional) Puede guardarse un historial de batallas.

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



FEHCAS :  26/6  presentacion , 16/7 Defensa 