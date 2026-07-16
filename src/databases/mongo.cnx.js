import mongoose from "mongoose";
import { config } from "../config/config.js";

class MongooseConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }

    try {
      await mongoose.connect(config.MONGO_URI);

      this.connection = mongoose.connection;

      console.log("MongoDB Atlas conectado correctamente");

      return this.connection;
    } catch (error) {
      console.error("Error al conectar con MongoDB:", error.message);
      throw error;
    }
  }
}

export default MongooseConnection;