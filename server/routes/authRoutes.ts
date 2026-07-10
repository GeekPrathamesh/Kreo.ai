import express from "express";
import { register, login, logout, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/me", protect, getMe);
