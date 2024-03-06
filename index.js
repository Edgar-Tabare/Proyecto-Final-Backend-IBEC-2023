const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

const secret = process.env.SECRET;

require("./controllers/categoriasController.js")(app);

require("./controllers/loginController.js")(app);

require("./controllers/clientesController.js")(app);


app.listen(process.env.port, () => {
    console.log("servidor en puerto " + process.env.port );
  });
  