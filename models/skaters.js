import pool from "../DB/db.js";

export class Skaters {
  constructor(email, name, pass, exp, espSkill, state, photo) {
    this._id = null;
    this._email = email;    
    this._name = name;
    this._pass= pass;
    this._exp = exp;
    this._espSkill = espSkill;
    this._state = state;
    this._photo = photo;
  }

  //GETTER - SETTER ID
  get id() {
    return this._id;
  }
  set id(id) {
    if (id) {
      this._id = id;
    }
  }
   //GETTER - SETTER EMAIL
   get email() {
    return this._email;
  }
  set email(email) {
    if (email) {
      this._email = email;
    }
  }
  //GETTER - SETTER NAME
  get name() {
    return this._name;
  }
  set name(name) {
    if (name) {
      this._name = name;
    }
  }
   //GETTER - SETTER PASS
   get pass() {
    return this._pass;
  }
  set pass(pass) {
    if (pass) {
      this._pass = pass;
    }
  }
  //GETTER - SETTER EXP
  get exp() {
    return this._exp;
  }
  set exp(exp) {
    if (exp) {
      this._exp = exp;
    }
  }
  //GETTER - SETTER ESPSKILL
  get espSkill() {
    return this._espSkill;
  }
  set espSkill(espSkill) {
    if (espSkill) {
      this._espSkill = espSkill;
    }
  }  
  //GETTER - SETTER STATE
  get state() {
    return this._state;
  }
  set state(state) {
    if (state) {
      this._state = state;
    }
  }
    //GETTER - SETTER PHOTO
    get photo() {
      return this._photo;
    }
    set photo(photo) {
      if (photo) {
        this._photo = photo;
      }
    } 

  async getSkaters() {
    let skaters = await pool.query(
      "SELECT * FROM skaters ORDER BY id"
    );
    return skaters.rows;
  }

  async getSkater(id) {
    let skaters = await pool.query(
      `SELECT * FROM skaters WHERE id = ${id} ORDER BY id`
    );
    return skaters.rows[0];
  }

  async getSkaterCredentials(email, password) {
    let skaters = await pool.query(
      `SELECT email, nombre, pass, anos_experiencia, especialidad, estado FROM skaters WHERE email = '${email}' AND pass = '${password}' ORDER BY id`
    );
    return skaters.rows[0];
  }

  async addSkater() {
    let skater = await pool.query(
      "INSERT INTO skaters(email, nombre, pass, anos_experiencia, especialidad, foto, estado) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [this.email, this.name, this.pass, this.exp, this.espSkill, this.photo, this.state]
    );
    return skater.rows[0];
  }

  async setStatus(id, auth) {
    let result = await pool.query(
      `UPDATE skaters SET estado= ${auth} WHERE id = ${id} RETURNING *`
    );
    return result.rows[0];
  }

  async modSkater(email, nombre, password, anhos, especialidad) {    
    let result = await pool.query(
      `UPDATE skaters SET nombre = '${nombre}', pass = '${password}', anos_experiencia = ${anhos}, especialidad = '${especialidad}' WHERE email = '${email}' RETURNING *`
    );
    return result.rows[0];
  }

 
  async deleteSkater(email) {
    const result = await pool.query(`DELETE FROM skaters WHERE email = '${email}'`);
    return result.rows[0];
}
}


