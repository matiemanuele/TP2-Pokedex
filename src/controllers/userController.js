import {getUsers,getUserById,registerUserService,loginUserService,updateUserByAdmin, deleteUserByIdService} from "../services/userService.js";
import { removePokemonFromUser, updatePokemonForUser } from "../services/pokemonService.js";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.log("Error fetching users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Faltan campos obligatorios (email, password)" });
  }
  try {
    const user = await loginUserService({ email, password });
    // Generar JWT
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login exitoso", user, token });
  } catch (error) {
    if (error.message === "Credenciales inválidas") {
      return res.status(401).json({ message: error.message });
    }
    console.log("Error en login: ", error);
    res.status(500).json({ message: "Error interno en login" });
  }
};

export const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({
        message: "Faltan campos obligatorios (username, email, password)",
      });
  }
  try {
    const result = await registerUserService({ username, email, password });
    res
      .status(201)
      .json({
        message: "Usuario registrado exitosamente",
        userId: result.insertedId,
      });
  } catch (error) {
    if (error.message === "El email ya está registrado") {
      return res.status(409).json({ message: error.message });
    }
    console.log("Error registrando usuario: ", error);
    res.status(500).json({ message: "Error interno al registrar usuario" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.log("Error fetching users: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserAdmin = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;

  if (!email && !password) {
    return res.status(400).json({ message: "Debe enviar email o password a modificar" });
  }

  try {
    const result = await updateUserByAdmin(id, { email, password });
    res.json({ message: "Usuario actualizado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario" });
  }
};

export const deleteUserAdmin = async (req, res) => {
  try {
    const result = await deleteUserByIdService(req.params.id);
    res.json({ message: "Usuario eliminado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario" });
  }
};

export const deletePokemonFromUser = async (req, res) => {
  const { userId, pokeId } = req.params;

  try {
    const result = await removePokemonFromUser(userId, pokeId);
    res.json({ message: "Pokémon eliminado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando Pokémon" });
  }
};

export const updatePokemonFromUser = async (req, res) => {
  const { userId, pokeId } = req.params;
  const updateData = req.body;

  try {
    const result = await updatePokemonForUser(userId, pokeId, updateData);
    res.json({ message: "Pokémon actualizado correctamente", result });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando Pokémon" });
  }
};