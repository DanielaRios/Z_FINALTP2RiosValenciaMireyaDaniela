import { config } from "../config/config.js";
import { generateToken } from "../auth/jwt.js";

export const AuthController = {
  login: async (request, response) => {
    try {
      const { username, password } = request.body;

      if (!username || !password) {
        return response.status(400).json({
          statusCode: 400,
          error: "Username y password son obligatorios",
        });
      }

      const credencialesValidas =
        username === config.AUTH_USER &&
        password === config.AUTH_PASSWORD;

      if (!credencialesValidas) {
        return response.status(401).json({
          statusCode: 401,
          error: "Credenciales inválidas",
        });
      }

      const token = generateToken(username);

      return response.status(200).json({
        token,
      });
    } catch (error) {
      console.error("Error en el login:", error.message);

      return response.status(500).json({
        statusCode: 500,
        error: "Error interno del servidor",
      });
    }
  },
};