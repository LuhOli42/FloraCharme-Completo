import express from "express";
import UsuariosController from "../controllers/usuariosController.js";
import authenticate from "../middleware/authenticate.js";
import cors from "cors";
import multer from "../config/multer.js";

const router = express.Router();

router
  .use(cors())
  .post("/usuario", UsuariosController.cadastrarUsuario)
  .post("/uploadImg", multer.single("img"), UsuariosController.uploadImg)
  .use(authenticate)
  .get("/usuario", UsuariosController.informacoesUsuario)
  .put("/usuario", UsuariosController.atualizarUsuario)
  .delete("/usuario", UsuariosController.deletarUsuario);

export default router;
