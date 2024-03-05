const verificarGet = {
    verificarNumero: (req, res, next) => {
      if (Number.isInteger(Number(req.params.id))) {
        next();
      } else {
        res.send("hay un error ooooo");
        return;
      }
    },
  
    verificarTexto: (req, res, next) => {
      let body = req.body;
      if (typeof body.nombre == "string") {
        next();
      } else {
        res.send("no es un texto " + typeof body.nombre);
        return;
      }
    },
  };
  
  module.exports = verificarGet;
  