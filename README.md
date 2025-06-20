# PokéAPI

Este proyecto es una API RESTful construida con Node.js, Express y MongoDB que permite a los usuarios registrarse, capturar Pokémon desde la PokéAPI, entrenarlos y participar en batallas contra otros jugadores.

---

## Características

- Registro y login de usuarios con JWT
- Captura de Pokémon desde PokéAPI
- Entrenamiento de atributos (ataque y defensa)
- Simulación de batallas entre usuarios
- Historial de batallas y entrenamientos
- Gestión de usuarios y Pokémon (admin)
- Modularidad con controladores, servicios y middlewares

---

## Usuarios

POST /users/register = Registro de usuario
POST /users/login = Login y generación de token
GET /users/ = Obtener todos los usuarios (auth)
GET /users/:id = Obtener usuario por ID (auth)

## Admin

PUT /users/:id = Actualizar email/pass
DELETE /users/:id = Eliminar usuario
DELETE /pokemon/users/:userId/pokemon/:pokeId = Eliminar Pokémon de otro usuario
PUT /pokemon/users/:userId/pokemon/:pokeId = Actualizar Pokémon de otro usuario

## Pokémon

GET /pokemon/random = Obtener Pokémon aleatorio desde PokéAPI
GET /pokemon/api/:id = Obtener Pokémon específico desde PokéAPI
GET /pokemon/my = Obtener Pokémon del usuario actual (auth)
POST /pokemon/catch = Capturar Pokémon (auth)
DELETE /pokemon/my/:id = Liberar un Pokémon del usuario actual (auth)

## Entrenamiento

GET /training/types = Tipos de entrenamiento disponibles (attack, defense)
POST /training/train = Entrenar Pokémon (auth)
GET /training/history = Historial de entrenamiento (auth)
GET /training/stats = Estadísticas por tipo de entrenamiento (auth)

## Batalla

POST /battle = Iniciar una batalla entre tu Pokémon y otro (auth)

## Tecnologías Usadas

Node.js + Express

MongoDB + MongoDB Atlas

PokéAPI REST (https://pokeapi.co)

JWT para autenticación

Bcrypt para hashing de contraseñas

Morgan + CORS
