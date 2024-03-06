const verificarGet = require("../middleware/verificarGet");

const verificarToken = require("../middleware/verificarToken");

module.exports = function (app) {
    app.get("/clientes", async function (req, res) {
        const clientes = require("./../services/clientesServices");
    
        const response = await clientes.getClientes();
    
        res.send(response.result);
      });

      app.get(
        "/clientes/:id",
        verificarGet.verificarNumero,
        async function (req, res) {
          const id = req.params.id;
    
          const clientes = require("./../services/clientesServices");
    
          const response = await clientes.getByIdClientes(id);
    
          res.send(response.result);
        }
      )


    app.post(
    "/clientes",
    verificarToken.verificar,
    verificarToken.admin,
    async function (req, res) {
      const clientesNuevo = req.body;

      const clientes = require("./../services/clientesServices");
      const response = await clientes.postClientes(clientesNuevo);
      if (response.error) {
        res.send(response.error);
      } else {
        res.send(response.result);
      }
    }
  );

  app.put("/clientes", async function (req, res) {
    const clientesModificada = req.body;

    const clientes = require("./../services/clientesServices");
    const response = await clientes.putClientes(clientesModificada);
    if (response.error) {
      res.send(response.error);
    } else {
      res.send(response.result);
    }
  });
  app.delete(
    "/clientes/:id",
    verificarGet.verificarNumero,
    async function (req, res) {
      const id = req.params.id;

      const clientes = require("./../services/clientesServices");

      const response = await clientes.deleteClientes(id);

      res.send(response.result);
    }
  );


};