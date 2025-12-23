import express from "express";
import { changePassword, getMe, loginUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.get("/me",protect, getMe);
authRoutes.put("/change-password",protect, changePassword);
export default authRoutes;