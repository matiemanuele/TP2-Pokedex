import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

// Middlewars
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Rutas
app.use("/api/users", userRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.json({
    message: "API TP2 -Pokedex",
  });
});

export default app;
