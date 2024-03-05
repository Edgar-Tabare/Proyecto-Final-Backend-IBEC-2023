
const mysql = require("mysql");

const conn = require("../config/conn");


const categorias = {

  async getCategorias() {
    console.log("Iniciando función getCategorias...");
   
    let sql = "SELECT * FROM categorias WHERE `activo` = '0'";
   
    let resultado = await conn.query(sql);
    console.log("Resultado de la consulta:", resultado);

    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      console.log("Error en la consulta SQL:", resultado.code);
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      console.log("Registros encontrados:", resultado.length);
      response = { result: resultado };
    }
    console.log("Respuesta final:", response);
    return response;
  },

  async getByIdCategorias(id) {
    let sql = "SELECT * FROM categorias WHERE`activo`='0' AND id =" + id;
    console.log("Consulta SQL:", sql); 
    let resultado = await conn.query(sql);
    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    } else if (resultado.length === 0) {
      response = { result: "no hay registro con este ID " };
    }
    return response;
  },

  async postCategorias(dato) {
 
    let sql =
      'INSERT INTO `categorias`(`id`, `nombre`) VALUES (NULL,"' +
      dato.nombre +
      '")';
    console.log(sql);

   
    let resultado = await conn.query(sql);
    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },

  async putCategorias(dato) {
  
    let sql =
      "UPDATE `categorias` SET `nombre`='" +
      dato.nombre +
      "' WHERE `id`= '" +
      dato.id +
      "'";
    console.log(sql);

 
    let resultado = await conn.query(sql);
    let response = { error: "se modifico la categoria" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL de put" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },

  async deleteCategorias(id) {

    let sql = "UPDATE `categorias` SET `activo`='1' WHERE `id`= '" + id + "'";
  
    let resultado = await conn.query(sql);
    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },
};

module.exports = categorias;