import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const generateToken = (username) => {
  return jwt.sign(
    {
      username,
    },
    config.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

export const validateToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};