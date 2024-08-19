import express from "express";
import FavoritosController from "../controllers/favoritosController.js";

const router = express.Router();

router
  .get("/favoritos", FavoritosController.listarFavoritos)
  .post("/favoritos/:id", FavoritosController.adicionarItemFavorito)
  .delete("/favoritos/:id", FavoritosController.deletarItemFavorito);

export default router;
