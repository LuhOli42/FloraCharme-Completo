import express from "express";
import ProdutosController from "../controllers/produtosController.js";

const router = express.Router();

router
  .get("/produtos", ProdutosController.listarProdutos)
  .get("/produtos/lancamento", ProdutosController.listarProdutoMaisRecente)
  .get("/produtos/:id", ProdutosController.listarProdutoPorId);

export default router;
