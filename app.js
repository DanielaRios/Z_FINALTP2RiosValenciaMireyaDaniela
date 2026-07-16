import { config } from "./src/config/config.js";
import MongooseConnection from "./src/databases/mongo.cnx.js";
import server from "./src/server.js";

const runServer = async () => {
  try {
    const mongoConnection = new MongooseConnection();

    await mongoConnection.connect();

    server.listen(
      config.SERVER_PORT,
      config.SERVER_HOST,
      () => {
        console.log(`
Servidor ejecutándose en:
http://${config.SERVER_HOST}:${config.SERVER_PORT}
        `);
      },
    );
  } catch (error) {
    console.error("Error al iniciar el servidor:", error.message);
  }
};

runServer();