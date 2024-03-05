
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  port: process.env.portDatabase,
  database: process.env.database,
  multipleStatements: true, 
});

connection.connect(function (err) {
  if (err) {
    const crear = require("./create");
    const response = crear.crearDataBase();

    console.error("Error al conectar a Data Base ::", err.stack);
    return;
  }
  console.log("Conectado a Data Base con Id. :: ", connection.threadId);
});

let query = (sql) => {
 
  return new Promise((resolve, reject) => {
    connection.query(`${sql}`, function (error, results, fields) {
      if (error) {
        resolve(JSON.parse(JSON.stringify(error)));
      } else {
        resolve(results);
      }
    });
  });
};

let conn = {
  query: query,
};

module.exports = conn;
