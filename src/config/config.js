import dotenv from "dotenv";

dotenv.config();

const {
  SERVER_HOST,
  SERVER_PORT,
  MONGO_URI,
  AUTH_USER,
  AUTH_PASSWORD,
  JWT_SECRET,
} = process.env;

export const config = {
  SERVER_HOST,
  SERVER_PORT,
  MONGO_URI,
  AUTH_USER,
  AUTH_PASSWORD,
  JWT_SECRET,
};