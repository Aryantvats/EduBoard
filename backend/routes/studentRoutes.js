import express from "express";
import {
  getMyProfile,
  updateMyProfile,
} from "../controllers/studentController.js";

import { protect } from "../middlewares/auth.middleware.js";

const studentRoutes = express.Router();

studentRoutes.get("/me", protect, getMyProfile);
studentRoutes.put("/update", protect, updateMyProfile);

export default studentRoutes;