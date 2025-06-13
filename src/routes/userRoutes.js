import express from "express";
import {getAllUsers,getUser,registerUserController,loginUserController,updateUserAdmin,deleteUserAdmin,deletePokemonFromUser,updatePokemonFromUser} from "../controllers/userController.js";
import { authMiddleware, isAdmin} from "../middleware/authMiddleware.js";


const router = express.Router();

// router.post("/register", registerUserController);
// router.post("/login", loginUserController);
// router.get("/", authMiddleware, getAllUsers);
// router.get("/:id", authMiddleware, getUser);
// router.put("/users/:id", authMiddleware, isAdmin, updateUserAdmin);
// router.delete("/users/:id", authMiddleware, isAdmin, deleteUserAdmin);
// router.delete("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, deletePokemonFromUser);
// router.put("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, updatePokemonFromUser);

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.put("/users/:id", authMiddleware, isAdmin, updateUserAdmin);
router.delete("/users/:id", authMiddleware, isAdmin, deleteUserAdmin);
router.delete("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, deletePokemonFromUser);
router.put("/users/:userId/pokemon/:pokeId", authMiddleware, isAdmin, updatePokemonFromUser);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUser);

export default router;
