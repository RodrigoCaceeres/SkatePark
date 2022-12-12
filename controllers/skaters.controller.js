import { Skaters } from "../models/skaters.js";
import jwt from "jsonwebtoken";
const secretKey = "ak491";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, '../public');
const passAdmin = "admin123";


export const getSkaters = async (req, res) => {
  try {
    let skater = new Skaters();
    let skaters = await skater.getSkaters();
    res.send(skaters);
  } catch (error) {
    res.status(500).send("Error interno del servidor.");
  }
};

export const addSkaters = async (req, res) => {

  const { email, nombre, password, password_2, anhos, especialidad } = req.body;
  const { foto } = req.files;
  const { name } = foto;
  const estado = false;
  if (password !== password_2) {
    res.send('<script>alert("Las contraseñas no coinciden."); window.location.href = "/registro"; </script>');
  } else {
    try {
      let newSkater = new Skaters(email, nombre, password, anhos, especialidad, estado, name);
      let skater = await newSkater.addSkater()
        .then(() => {
          foto.mv(`${dirPath}/img/${name}`, (err) => {
            res.send('<script>alert("Se ha registrado con éxito."); window.location.href = "/"; </script>');
          });
        })
    } catch (e) {
      res.status(500).send({
        error: `Esto no sucedió como esperábamos, ${e}`,
        code: 500
      })
    }
  }
};

export const setSkaterStatus = async (req, res) => {
  try {
    let body = req.body;
    let newSkater = new Skaters();
    let resp = await newSkater.setStatus(body.id, body.auth);
    res.status(200).send(JSON.stringify(resp));
  } catch (error) {
    res.status(500).send("Error interno del servidor.");
  }
};

export const skaterVerify = async (req, res) => {
  try {
    let body = req.body;
    let skater = new Skaters();
    let skatersCredentials = await skater.getSkaterCredentials(
      body.email,
      body.pass
    );
    if (skatersCredentials) {
      if (skatersCredentials.estado == true) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 180,
            data: skatersCredentials,
          },
          secretKey
        );
        res.send(token);
      } else {
        res.status(401).send({
          error:
            "Este Skater aún no es validado por el administrador para mostrarse en SkatePark.",
          code: 401,
        });
      }
    } else {
      res.status(404).send({
        error: "Este Skater no se encuentra en la base de Datos.",
        code: 404,
      });
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor.");
  }
};

export const skaterModify = async (req, res) => {
  const { email, nombre, password, anhos, especialidad } = req.body;

  try {
    let skater = new Skaters();
    let skaters = await skater.modSkater(
      email,
      nombre,
      password,
      anhos,
      especialidad
    );
    res.status(200).send(skaters);
  } catch (e) {
    res.status(500).send({
      error: `Ocurrió un error interno, ${e}`,
      code: 500,
    });
  }
};

export const skaterDelete = async (req, res) => {
  try {
    const { email } = req.params;
    let skater = new Skaters();
    let skaters = await skater.deleteSkater(email);
    res.sendStatus(200).send(skaters);
  } catch (e) {
    res.status(500).send({
      error: `Esto no sucedió como esperábamos, ${e}`,
      code: 500
    })
  }
}

export const adminVerify = async (req, res) => {
  try {
    let body = req.body;
    if (body.pass == passAdmin) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 180,
          data: passAdmin,
        },
        secretKey
      );
      res.send(token);
    } else {
      res.status(401).send({
        error: "Contraseña de administrador incorrecta",
        code: 404,
      });
    }
  } catch (error) {
    res.status(500).send("Error interno del servidor.");
  }
};

