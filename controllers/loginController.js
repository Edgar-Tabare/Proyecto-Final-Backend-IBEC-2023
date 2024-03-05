
module.exports = function (app) {
    app.post("/login", async function (req, res) {
    
      const validar = req.body;
      const login = require("../services/loginServices.js");
      const response = await login.postLogin(validar);
      if (response.error) {
        res.send(response.error);
      } else {
        res.send({ token: response.result });
      }
    });
  };
  