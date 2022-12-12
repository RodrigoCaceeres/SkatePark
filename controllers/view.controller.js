import { Skaters } from "../models/skaters.js";
import jwt from "jsonwebtoken";
const secretKey = "ak491";

export const homeView = async (req, res) => {
  try {
    let skater = new Skaters();
    let skaters = await skater.getSkaters();
    res.render("home", {
      skaters: skaters,
    });
  } catch (error) {
    res.render("home", {
      error: true,
    });
  }
};

export const registerView = async (req, res) => {
  try {
    res.render("registro");
  } catch (error) {
    res.render("registro", {
      error: true,
    });

  }
};

export const loginView = async (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.render("login", {
      error: true,
    });

  }
};

export const loginAdminView = async (req, res) => {
  try {
    res.render("loginAdmin");
  } catch (error) {
    res.render("loginAdmin", {
      error: true,
    });

  }
};

export const adminView = async (req, res) => {
  try {
    const { token } = req.query;
    jwt.verify(token, secretKey, async (err) => {   
    if (err) {
      res.status(401).send({
        error: '401 Unauthorized',
        message: 'Usted no está autorizado para estar aquí',
        token_error: err.message,
      })
    } else {
      let skater = new Skaters();
      let skaters = await skater.getSkaters();
      res.render("admin", {
        skaters: skaters,
      });
    }        
  })
  } catch (error) {
    res.render("admin", {
      error: true,
    });
  }
  
};

export const skaterView = async (req, res) => {
  const { token } = req.query;
  jwt.verify(token, secretKey, (err, decoded) => {
    const { data } = decoded
    const email = data.email;
    const nombre = data.nombre;
    const password = data.pass;
    const anos_experiencia = data.anos_experiencia;
    const especialidad = data.especialidad;
    err
      ? res.status(401).send({
        error: '401 Unauthorized',
        message: 'Usted no está autorizado para estar aquí',
        token_error: err.message,
      })
      : res.render('modificacionDatos', { email, nombre, password, anos_experiencia, especialidad })
  })
};



export default { homeView, registerView, loginView, adminView, skaterView }