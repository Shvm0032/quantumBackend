import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

// CREATE USER (SIGNUP)
router.post("/", createUser);

// GET ALL USERS
router.get("/", getAllUsers);

// GET SINGLE USER
router.get("/:id", getUserById);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

export default router;
