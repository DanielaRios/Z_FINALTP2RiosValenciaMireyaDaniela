import { Router } from "express";
import { HabitacionController } from "../controllers/habitacion.js";
import { authenticateToken } from "../middleware/authentication.js";

const HabitacionRouter = Router();

//rutas publicas
HabitacionRouter
  .get("/", HabitacionController.getAllHabitaciones)
  .get("/:id", HabitacionController.getById)
  .post("/", HabitacionController.createByJson)

//rutas privadas  
HabitacionRouter  
  .put(
    "/:id",authenticateToken,HabitacionController.updateByJson,)
  .delete("/:id",authenticateToken,HabitacionController.deleteById,);

export default HabitacionRouter;