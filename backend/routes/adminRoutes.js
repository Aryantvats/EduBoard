import express from "express";
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
} from "../controllers/adminController.js";

import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const adminRoutes = express.Router();

adminRoutes.get("/students", protect, isAdmin, getAllStudents);
adminRoutes.post("/students", protect, isAdmin, createStudent);
adminRoutes.put("/students/:id", protect, isAdmin, updateStudent);
adminRoutes.delete("/students/:id", protect, isAdmin, deleteStudent);
adminRoutes.get("/students/:id", protect, isAdmin, getStudentById);


export default adminRoutes;