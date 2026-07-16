import { Router } from "express";
import { AuthController } from "../controllers/auth.js";

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.login);

export default AuthRouter;