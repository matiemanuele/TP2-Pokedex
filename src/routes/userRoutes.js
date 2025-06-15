import express from "express";
import {
  getAllUsers,
  getUser,
  registerUserController,
  loginUserController,
  updateUserAdmin,
  deleteUserAdmin,
} from "../controllers/userController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUserController);
router.post("/login", loginUserController);
router.put("/:id", authMiddleware, isAdmin, updateUserAdmin);
router.delete("/:id", authMiddleware, isAdmin, deleteUserAdmin);
router.get("/", authMiddleware, getAllUsers);
router.get("/:id", authMiddleware, getUser);

export default router;
