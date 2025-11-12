import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import gameRoutes from "./routes/gameRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import userRoutes from "./routes/userRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/games", gameRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 5000;


connectDB().then(() => {
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
});