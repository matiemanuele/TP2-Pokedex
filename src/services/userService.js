import {
  findAllUsers,
  findUserById,
  registerUser,
  findByCredentials,
  deleteUserById,
  updateUserByAdmin,
} from "../data/userData.js";

export const getUsers = async () => {
  return await findAllUsers();
};

export const getUserById = async (id) => {
  return await findUserById(id);
};

export const deleteUserByIdService = async (id) => {
  return await deleteUserById(id);
};

export const updateUserByAdminService = async (id, { email, password }) => {
  return await updateUserByAdmin(id, { email, password });
};

export const registerUserService = async ({
  username,
  email,
  password,
  role,
}) => {
  try {
    return await registerUser({ username, email, password, role });
  } catch (error) {
    if (error.message === "El email ya está registrado") {
      throw error;
    }
    throw new Error("Error al registrar el usuario");
  }
};

export const loginUserService = async ({ email, password }) => {
  const user = await findByCredentials(email, password);
  if (!user) {
    throw new Error("Credenciales inválidas");
  }
  const { password: _pw, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
