import { usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const senhaHash = process.env.SENHA_HASH;

async function authenticate(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization) {
      return res.status(404).json({ message: "Erro no token" });
    }
    const token = authorization.split(" ")[1];
    const tokenVerify = await jwt.verify(token, senhaHash);

    const usuarioAindaExiste = await usuario.findById(tokenVerify.id);

    if (!usuarioAindaExiste) {
      res.status(404).json({ message: "Erro no token" });
    }

    req.usuario = { ...usuarioAindaExiste._doc, senha: undefined };

    next();
  } catch (error) {
    res.status(500).json({ message: `${error.message} - falha na requisição` });
  }
}

export default authenticate;
