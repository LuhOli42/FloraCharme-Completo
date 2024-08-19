import s3 from "../config/s3BucketConfig.js";
import { carrinho } from "../models/Carrinho.js";
import { favoritos } from "../models/Favoritos.js";
import { usuario } from "../models/Usuario.js";
import bcrypt from "bcrypt";

class UsuariosController {
  static async uploadImg(req, res) {
    const { file } = req;
    try {
      const arquivo = await s3
        .upload({
          Bucket: process.env.KEY_NAME_S3,
          Key: `clientes/${file.originalname}`,
          Body: file.buffer,
          ContentType: file.minetype,
        })
        .promise();

      return res.json(arquivo);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ messagem: `${error.message} - falha em cadastrar usuario` });
    }

    return res.sendStatus(201);
  }

  static async cadastrarUsuario(req, res) {
    try {
      const usuarioBody = req.body;

      const senhaCrypto = await bcrypt.hash(usuarioBody.senha, 10);

      const usuarioSenhaCrypto = { ...usuarioBody, senha: senhaCrypto };

      const cadastroSucesso = await usuario.create(usuarioSenhaCrypto);

      const criarFavoritos = await favoritos.create({
        user_id: cadastroSucesso._id,
        produto_id: [],
      });

      const criarCarrinho = await carrinho.create({
        user_id: cadastroSucesso._id,
        produto_id: [],
        compra_finalizada: false,
      });

      res.status(201).json({
        message: "Cadastrado com sucesso",
        usuario: { ...cadastroSucesso._doc, senha: undefined },
      });
    } catch (error) {
      res
        .status(500)
        .json({ messagem: `${error.message} - falha em cadastrar usuario` });
    }
  }

  static async informacoesUsuario(req, res) {
    try {
      res.status(200).json(req.usuario);
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em recuperar informações do usuario`,
      });
    }
  }

  static async atualizarUsuario(req, res) {
    try {
      const { senha } = req.body;

      if (senha) {
        res.status(501).json({ message: "Redefina a senha por outro metodo" });
      }

      const atualizarInformacoes = await usuario.findByIdAndUpdate(
        req.usuario._id,
        req.body
      );

      res.status(200).json({ message: "Usuario atualizado" });
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em nossos servidores`,
      });
    }
  }

  static async deletarUsuario(req, res) {
    try {
      await usuario.findByIdAndDelete(req.usuario._id);

      res.status(200).json({ message: "Usuario deletado" });
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em deletar o usuario`,
      });
    }
  }
}

export default UsuariosController;
