
const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

const verificarToken = {
  verificar: (req, res, next) => {
    try {
      const token = req.headers.authorization;
      const payload = jwt.verify(token, secret);

      if (Date.now() > payload.exp) {
        return res.status(401).send({ error: "token expired" });
      }
      next();
    } catch (error) {
      res.status(401).send("hay un error");
    }
  },
  admin: (req, res, next) => {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);

    if (payload.rol != 1) {
      return res.status(401).send({ error: "Usuario debe ser Admin" });
    }
    next();
  },
};

module.exports = verificarToken;
