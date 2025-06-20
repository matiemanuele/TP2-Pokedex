import { getDb } from "./connection.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export async function findAllUsers() {
  const db = getDb();
  const users = await db.collection("users").find().toArray();
  console.log(users);
  return users;
}

export async function findUserById(id) {
  const db = getDb();
  const user = await db.collection("users").findOne({ _id: new ObjectId(id) });
  console.log(user);
  return user;
}

export async function findUserByUsername(username) {
  const db = getDb();
  const user = await db.collection("users").findOne({ username });
  return user;
}

export async function findByCredentials(email, password) {
  const db = getDb();
  const user = await db.collection("users").findOne({ email });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password); // compara el password usando bcrypt
  if (!isMatch) {
    return null;
  }
  return user;
}

// hashea el password y lo guarda en la base de datos
export async function registerUser({ username, email, password, role }) {
  const db = getDb();
  // el usuario ya existe?
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    throw new Error("El email ya está registrado");
  }
  // Hashear el password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    username,
    email,
    password: hashedPassword,
    role,
  };
  const result = await db.collection("users").insertOne(newUser);
  return result;
}

export const updateUserByAdmin = async (id, { email, password }) => {
  const db = getDb();
  const updateFields = {};
  if (email) updateFields.email = email;
  if (password) updateFields.password = await bcrypt.hash(password, 10);

  const result = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

  return result;
};

export const deleteUserById = async (id) => {
  const db = getDb();
  const result = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) });
  return result;
};
