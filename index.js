import { app } from "./app.js";
import pool from "./db/db.js";

const main = async () => {
  try {
    await pool.connect();
    console.log("Conectado a la base de datos...");
    app.listen(3000, () => {
      console.log("Servidor Local escuchando en http://localhost:3000");
    });
  } catch (error) {
    console.log(error);
  }
};

main();
