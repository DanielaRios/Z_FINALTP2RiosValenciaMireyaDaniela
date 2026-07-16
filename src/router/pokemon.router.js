import { Router } from "express";
import { PokemonController } from "../controllers/pokemon.js";

const PokemonRouter = Router();

PokemonRouter.get("/csv", PokemonController.generarCsv);

export default PokemonRouter;