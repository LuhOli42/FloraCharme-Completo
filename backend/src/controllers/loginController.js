import { usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const senhaHash = process.env.SENHA_HASH;

class LoginController {
  static async login(req, res) {
    try {
      const login = req.body;

      const usuarioLocalizado = await usuario.findOne({ email: login.email });

      if (!usuarioLocalizado) {
        return res.status(404).json({ messagem: "Senha ou usuarios errado" });
      }

      const senhaComparada = await bcrypt.compare(
        login.senha,
        usuarioLocalizado.senha
      );

      if (!senhaComparada) {
        return res.status(404).json({ messagem: "Senha ou usuarios errado" });
      }

      const infoUsuario = {
        id: usuarioLocalizado._id,
        email: usuarioLocalizado.email,
      };

      const token = await jwt.sign(infoUsuario, senhaHash, {
        expiresIn: "12h",
      });

      return res.status(200).json({ infoUsuario, token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ messagem: `${error.message} - falha em autorizar usuario` });
    }
  }
}

export default LoginController;
