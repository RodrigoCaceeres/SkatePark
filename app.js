import express from "express";
import expressFileUpload from "express-fileupload";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import path from "path";


import { fileURLToPath } from "url";
import  viewRoutes  from "./routes/view.routes.js";;
import skaterView from "./routes/skate.routes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

//CONFIGURACIÓN DE HANDLEBARS
const hbs = create({
  partialsDir: ["views/partials/"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules/axios/dist"));

app.use(
  expressFileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
    aboortOnLimit: true,
    responseOnLimit:
      "El tamaño de la foto de perfil supera el límite permitido (5mb)",
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//RUTAS
app.use(viewRoutes);
app.use(skaterView);

