const verificarGet = require("../middleware/verificarGet");

const verificarToken = require("../middleware/verificarToken");

module.exports = function (app) {
  app.get(
    "/categorias/:id",
    verificarGet.verificarNumero,
    async function (req, res) {
      const id = req.params.id;

      const categoria = require("../services/categoriasServices.js");

      const response = await categoria.getByIdCategorias(id);

      res.send(response.result);
    }
  );

  app.get("/categorias", async function (req, res) {
    const categoria = require("../services/categoriasServices.js");

    const response = await categoria.getCategorias();

    res.send(response.result);
  });

  app.post(
    "/categorias",
    verificarToken.verificar,
    verificarToken.admin,
    async function (req, res) {
      const categoriaNueva = req.body;

      const categorias = require("../services/categoriasServices.js");
      const response = await categorias.postCategorias(categoriaNueva);
      if (response.error) {
        res.send(response.error);
      } else {
        res.send(response.result);
      }
    }
  );

  app.put("/categorias", async function (req, res) {
    const categoriaModificada = req.body;

    const categorias = require("../services/categoriasServices.js");
    const response = await categorias.putCategorias(categoriaModificada);
    if (response.error) {
      res.send(response.error);
    } else {
      res.send(response.result);
    }
  });

  app.delete(
    "/categorias/:id",
    verificarGet.verificarNumero,
    async function (req, res) {
      const id = req.params.id;

      const categoria = require("../services/categoriasServices.js");

      const response = await categoria.deleteCategorias(id);

      res.send(response.result);
    }
  );
};
