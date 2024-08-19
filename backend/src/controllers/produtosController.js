import { produto } from "../models/Produto.js";

class ProdutosController {
  static async listarProdutos(req, res) {
    const quantidadeDeProdutos = req.query.quantidade || null;

    try {
      const listarProdutos = await produto
        .find()
        .sort({ created_at: -1 })
        .limit(quantidadeDeProdutos);
      res.status(200).json(listarProdutos);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listarProdutoPorId(req, res) {
    try {
      const id = req.params.id;
      const produtoEncontrado = await produto.findById(id);

      res.status(200).json(produtoEncontrado);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }

  static async listarProdutoMaisRecente(req, res) {
    try {
      const listarProdutoMaisRecente = await produto.findOne(
        {},
        {},
        { sort: { created_at: -1 } }
      );

      res.status(200).json(listarProdutoMaisRecente);
    } catch (error) {
      res
        .status(500)
        .json({ message: `${error.message} - falha na requisição` });
    }
  }
}

export default ProdutosController;
