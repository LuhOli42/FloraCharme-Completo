import { carrinho } from "../models/Carrinho.js";

class ComprasController {
  static async finalizarCompra(req, res) {
    try {
      const carrinhoLocalizado = await carrinho.find({
        user_id: req.usuario._id,
        compra_finalizada: false,
      });

      if (carrinhoLocalizado[0].produtos_id.length === 0) {
        return res
          .status(400)
          .json({ menssage: "Carrinho vazio, não foi possivel finalizar" });
      }

      carrinhoLocalizado[0].compra_finalizada = true;

      const atualizarInformacoes = await carrinho.findByIdAndUpdate(
        carrinhoLocalizado[0]._id,
        carrinhoLocalizado[0]
      );

      const criarCarrinho = await carrinho.create({
        user_id: req.usuario._id,
        produto_id: [],
        compra_finalizada: false,
      });

      return res.sendStatus(201);
    } catch (error) {
      res.status(500).json({
        messagem: `${error.message} - falha em nossos servidores`,
      });
    }
  }

  static async listarComprasFinalizada(req, res) {
    try {
      const comprasFinalizadas = await carrinho
        .find({
          compra_finalizada: true,
        })
        .populate([{ path: "produtos_id", strictPopulate: false }]);

      res.status(200).json(comprasFinalizadas);
    } catch (error) {}
  }

  static async localizarCompraFinalizada(req, res) {
    try {
      const compraFinalizada = await carrinho
        .findById(req.params.id)
        .populate([{ path: "produtos_id", strictPopulate: false }]);
      return res.status(200).json(compraFinalizada);
    } catch (error) {}
  }
}

export default ComprasController;
