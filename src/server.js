import express from "express";
import morgan from "morgan";
import AuthRouter from "./router/auth.router.js";
import HabitacionRouter from "./router/habitacion.router.js";
import PokemonRouter from "./router/pokemon.router.js";

const server = express();

server.use(express.json());
server.use(morgan("dev"));

server.get("/", (request, response) => {
  response.status(200).json({
    message: "API Hotel funcionando correctamente",
  });
});

server.use("/api/v1/auth", AuthRouter);

server.use("/api/v1/habitaciones",HabitacionRouter,);

server.use("/api/v1/pokemon", PokemonRouter);

export default server;