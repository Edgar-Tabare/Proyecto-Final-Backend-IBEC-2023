
const mysql = require("mysql");

const conn = require("../config/conn");

const jwt = require("jsonwebtoken");

const login = {
  async postLogin(validar) {
    const secret = process.env.SECRET;

    let sql =
      "SELECT * FROM usuarios WHERE email = '" +
      validar.email +
      "' AND password = '" +
      validar.password +
      "'";

    let resultado = await conn.query(sql);
    let response = { error: "No se pudo iniciar sesion" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      const {
        id: sub,
        name,
        rol,
      } = {
        id: resultado[0].id,
        name: resultado[0].correo,
        rol: resultado[0].rol,
      };
      console.log("el rol es::::::::::::::" + resultado[0].rol);
      const token = jwt.sign(
        {
          sub,
          name,
          rol,
          exp: Date.now() + 300 * 1000,
        },
        secret
      );
      response = { result: token };
    }
    return response;
  },
};

module.exports = login;
