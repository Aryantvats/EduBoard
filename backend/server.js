import express from "express";
import "dotenv/config"
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";


const app = express();

await connectDB();

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
    res.send("api is working");
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes);
const PORT = process.env.PORT || 3080;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})

export default app;