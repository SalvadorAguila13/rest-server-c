const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 4001;
    // todo:Conección a base de dato Mongoose.
    this.databaseConection();
    // todo: Middlewares
    this.middlewares();
    // todo: Rutas de la aplicación
    this.routes();
  }

  async databaseConection() {
    await dbConnection();
  }

  middlewares() {
    // Cors
    this.app.use(cors());

    // Parse y lectura del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api/users", require("../routes/users.routes"));
    this.app.use("/api/auth", require("../routes/auth.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`ejecutando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
