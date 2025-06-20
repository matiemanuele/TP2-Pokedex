import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import trainingRoutes from "./routes/trainingRoutes.js";
import battleRoutes from "./routes/battleRoutes.js";

const app = express();

app.use(express.json());
app.use(morgan("dev")); //run dev
app.use(cors()); //llama a la API desde el frontend
app.use("/api/users", userRoutes);
app.use("/api/pokemon", pokemonRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/battle", battleRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Test - Solo usuarios",
    status: "OK",
  });
});

export default app;
