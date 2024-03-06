//requerimos el módulo para conectarse a la base de datos
const mysql = require("mysql");
//requerimos el archivo donde tenemos configurada la conexion
const conn = require("../config/conn");

const clientes = {
  async getClientes() {
    console.log("Iniciando función getClientes...");
    //Guardamos en una variable la consulta que queremos generar
    let sql = "SELECT * FROM `clientes`WHERE `activo` = '0'";
  
    //Con el archivo de conexion a la base, enviamos la consulta a la misma
    //Ponemos un await porque desconocemos la demora de la misma
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

  async getByIdClientes(id) {
    //Guardamos en una variable la consulta que queremos generar
    let sql = "SELECT * FROM clientes WHERE`activo`='0' AND id =" + id;
    //Con el archivo de conexion a la base, enviamos la consulta a la misma
    //Ponemos un await porque desconocemos la demora de la misma
    let resultado = await conn.query(sql);
    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },


  async postClientes(ingreso) {
    //Guardamos en una variable la consulta que queremos generar
    let sql =
      'INSERT INTO `clientes`(`id`, `nombre`, `email`, `direccion`, `telefono`) VALUES (NULL,"' +
      ingreso.nombre +
      '","' +
      ingreso.email +
      '","' +
      ingreso.direccion +
      '","' +
      ingreso.telefono +
      '")';
    console.log(sql);

    //Con el archivo de conexion a la base, enviamos la consulta a la misma
    //Ponemos un await porque desconocemos la demora de la misma
    let resultado = await conn.query(sql);
    let response = { error: "No se encontraron registros" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },

  async putClientes(modifica) {
    //Guardamos en una variable la consulta que queremos generar
    let sql =
      "UPDATE `clientes` SET `nombre`='" +
      modifica.nombre +
      "', `email`='" +
      modifica.email +
      "', `direccion`='" +
      modifica.direccion +
      "', `telefono`='" +
      modifica.telefono +
      "' WHERE `id`= '" +
      modifica.id +
      "'";

    console.log(sql);

    //Con el archivo de conexion a la base, enviamos la consulta a la misma
    //Ponemos un await porque desconocemos la demora de la misma
    let resultado = await conn.query(sql);
    let response = { error: "se modifico la categoria" };
    if (resultado.code) {
      response = { error: "Error en la consulta SQL de put" };
    } else if (resultado.length > 0) {
      response = { result: resultado };
    }
    return response;
  },
  async deleteClientes(id) {
    //Guardamos en una variable la consulta que queremos generar
    let sql = "UPDATE `clientes` SET `activo`='1' WHERE `id`= '" + id + "'";
    //Con el archivo de conexion a la base, enviamos la consulta a la misma
    //Ponemos un await porque desconocemos la demora de la misma
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

module.exports = clientes;
